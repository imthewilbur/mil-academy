// SVG diagram generators. Each returns a raw <svg> string sized to its viewBox.
const Diagrams = {};

Diagrams.angleVsLinear = function () {
  return `
  <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="SF Mono, Menlo, monospace">
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#8a9a5b"/>
      </marker>
    </defs>
    <circle cx="40" cy="200" r="5" fill="#c2a878"/>
    <text x="14" y="228" fill="#a9a795" font-size="11">SHOOTER</text>

    <!-- rays -->
    <line x1="40" y1="200" x2="600" y2="60"  stroke="#8a9a5b" stroke-width="1.5"/>
    <line x1="40" y1="200" x2="600" y2="150" stroke="#8a9a5b" stroke-width="1.5"/>

    <!-- angle arc -->
    <path d="M 90 187 A 55 55 0 0 1 96 165" fill="none" stroke="#d9a441" stroke-width="1.5"/>
    <text x="102" y="184" fill="#d9a441" font-size="12">1 mil</text>

    <!-- gate at 100m -->
    <line x1="220" y1="94" x2="220" y2="138" stroke="#e8e6d9" stroke-width="2"/>
    <text x="196" y="112" fill="#e8e6d9" font-size="12">10 cm</text>
    <text x="188" y="160" fill="#726f5f" font-size="11">100 m</text>

    <!-- gate at 300m -->
    <line x1="470" y1="76" x2="470" y2="146" stroke="#e8e6d9" stroke-width="2"/>
    <text x="440" y="66" fill="#e8e6d9" font-size="12">30 cm</text>
    <text x="438" y="164" fill="#726f5f" font-size="11">300 m</text>

    <text x="320" y="240" fill="#a9a795" font-size="12" text-anchor="middle">
      One angle (1 mil) covers more linear distance the farther out it's measured.
    </text>
  </svg>`;
};

Diagrams.milReticle = function (opts) {
  opts = opts || {};
  const highlightMils = opts.highlightMils || null; // e.g. 2.4 -> draws a vertical bracket
  const cx = 320, cy = 200;
  const pxPerMil = 42;
  let ticks = '';
  for (let m = -6; m <= 6; m++) {
    if (m === 0) continue;
    const x = cx + m * pxPerMil;
    const isMajor = Number.isInteger(m);
    const h = isMajor ? 16 : 8;
    ticks += `<line x1="${x}" y1="${cy - h}" x2="${x}" y2="${cy + h}" stroke="#a4b872" stroke-width="${isMajor ? 2 : 1}"/>`;
    if (isMajor) {
      ticks += `<text x="${x}" y="${cy + 34}" fill="#c2a878" font-size="12" text-anchor="middle" font-family="SF Mono, Menlo, monospace">${Math.abs(m)}</text>`;
    }
  }
  let vticks = '';
  for (let m = -4; m <= 4; m++) {
    if (m === 0) continue;
    const y = cy + m * pxPerMil;
    const isMajor = Number.isInteger(m);
    const h = isMajor ? 16 : 8;
    vticks += `<line x1="${cx - h}" y1="${y}" x2="${cx + h}" y2="${y}" stroke="#a4b872" stroke-width="${isMajor ? 2 : 1}"/>`;
  }

  let bracket = '';
  if (highlightMils) {
    const halfW = (highlightMils / 2) * pxPerMil;
    bracket = `
      <line x1="${cx - halfW}" y1="${cy - 60}" x2="${cx - halfW}" y2="${cy - 40}" stroke="#d9a441" stroke-width="2"/>
      <line x1="${cx + halfW}" y1="${cy - 60}" x2="${cx + halfW}" y2="${cy - 40}" stroke="#d9a441" stroke-width="2"/>
      <line x1="${cx - halfW}" y1="${cy - 50}" x2="${cx + halfW}" y2="${cy - 50}" stroke="#d9a441" stroke-width="2"/>
      <text x="${cx}" y="${cy - 68}" fill="#d9a441" font-size="13" text-anchor="middle" font-family="SF Mono, Menlo, monospace">${highlightMils} mil</text>
    `;
  }

  return `
  <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="${cy}" x2="620" y2="${cy}" stroke="#33391f" stroke-width="1"/>
    <line x1="${cx}" y1="20" x2="${cx}" y2="360" stroke="#33391f" stroke-width="1"/>
    ${ticks}
    ${vticks}
    ${bracket}
    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#e8e6d9"/>
  </svg>`;
};

Diagrams.reticleOnTarget = function (opts) {
  opts = opts || {};
  const mils = opts.mils || 2.0;
  const cx = 320, cy = 210;
  const pxPerMil = 30;
  const targetTopY = cy - (mils / 2) * pxPerMil;
  const targetBotY = cy + (mils / 2) * pxPerMil;
  const targetH = targetBotY - targetTopY;

  let ticks = '';
  for (let m = -5; m <= 5; m++) {
    const y = cy + m * pxPerMil;
    const isMajor = Number.isInteger(m) && m !== 0;
    if (!isMajor) continue;
    ticks += `<line x1="${cx - 18}" y1="${y}" x2="${cx - 8}" y2="${y}" stroke="#a4b872" stroke-width="1.5"/>`;
    ticks += `<line x1="${cx + 8}" y1="${y}" x2="${cx + 18}" y2="${y}" stroke="#a4b872" stroke-width="1.5"/>`;
  }

  return `
  <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="SF Mono, Menlo, monospace">
    <!-- silhouette target -->
    <rect x="${cx - 55}" y="${targetTopY}" width="110" height="${targetH}" rx="6" fill="#262b1c" stroke="#8a7856" stroke-width="1.5"/>
    <text x="${cx}" y="${targetBotY + 24}" fill="#726f5f" font-size="11" text-anchor="middle">TARGET (KNOWN SIZE)</text>

    <!-- crosshair -->
    <line x1="20" y1="${cy}" x2="620" y2="${cy}" stroke="#33391f" stroke-width="1"/>
    <line x1="${cx}" y1="20" x2="${cx}" y2="400" stroke="#33391f" stroke-width="1"/>
    ${ticks}

    <!-- bracket showing mil reading -->
    <line x1="${cx + 90}" y1="${targetTopY}" x2="${cx + 100}" y2="${targetTopY}" stroke="#d9a441" stroke-width="2"/>
    <line x1="${cx + 90}" y1="${targetBotY}" x2="${cx + 100}" y2="${targetBotY}" stroke="#d9a441" stroke-width="2"/>
    <line x1="${cx + 95}" y1="${targetTopY}" x2="${cx + 95}" y2="${targetBotY}" stroke="#d9a441" stroke-width="2"/>
    <text x="${cx + 108}" y="${cy + 4}" fill="#d9a441" font-size="14">${mils.toFixed(1)} mil</text>
  </svg>`;
};

Diagrams.windClock = function () {
  const cx = 200, cy = 200, r = 150;
  const points = [
    [0, '12', 'no'], [45, '1-2', 'half'], [90, '3', 'full'], [135, '4-5', 'half'],
    [180, '6', 'no'], [225, '7-8', 'half'], [270, '9', 'full'], [315, '10-11', 'half']
  ];
  let marks = '';
  points.forEach(([deg, label, val]) => {
    const rad = (deg - 90) * Math.PI / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    const color = val === 'full' ? '#d9a441' : (val === 'half' ? '#8a9a5b' : '#726f5f');
    marks += `<circle cx="${x}" cy="${y}" r="5" fill="${color}"/>`;
    const lx = cx + (r + 26) * Math.cos(rad);
    const ly = cy + (r + 26) * Math.sin(rad);
    marks += `<text x="${lx}" y="${ly + 4}" fill="${color}" font-size="13" text-anchor="middle" font-family="SF Mono, Menlo, monospace">${label}</text>`;
  });
  return `
  <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" font-family="SF Mono, Menlo, monospace">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#33391f" stroke-width="1.5"/>
    <line x1="${cx - r - 6}" y1="${cy}" x2="${cx + r + 6}" y2="${cy}" stroke="#33391f" stroke-width="1"/>
    <line x1="${cx}" y1="${cy - r - 6}" x2="${cx}" y2="${cy + r + 6}" stroke="#33391f" stroke-width="1"/>
    ${marks}
    <polygon points="${cx - 8},${cy + 10} ${cx + 8},${cy + 10} ${cx},${cy - 150}" fill="#c2a878" opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#e8e6d9"/>
    <text x="${cx}" y="${cy + 190}" fill="#a9a795" font-size="12" text-anchor="middle">Shooter at center · 12 = straight toward target</text>
  </svg>`;
};
