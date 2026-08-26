(function () {
  const STORAGE_KEY = 'milAcademyProgress';
  const PASS_THRESHOLD = 0.7;

  let state = {
    levelId: COURSE[0].id,
    view: 'lesson', // 'lesson' | 'quiz' | 'results'
    quiz: null
  };

  // ---------------- Progress persistence ----------------

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function isUnlocked(levelId) {
    if (levelId === COURSE[0].id) return true;
    const idx = COURSE.findIndex(l => l.id === levelId);
    const prev = COURSE[idx - 1];
    if (!prev) return true;
    const progress = loadProgress();
    return !!(progress[prev.id] && progress[prev.id].completed);
  }

  function isComplete(levelId) {
    const progress = loadProgress();
    return !!(progress[levelId] && progress[levelId].completed);
  }

  function recordResult(levelId, scorePercent, passed) {
    const progress = loadProgress();
    const existing = progress[levelId] || { completed: false, bestScore: 0 };
    progress[levelId] = {
      completed: existing.completed || passed,
      bestScore: Math.max(existing.bestScore || 0, scorePercent)
    };
    saveProgress(progress);
  }

  function overallPercent() {
    const progress = loadProgress();
    const done = COURSE.filter(l => progress[l.id] && progress[l.id].completed).length;
    return Math.round((done / COURSE.length) * 100);
  }

  // ---------------- Sidebar ----------------

  function renderSidebar() {
    const list = document.getElementById('levelList');
    list.innerHTML = '';
    COURSE.forEach((level, i) => {
      const unlocked = isUnlocked(level.id);
      const complete = isComplete(level.id);
      const active = level.id === state.levelId;

      const li = document.createElement('li');
      li.className = 'level-item' +
        (unlocked ? '' : ' locked') +
        (complete ? ' complete' : '') +
        (active ? ' active' : '');

      const badge = document.createElement('div');
      badge.className = 'level-badge';
      badge.textContent = complete ? '✓' : String(i + 1);

      const meta = document.createElement('div');
      meta.className = 'level-meta';
      const name = document.createElement('div');
      name.className = 'level-name';
      name.textContent = level.title;
      const sub = document.createElement('div');
      sub.className = 'level-sub';
      sub.textContent = unlocked ? (complete ? 'Complete' : 'Not started') : 'Locked';
      meta.appendChild(name);
      meta.appendChild(sub);

      li.appendChild(badge);
      li.appendChild(meta);

      if (unlocked) {
        li.addEventListener('click', () => {
          state.levelId = level.id;
          state.view = 'lesson';
          state.quiz = null;
          render();
        });
      }

      list.appendChild(li);
    });

    document.getElementById('overallProgressFill').style.width = overallPercent() + '%';
    document.getElementById('overallProgressLabel').textContent = overallPercent() + '% complete';
  }

  // ---------------- Block renderer ----------------

  function renderBlock(block) {
    switch (block.type) {
      case 'p':
        return `<p class="block-p">${block.html}</p>`;
      case 'heading':
        return `<div class="block-heading">${block.text}</div>`;
      case 'callout':
        return `<div class="block-callout${block.warn ? ' warn' : ''}">
          ${block.label ? `<span class="callout-label">${block.label}</span>` : ''}
          ${block.text}
        </div>`;
      case 'formula':
        return `<div class="block-formula">${block.text}</div>`;
      case 'list': {
        const tag = block.ordered ? 'ol' : 'ul';
        const items = block.items.map(i => `<li>${i}</li>`).join('');
        return `<${tag} class="block-list">${items}</${tag}>`;
      }
      case 'table': {
        const head = `<tr>${block.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
        const rows = block.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
        return `<table class="block-table"><thead>${head}</thead><tbody>${rows}</tbody></table>`;
      }
      case 'svg':
        return `<div class="block-svg">${block.html}</div>`;
      default:
        return '';
    }
  }

  // ---------------- Lesson view ----------------

  function renderLesson(level) {
    const idx = COURSE.findIndex(l => l.id === level.id);
    const blocks = level.content.map(renderBlock).join('');
    const isLast = idx === COURSE.length - 1;

    const el = document.createElement('div');
    el.className = 'content-inner';
    el.innerHTML = `
      <div class="level-kicker">Level ${idx + 1} of ${COURSE.length}</div>
      <h1 class="level-title">${level.title}</h1>
      <p class="level-tagline">${level.tagline}</p>
      ${blocks}
      <div class="lesson-actions">
        <button class="btn" id="startQuizBtn">Take the Quiz</button>
        <span style="font-size:13px;color:var(--text-faint);">
          ${level.quiz.length} questions · pass ${Math.round(PASS_THRESHOLD * 100)}%+ to unlock ${isLast ? 'course completion' : 'the next level'}
        </span>
      </div>
    `;
    el.querySelector('#startQuizBtn').addEventListener('click', () => startQuiz(level));
    return el;
  }

  // ---------------- Quiz view ----------------

  function startQuiz(level) {
    state.view = 'quiz';
    state.quiz = {
      levelId: level.id,
      questions: level.quiz,
      index: 0,
      correctCount: 0,
      answered: false,
      selected: null,
      wasCorrect: null
    };
    render();
  }

  function renderQuiz() {
    const q = state.quiz;
    const level = COURSE.find(l => l.id === q.levelId);
    const question = q.questions[q.index];

    const el = document.createElement('div');
    el.className = 'content-inner';

    let bodyHtml = '';
    if (question.type === 'mc') {
      bodyHtml = `<div class="quiz-options">` + question.options.map((opt, i) => {
        let cls = 'quiz-option';
        if (q.answered) {
          if (i === question.correct) cls += ' correct';
          else if (i === q.selected) cls += ' incorrect';
        } else if (i === q.selected) {
          cls += ' selected';
        }
        return `<div class="${cls}" data-idx="${i}">
          <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
          <span>${opt}</span>
        </div>`;
      }).join('') + `</div>`;
    } else if (question.type === 'numeric') {
      bodyHtml = `
        <div class="quiz-numeric-row">
          <input type="number" step="any" class="quiz-numeric-input" id="numericInput"
            ${q.answered ? 'disabled' : ''} value="${q.selected !== null ? q.selected : ''}" placeholder="0.0">
          <span class="quiz-unit">${question.unit || ''}</span>
        </div>
      `;
    }

    el.innerHTML = `
      <div class="quiz-header">
        <div class="level-kicker">${level.title} — Quiz</div>
        <div class="quiz-progress">Question ${q.index + 1} of ${q.questions.length}</div>
      </div>
      <div class="quiz-question-card">
        <p class="quiz-question-text">${question.q}</p>
        ${bodyHtml}
        <div class="quiz-feedback ${q.answered ? 'show ' + (q.wasCorrect ? 'correct' : 'incorrect') : ''}" id="quizFeedback">
          <strong>${q.wasCorrect ? 'Correct.' : 'Not quite.'}</strong> ${question.explain}
        </div>
      </div>
      <div class="quiz-footer">
        <button class="btn secondary" id="quizBackBtn">Back to Lesson</button>
        <button class="btn" id="quizActionBtn">${q.answered ? (q.index === q.questions.length - 1 ? 'See Results' : 'Next Question') : 'Check Answer'}</button>
      </div>
    `;

    el.querySelector('#quizBackBtn').addEventListener('click', () => {
      state.view = 'lesson';
      render();
    });

    if (question.type === 'mc' && !q.answered) {
      el.querySelectorAll('.quiz-option').forEach(optEl => {
        optEl.addEventListener('click', () => {
          q.selected = parseInt(optEl.dataset.idx, 10);
          render();
        });
      });
    }

    el.querySelector('#quizActionBtn').addEventListener('click', () => {
      if (!q.answered) {
        gradeCurrentQuestion();
      } else if (q.index < q.questions.length - 1) {
        q.index += 1;
        q.answered = false;
        q.selected = null;
        q.wasCorrect = null;
        render();
      } else {
        finishQuiz();
      }
    });

    return el;
  }

  function gradeCurrentQuestion() {
    const q = state.quiz;
    const question = q.questions[q.index];

    if (question.type === 'mc') {
      if (q.selected === null || q.selected === undefined) return;
      q.wasCorrect = q.selected === question.correct;
    } else if (question.type === 'numeric') {
      const input = document.getElementById('numericInput');
      const val = parseFloat(input.value);
      if (isNaN(val)) return;
      q.selected = val;
      q.wasCorrect = Math.abs(val - question.answer) <= question.tolerance;
    }

    if (q.wasCorrect) q.correctCount += 1;
    q.answered = true;
    render();
  }

  function finishQuiz() {
    const q = state.quiz;
    const level = COURSE.find(l => l.id === q.levelId);
    const scorePercent = Math.round((q.correctCount / q.questions.length) * 100);
    const passed = scorePercent >= PASS_THRESHOLD * 100;
    recordResult(level.id, scorePercent, passed);
    state.view = 'results';
    state.quiz.finalScore = scorePercent;
    state.quiz.passed = passed;
    render();
  }

  function renderResults() {
    const q = state.quiz;
    const level = COURSE.find(l => l.id === q.levelId);
    const idx = COURSE.findIndex(l => l.id === level.id);
    const isLast = idx === COURSE.length - 1;
    const nextLevel = COURSE[idx + 1];

    const el = document.createElement('div');
    el.className = 'content-inner';

    let msg, actions;
    if (q.passed) {
      msg = isLast
        ? "You've completed every level. That's the full arc from what a mil is to combining elevation and windage under one engagement sequence — the foundation of a beginning sharpshooter."
        : `You've unlocked "${nextLevel.title}."`;
      actions = `
        <button class="btn secondary" id="reviewBtn">Review Lesson</button>
        ${isLast ? '' : `<button class="btn" id="nextBtn">Continue to Next Level</button>`}
      `;
    } else {
      msg = `You need ${Math.round(PASS_THRESHOLD * 100)}% to pass. Review the lesson and try again — this material builds directly into later levels.`;
      actions = `
        <button class="btn secondary" id="reviewBtn">Review Lesson</button>
        <button class="btn" id="retryBtn">Retake Quiz</button>
      `;
    }

    el.innerHTML = `
      <div class="results-card">
        <div class="results-score ${q.passed ? 'pass' : 'fail'}">${q.finalScore}%</div>
        <div class="results-label">${q.correctCount} of ${q.questions.length} correct — ${q.passed ? 'PASSED' : 'NOT PASSED'}</div>
        <p class="results-msg">${msg}</p>
        <div class="results-actions">${actions}</div>
      </div>
    `;

    const reviewBtn = el.querySelector('#reviewBtn');
    if (reviewBtn) reviewBtn.addEventListener('click', () => { state.view = 'lesson'; render(); });

    const nextBtn = el.querySelector('#nextBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      state.levelId = nextLevel.id;
      state.view = 'lesson';
      state.quiz = null;
      render();
    });

    const retryBtn = el.querySelector('#retryBtn');
    if (retryBtn) retryBtn.addEventListener('click', () => startQuiz(level));

    return el;
  }

  // ---------------- Root render ----------------

  function render() {
    renderSidebar();
    const content = document.getElementById('content');
    content.innerHTML = '';

    const level = COURSE.find(l => l.id === state.levelId);
    let node;
    if (state.view === 'quiz') node = renderQuiz();
    else if (state.view === 'results') node = renderResults();
    else node = renderLesson(level);

    content.appendChild(node);
    content.scrollTop = 0;
  }

  document.getElementById('resetProgressBtn').addEventListener('click', () => {
    if (confirm('Reset all course progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      state = { levelId: COURSE[0].id, view: 'lesson', quiz: null };
      render();
    }
  });

  render();
})();
