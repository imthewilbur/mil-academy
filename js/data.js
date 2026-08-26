// Course content. Each level = lesson content blocks + a gating quiz.
// Block types consumed by app.js: p, heading, callout, formula, list, table, svg
// Quiz questions may carry an optional `reference` block (usually a shared table
// below, or a diagram) which is re-rendered above the question itself — a
// question should never assume the student memorized a chart from the lesson.

// ---------------------------------------------------------------------
// Shared reference data. Defined once so the lesson body and any quiz
// question that cites it always show the exact same numbers.
// ---------------------------------------------------------------------

const DOPE_ROWS = [
  ['100', '0.0'], ['200', '0.6'], ['300', '1.5'], ['400', '2.7'], ['500', '4.2'],
  ['600', '6.0'], ['700', '8.2'], ['800', '10.8'], ['900', '13.9'], ['1000', '17.5']
];

const WIND_ROWS = [
  ['100', '0.1'], ['200', '0.3'], ['300', '0.6'], ['400', '1.0'], ['500', '1.5'],
  ['600', '2.1'], ['700', '2.8'], ['800', '3.6'], ['900', '4.5'], ['1000', '5.5']
];

const COSINE_ROWS = [
  ['0°', '1.00'], ['10°', '0.98'], ['20°', '0.94'], ['30°', '0.87'],
  ['40°', '0.77'], ['45°', '0.71'], ['50°', '0.64'], ['60°', '0.50']
];

const REF_DOPE = { type: 'table', headers: ['Range (yd)', 'Elevation (mil)'], rows: DOPE_ROWS };
const REF_WIND = { type: 'table', headers: ['Range (yd)', 'Wind Mils @ 10 mph, Full Value'], rows: WIND_ROWS };
const REF_COSINE = { type: 'table', headers: ['Angle Off Horizontal', 'Cosine Multiplier'], rows: COSINE_ROWS };
const REF_COMBINED = {
  type: 'table',
  headers: ['Range (yd)', 'Elevation (mil)', 'Wind Mils @ 10 mph Full Value'],
  rows: DOPE_ROWS.map((r, i) => [r[0], r[1], WIND_ROWS[i][1]])
};
const REF_RETICLE_BRACKET = { type: 'svg', html: Diagrams.milReticle({ highlightMils: 2.4 }) };
const REF_TARGET_2MIL = { type: 'svg', html: Diagrams.reticleOnTarget({ mils: 2.0 }) };

const COURSE = [

// ======================================================================
{
  id: 1,
  title: "What Is a Mil?",
  tagline: "The foundation: angles, not distances.",
  content: [
    { type: 'p', html: "Every precision rifle scope with a mil reticle is built around one idea: measuring <strong>angles</strong>, not fixed distances. Before you can range a target, dial elevation, or hold for wind, you need to understand what a \"mil\" actually is." },
    { type: 'heading', text: "An Angle, Not a Distance" },
    { type: 'p', html: "MIL is short for <strong>milliradian</strong> — one thousandth of a radian. Like a degree, a mil is a unit of angular measurement. The key difference from a ruler measurement is that a mil covers a different amount of physical space depending on how far away you're looking." },
    { type: 'formula', text: "1 mil ≈ 1/1000 of the distance to the target" },
    { type: 'svg', html: Diagrams.angleVsLinear() },
    { type: 'callout', label: 'Memory Aid', text: "1 mil subtends: 10 cm at 100 m · 1 m at 1000 m · 3.6 in at 100 yd · 36 in at 1000 yd. The linear size scales directly with range — double the distance, double the size the same angle covers." },
    { type: 'heading', text: "Why Mils, Not Just a Ruler" },
    { type: 'p', html: "Because a mil scales proportionally with distance, the same reticle you use to measure a target's size can also be used to hold over for bullet drop or hold off for wind — at any range — using the same set of numbers. That's the whole reason mil reticles exist: one consistent unit for ranging, elevation, and windage." },
    { type: 'list', items: [
      "Angular, so it scales automatically with distance — no separate chart for \"how big does my reticle look\" at each range.",
      "Works cleanly in metric (10 cm at 100 m) which is why most professional and military scopes are mil-based.",
      "The same mil reading used to range a target is later reused to correct your aim."
    ]}
  ],
  quiz: [
    { type: 'mc', q: "What does \"MIL\" stand for in the context of a rifle scope?", options: ["Military Index Line", "Milliliter", "Milliradian", "Mile Marker"], correct: 2,
      explain: "MIL is short for milliradian — 1/1000 of a radian, a unit of angle." },
    { type: 'mc', q: "A mil is fundamentally a measurement of:", options: ["A fixed distance in meters", "An angle", "Bullet weight", "Wind speed"], correct: 1,
      explain: "A mil is angular. Its linear size on a target changes with range." },
    { type: 'mc', q: "As the distance to a target increases, the linear size covered by 1 mil...", options: ["Stays exactly the same", "Increases proportionally with distance", "Decreases", "Depends only on caliber"], correct: 1,
      explain: "Because it's an angle, 1 mil covers more physical space the farther out you measure it — directly proportional to range." },
    { type: 'numeric', q: "How many centimeters does 1 mil subtend at 100 meters?", answer: 10, tolerance: 0.5, unit: "cm",
      explain: "1 mil = 10 cm at 100 m. This is the core metric memory anchor for mil math." },
    { type: 'numeric', q: "Approximately how many inches does 1 mil subtend at 100 yards?", answer: 3.6, tolerance: 0.3, unit: "in",
      explain: "1 mil ≈ 3.6 inches at 100 yards (and 36 inches at 1000 yards)." },
    { type: 'mc', q: "Why do mil reticles let you use the same numbers for ranging, elevation, and windage?", options: ["Because mils are always exactly 1 inch", "Because the angular unit scales proportionally with range, so one set of values works at any distance", "Because rifle scopes are calibrated at the factory for one specific range", "It's just tradition, there's no technical reason"], correct: 1,
      explain: "Because a mil is angular, it scales with range automatically — the same reticle marks give you ranging, hold-over, and hold-off." }
  ]
},

// ======================================================================
{
  id: 2,
  title: "Reading the Mil Reticle",
  tagline: "Hash marks, subtensions, and focal planes.",
  content: [
    { type: 'p', html: "A mil reticle isn't just a crosshair — it's a ruler built into your sight picture. Hash marks (or dots, in older \"mil-dot\" designs) sit at regular angular intervals along the horizontal and vertical stadia lines, letting you measure targets, distances, and corrections directly through the glass." },
    { type: 'svg', html: Diagrams.milReticle() },
    { type: 'p', html: "Major marks are typically spaced at whole mils, with smaller minor ticks in between marking fractions of a mil (often 0.2 mil increments) for finer readings." },
    { type: 'heading', text: "First Focal Plane vs. Second Focal Plane" },
    { type: 'p', html: "This distinction matters enormously for anyone using mils." },
    { type: 'table', headers: ["Type", "Behavior", "Mil values accurate at..."], rows: [
      ["FFP (First Focal Plane)", "Reticle visually grows/shrinks as you zoom", "Every magnification setting"],
      ["SFP (Second Focal Plane)", "Reticle stays the same size at all zooms", "Only one magnification, usually the top end"]
    ]},
    { type: 'callout', label: 'Caution', warn: true, text: "On an SFP scope, if you range or hold using mils at the wrong magnification, your numbers will be wrong — sometimes badly wrong. Always confirm the true-mil power setting in your scope's manual before relying on the reticle for math." },
    { type: 'heading', text: "Reading a Subtension" },
    { type: 'p', html: "To read how many mils a target or gap spans, count from one edge to the other using the hash marks, including partial marks. In the diagram above, the bracketed span is measured directly off the horizontal stadia." },
    { type: 'heading', text: "Reticle Styles You'll See in Competition" },
    { type: 'p', html: "Most PRS-style shooters run a <strong>gridded (\"Christmas tree\") reticle</strong> — a wide fan of hash marks extending below the horizontal stadia at regular mil intervals. It lets you hold for elevation <em>and</em> windage at the same time, off a single grid intersection, without ever touching a turret. That matters when a stage has you engaging several targets at different ranges and wind calls in quick succession." }
  ],
  quiz: [
    { type: 'mc', q: "What is the main advantage of a First Focal Plane (FFP) reticle for mil-based work?", options: ["It's cheaper to manufacture", "Mil values stay accurate at any magnification setting", "It only works at one zoom level", "It removes the need for hash marks"], correct: 1,
      explain: "FFP reticles grow and shrink with zoom, so the mil spacing is always true — at 3x or 18x." },
    { type: 'mc', q: "On a Second Focal Plane (SFP) scope, mil values printed on the reticle are only accurate at:", options: ["Any magnification", "The lowest magnification only", "One specific magnification, usually maximum zoom", "They're never accurate"], correct: 2,
      explain: "SFP reticles don't change size with zoom, so the math only works at the single power the reticle was calibrated for." },
    { type: 'numeric', q: "Looking at this reference reticle diagram, what mil value does the bracket span?", reference: REF_RETICLE_BRACKET, answer: 2.4, tolerance: 0.1, unit: "mil",
      explain: "The bracket was drawn to span 2.4 mil — practice reading brackets like this off the hash marks." },
    { type: 'mc', q: "Minor tick marks between the major whole-mil hashes typically represent:", options: ["Wind speed", "Fractions of a mil, often 0.2 mil increments", "Bullet caliber", "Nothing — they're purely decorative"], correct: 1,
      explain: "Minor ticks let you read finer subtensions than whole mils, commonly in 0.2 mil steps." },
    { type: 'mc', q: "Why do many long-range shooters prefer FFP scopes specifically for mil ranging and holdovers?", options: ["FFP scopes are always lighter", "They can range and hold at any power setting without recalculating for magnification", "FFP reticles are illuminated by default", "There is no real preference"], correct: 1,
      explain: "The one-magnification limitation of SFP scopes is exactly what FFP removes — a real practical advantage in the field." },
    { type: 'mc', q: "A gridded \"Christmas tree\" reticle pattern is useful in competition because it lets you:", options: ["Dial the turret faster", "Hold for both elevation and windage at once, off one grid point, without touching a turret", "See better in low light", "Zero the rifle without tools"], correct: 1,
      explain: "The tree's grid of hash marks below the horizontal stadia gives you a combined elevation+wind hold point for fast target transitions." }
  ]
},

// ======================================================================
{
  id: 3,
  title: "Ranging with Mils",
  tagline: "Turning a mil reading into a distance.",
  content: [
    { type: 'p', html: "If you know a target's real-world size, you can use the number of mils it spans in your reticle to calculate the distance to it — no rangefinder required." },
    { type: 'formula', text: "Distance (m) = Target Size (cm) × 10 ÷ Mils Read" },
    { type: 'formula', text: "Distance (yd) = Target Size (in) × 27.78 ÷ Mils Read" },
    { type: 'p', html: "Both formulas express the same idea: since 1 mil = 1/1000 of distance, a target spanning fewer mils must be farther away, and one spanning more mils must be closer — for a given known size." },
    { type: 'svg', html: Diagrams.reticleOnTarget({ mils: 2.0 }) },
    { type: 'p', html: "<strong>Worked example:</strong> a target known to be 60 cm tall spans <code>2.0 mil</code> in the reticle above.<br>Distance = (60 × 10) ÷ 2.0 = <strong>300 m</strong>." },
    { type: 'heading', text: "Precision Matters" },
    { type: 'p', html: "Small errors in your mil reading translate directly into range errors — and those errors get proportionally larger at long distance. Read to the nearest 0.1 mil where you can, and double check your target-size assumption; ranging a vehicle or animal of unknown exact size introduces its own error before the math even starts." },
    { type: 'callout', text: "The formula only works if you actually know the target's true size. Ranging an unfamiliar object is a guess dressed up as math." }
  ],
  quiz: [
    { type: 'numeric', q: "A target is known to be 60 cm tall. It spans 1.5 mils in your reticle. What is the distance in meters?", answer: 400, tolerance: 15, unit: "m",
      explain: "(60 × 10) ÷ 1.5 = 400 m." },
    { type: 'numeric', q: "A steel plate is 18 inches wide and spans 1.2 mils. What is the distance in yards?", answer: 417, tolerance: 20, unit: "yd",
      explain: "(18 × 27.78) ÷ 1.2 ≈ 417 yd." },
    { type: 'mc', q: "If you accidentally read fewer mils than the target actually spans, your calculated distance will be:", options: ["Too close (underestimated)", "Too far (overestimated)", "Exactly correct", "Unaffected"], correct: 1,
      explain: "Distance = size ÷ mils. A smaller mils value in the denominator produces a larger — overestimated — distance." },
    { type: 'mc', q: "To range a target using the mil formula, you must know beforehand:", options: ["The target's exact real-world size", "The wind speed", "The bullet's ballistic coefficient", "The scope's magnification"], correct: 0,
      explain: "The formula solves for distance using a known size — without it, there's nothing to calculate against." },
    { type: 'numeric', q: "Using this reference diagram: the target is known to be 60 cm tall. What is the range in meters?", reference: REF_TARGET_2MIL, answer: 300, tolerance: 15, unit: "m",
      explain: "The diagram shows the target spanning 2.0 mil. (60 × 10) ÷ 2.0 = 300 m." },
    { type: 'mc', q: "What is the main real-world limitation of mil-based ranging?", options: ["It only works past 500 yards", "It requires a laser to work at all", "Any error in the assumed target size skews the range estimate directly", "It cannot be done through a scope"], correct: 2,
      explain: "The math is only as good as the size assumption feeding it — a wrong size means a wrong range, however carefully you read the mils." }
  ]
},

// ======================================================================
{
  id: 4,
  title: "Turrets & Click Values",
  tagline: "How the adjustment actually happens — and how to trust it.",
  content: [
    { type: 'p', html: "Once you know how many mils of correction you need — for drop, for wind, for anything — you have two ways to apply it: turn a turret, or hold off using the reticle. Competing seriously means understanding your turret well enough to trust it under time pressure." },
    { type: 'heading', text: "Click Values" },
    { type: 'p', html: "Most MRAD (mil-based) turrets adjust in <strong>0.1 mil</strong> increments per click, and are usually marked directly in mils rather than \"minutes.\" That keeps the math in the turret consistent with the math in the reticle. Some finer competition turrets offer 0.05 mil clicks; some budget optics still use 1/4 MOA clicks entirely." },
    { type: 'table', headers: ["Adjustment Needed", "Clicks (at 0.1 mil/click)"], rows: [
      ["0.1 mil", "1 click"],
      ["0.5 mil", "5 clicks"],
      ["1.0 mil", "10 clicks"],
      ["2.3 mil", "23 clicks"]
    ]},
    { type: 'heading', text: "MRAD vs. MOA" },
    { type: 'p', html: "MOA (minute of angle, ≈ 1.047 in at 100 yd, usually treated as 1 in/100 yd) is the other major adjustment system you'll run into. Most modern competition shooting has settled on MRAD because its decimal math matches a mil reticle exactly — but you will still encounter MOA scopes." },
    { type: 'callout', label: "Critical", warn: true, text: "Never pair an MRAD reticle with an MOA turret, or vice versa. A correction calculated in mils dialed on a MOA turret will land in the wrong place — always confirm reticle and turret are the same unit before you ever touch the gun." },
    { type: 'heading', text: "Dialing vs. Holding" },
    { type: 'callout', label: "Dialing", text: "Physically turn the elevation and/or windage turret so the scope's own zero point shifts to match the needed correction. Afterward, a plain center-crosshair hold lands the shot." },
    { type: 'callout', label: "Holding", text: "Leave the turrets at zero and use the hash marks in the reticle itself to hold over, under, left, or right by the needed number of mils." },
    { type: 'p', html: "Dialing is precise and intuitive for a single known range. Holding is faster when engaging multiple targets at different distances in succession, since there's no turret to reset between shots — you just shift your eye to a different hash mark." },
    { type: 'heading', text: "Turret Revolutions & Total Travel" },
    { type: 'p', html: "A turret doesn't spin forever. A common competition turret gives roughly <strong>10.0 mil per full revolution</strong>, with a limited total travel of two or three revolutions. Past 700–800 yards on many cartridges, your dope will require dialing past a full revolution — and losing track of which revolution you're on is a classic, match-losing mistake." },
    { type: 'svg', html: Diagrams.turretRevolution() },
    { type: 'p', html: "Revolution indicators — a raised ridge, a color change, or a number visible in a small window — let you feel or glance which revolution you're on, even without good light." },
    { type: 'heading', text: "The Zero Stop" },
    { type: 'p', html: "A <strong>zero stop</strong> is a mechanical hard stop built into the turret at your rifle's zero. You can spin the turret down until it physically can't go any farther and know — without looking, without counting clicks — that you're exactly back at zero. Under a shot clock, that's the difference between a confident reset and a guess." },
    { type: 'heading', text: "Confirming Your Turret Tracks True — the Tall Target Test" },
    { type: 'p', html: "A turret that's supposed to move 10.0 mil per revolution should actually move the point of impact 10.0 mil. Manufacturing tolerances, reticle errors, or a damaged scope can mean it doesn't — and you do not want to discover that mid-match." },
    { type: 'list', ordered: true, items: [
      "Set up a plumbed, vertically-marked target at 100 m and fire a confirmed group at your zero.",
      "Dial a known, large adjustment — commonly 10.0 mil, using most of a full revolution.",
      "Fire a second group.",
      "Measure the vertical distance between the two group centers, and convert it to mils using the ranging formula from the previous lesson (distance in cm ÷ 10, at 100 m).",
      "Compare that measured value to what you dialed. A match means the turret tracks true."
    ]},
    { type: 'p', html: "<strong>Worked example:</strong> you dial 10.0 mil and the second group lands 96 cm above the first, at 100 m.<br>Measured movement = 96 ÷ 10 = <strong>9.6 mil</strong> — a real tracking error of 0.4 mil at that adjustment, worth knowing about before you ever compete." },
    { type: 'heading', text: "Applying It" },
    { type: 'p', html: "<strong>Worked example:</strong> your dope calls for 11.4 mil of elevation at 700 yd, on a 10.0-mil-per-revolution turret with a zero stop. You'd spin one full revolution (10.0 mil) and continue 1.4 mil further into the second revolution — confirming the revolution indicator shows you're on rev 2 before you break the shot." }
  ],
  quiz: [
    { type: 'mc', q: "What's the main reason most competition scopes use MRAD (mil) turrets paired with a mil reticle?", options: ["MRAD scopes are always cheaper", "Decimal mil math matches the reticle exactly, so ranging, elevation, and windage all share one unit system", "MOA turrets don't have clicks", "There is no real reason, it's just tradition"], correct: 1,
      explain: "Keeping reticle and turret in the same unit system is what makes the whole mil workflow — ranging, dialing, holding — consistent." },
    { type: 'mc', q: "Pairing an MRAD reticle with an MOA turret (or vice versa) is:", options: ["Totally fine, the units convert automatically", "A critical setup error — a correction calculated in one unit won't match an adjustment made in the other", "Only a problem at close range", "Required for some rifles"], correct: 1,
      explain: "Nothing converts automatically. Mismatched units mean your calculated correction lands in the wrong place." },
    { type: 'numeric', q: "A turret provides 10.0 mil of travel per revolution. Your dope calls for 13.5 mil of total elevation. How many mils do you dial into the second revolution?", answer: 3.5, tolerance: 0.1, unit: "mil",
      explain: "13.5 − 10.0 (the first full revolution) = 3.5 mil into the second revolution." },
    { type: 'mc', q: "What does a turret's zero stop do?", options: ["Prevents the turret from being adjusted at all", "Mechanically stops the turret at the rifle's zero, so you can return to it by feel without looking or counting", "Locks the reticle's focal plane", "Only works on MOA turrets"], correct: 1,
      explain: "A zero stop lets you spin down until it physically stops — a fast, reliable way back to zero under time pressure." },
    { type: 'mc', q: "The purpose of the tall target (box) test is to:", options: ["Zero the rifle for the first time", "Verify that dialing a known number of mils produces that exact amount of vertical movement on target", "Measure muzzle velocity", "Check the reticle's focal plane type"], correct: 1,
      explain: "It's a tracking confirmation: dial a known amount, measure what actually happened, compare." },
    { type: 'numeric', q: "In a tall target test at 100 m, you dial 10.0 mil and the group moves 96 cm. What is the actual measured movement, in mils?", answer: 9.6, tolerance: 0.2, unit: "mil",
      explain: "96 cm ÷ 10 cm/mil (at 100 m) = 9.6 mil actually measured." },
    { type: 'numeric', q: "Continuing the previous question: you dialed 10.0 mil but measured 9.6 mil of actual movement. What is the tracking error, in mils?", answer: 0.4, tolerance: 0.1, unit: "mil",
      explain: "10.0 − 9.6 = 0.4 mil of tracking error at that adjustment — real, worth documenting, and worth addressing before a match." },
    { type: 'mc', q: "Revolution indicators (raised marks, color changes, number windows) exist so that you can:", options: ["Adjust parallax", "Know which revolution you're on by feel or a quick glance, even in poor light", "Increase total turret travel", "Switch between MRAD and MOA"], correct: 1,
      explain: "Past one full revolution, losing track of which revolution you're on is a classic way to miss high or low by a huge margin." }
  ]
},

// ======================================================================
{
  id: 5,
  title: "Building Your Dope",
  tagline: "The ballistics fundamentals behind every number on the chart.",
  content: [
    { type: 'p', html: "A dope card doesn't fall out of the sky — it's built from real physical inputs about your bullet, your rifle, and the air it's flying through. Understanding those inputs is what lets you build accurate dope for a new load, and correctly recognize when conditions have changed enough that your existing dope can no longer be trusted." },
    { type: 'heading', text: "What Actually Shapes a Trajectory" },
    { type: 'list', items: [
      "Muzzle velocity (MV) — how fast the bullet leaves the barrel",
      "Ballistic coefficient (BC) — how efficiently the bullet resists drag in flight",
      "Zero range and scope height over the bore",
      "Environmental conditions — temperature, altitude, humidity, and pressure"
    ]},
    { type: 'heading', text: "Ballistic Coefficient (BC)" },
    { type: 'p', html: "BC is a number describing how efficiently a bullet cuts through the air compared to a standard reference projectile. A <strong>higher BC</strong> means the bullet resists drag better — it retains velocity longer, drops less, and drifts less in wind, all else being equal." },
    { type: 'p', html: "You'll see BC values published against two different drag models: <strong>G1</strong>, an older standard shape, and <strong>G7</strong>, modeled on a modern low-drag boat-tail bullet. G7 numbers tend to predict trajectory more accurately for the kind of long, sleek bullets used in precision competition." },
    { type: 'callout', text: "Your ammunition manufacturer publishes a BC, but no two barrels, lots, or environmental conditions perform identically — that's exactly why truing (below) matters." },
    { type: 'heading', text: "Muzzle Velocity (MV)" },
    { type: 'p', html: "MV is measured with a chronograph, not assumed from the number printed on the box. It's the single input with the biggest effect on your calculated drop." },
    { type: 'list', items: [
      "SD (standard deviation) and ES (extreme spread) describe how consistent your velocity is, shot to shot.",
      "Low SD/ES means tighter vertical grouping at distance, and a tighter match between your predicted and actual drop."
    ]},
    { type: 'heading', text: "Environmental Conditions & Density Altitude" },
    { type: 'p', html: "What your bullet is actually pushing through is air density — and that changes with altitude, temperature, humidity, and barometric pressure, combined into a single number called <strong>density altitude</strong>." },
    { type: 'callout', label: 'Important', warn: true, text: "The exact same rifle and load needs LESS elevation and LESS wind correction on a hot day at a high-altitude match (thin air = less drag) than on a cold day at sea level (dense air = more drag). A dope card built under one set of conditions can be meaningfully wrong under another — this is one of the most common reasons a shooter misses on the first cold-bore shot of a match day." },
    { type: 'heading', text: "Building Dope with a Ballistic Calculator" },
    { type: 'p', html: "Enter BC, MV, zero range, scope height, and current environmental conditions into a ballistic app or calculator to generate a full elevation table across your expected engagement distances — this is how a dope card like the one in the next lesson gets built in the first place." },
    { type: 'heading', text: "Truing Your Dope" },
    { type: 'p', html: "A calculated dope card is a prediction, not a fact. It's a starting point until you verify it live." },
    { type: 'list', ordered: true, items: [
      "Shoot for verified impacts at a known long distance — many PRS shooters true around 500–600 yd or farther.",
      "Compare the actual elevation needed to what the calculator predicted.",
      "Adjust the BC or MV value <em>in the calculator</em> (not the real world) until the prediction matches your live impact.",
      "Recompute the rest of the dope table using the trued value."
    ]},
    { type: 'callout', text: "Truing corrects for the small real-world differences between your specific rifle, barrel, and ammo lot and the calculator's generic model — it's standard practice before any serious match, and worth redoing whenever you change ammo lots." }
  ],
  quiz: [
    { type: 'mc', q: "A higher Ballistic Coefficient (BC) means a bullet:", options: ["Is heavier", "Resists drag better, retaining velocity and dropping/drifting less over distance", "Is always more accurate", "Travels slower at the muzzle"], correct: 1,
      explain: "BC describes drag efficiency — higher BC means a flatter, wind-resistant trajectory, all else equal." },
    { type: 'mc', q: "Which drag model generally predicts trajectory more accurately for modern long-range boat-tail bullets?", options: ["G1", "G7", "Neither, they're identical", "It depends only on caliber"], correct: 1,
      explain: "G7 is modeled on the low-drag boat-tail shape typical of long-range competition bullets." },
    { type: 'mc', q: "Muzzle velocity used in a ballistic calculator should come from:", options: ["The number printed on the ammunition box", "A chronograph, measuring your actual rifle and ammo", "An average guess based on caliber", "It doesn't meaningfully affect the calculation"], correct: 1,
      explain: "Box velocities are approximate at best; MV is the single biggest driver of calculated drop, so it needs to be measured, not assumed." },
    { type: 'mc', q: "Low SD (standard deviation) and ES (extreme spread) in your measured muzzle velocity indicate:", options: ["A dangerous load", "More consistent shot-to-shot velocity, which tightens vertical grouping at distance", "A damaged barrel", "Nothing useful"], correct: 1,
      explain: "Consistent velocity from shot to shot means less vertical spread downrange and dope that matches reality more reliably." },
    { type: 'mc', q: "Compared to a cold day at sea level, a hot day at a high-altitude match location will generally require:", options: ["More elevation and wind correction", "Less elevation and wind correction, because thinner air creates less drag", "No difference at all", "Only a windage change, never elevation"], correct: 1,
      explain: "Higher density altitude (hot, high elevation) means thinner air and less aerodynamic drag on the bullet." },
    { type: 'mc', q: "\"Truing\" a dope card means:", options: ["Re-zeroing the rifle at 100 yd", "Adjusting the BC/MV values in your calculator until its predictions match verified live impacts at a known distance", "Cleaning the barrel before a match", "Switching to a different ammunition brand"], correct: 1,
      explain: "Truing brings the calculator's model in line with what your specific rifle and ammo actually do, using real confirmed impacts." },
    { type: 'mc', q: "Why is truing considered standard practice before a serious match?", options: ["It's required by competition rules", "It corrects for small real-world differences between your specific setup and the calculator's generic model", "It increases muzzle velocity", "It replaces the need for a chronograph"], correct: 1,
      explain: "No published BC or generic environmental model perfectly matches your individual rifle, barrel, and ammo lot — truing closes that gap." }
  ]
},

// ======================================================================
{
  id: 6,
  title: "Elevation in the Field",
  tagline: "Angle shooting, and putting turret + dope skills together.",
  content: [
    { type: 'p', html: "You now know how to build and true a dope card, and how your turret physically applies it across revolutions. One more variable changes how much elevation you actually need in the field: the angle of the shot." },
    { type: 'heading', text: "Why Angle Matters" },
    { type: 'p', html: "Gravity pulls the bullet down based on how long it's in the air relative to the ground beneath it — not simply on the slanted line-of-sight distance to the target. On a steep uphill or downhill shot, the bullet's effective flight is shorter than the line-of-sight distance suggests, so it needs <strong>less</strong> elevation than the raw range would imply." },
    { type: 'svg', html: Diagrams.angleShot({ angleDeg: 30 }) },
    { type: 'formula', text: "Corrected (Effective) Range ≈ Cosine(angle) × Line-of-Sight Distance" },
    { type: 'table', headers: ["Angle Off Horizontal", "Cosine Multiplier"], rows: COSINE_ROWS },
    { type: 'p', html: "<strong>Worked example:</strong> a target sits at 600 yd line-of-sight, 30° uphill.<br>Corrected range = 0.87 × 600 = <strong>522 yd</strong> — you'd look up (or interpolate) dope for roughly 520 yd, not the full 600 yd." },
    { type: 'callout', label: 'Important', warn: true, text: "This effect works the same way uphill or downhill — both need less elevation than the line-of-sight distance suggests. Many rangefinders include a built-in Angle Cosine Indicator (ACI) that gives you the corrected range automatically, but you should understand the math it's doing for you." },
    { type: 'heading', text: "Your Extended Dope Card" },
    { type: 'p', html: "Here's a fuller reference dope card, out to distances typical of a PRS-style match:" },
    { type: 'table', headers: ["Range (yd)", "Elevation (mil)"], rows: DOPE_ROWS },
    { type: 'heading', text: "Putting It All Together" },
    { type: 'p', html: "Given a target's line-of-sight range and shot angle: find the corrected range, look up (or interpolate) elevation from your trued dope card, then dial — tracking which revolution you're in — or hold that value." }
  ],
  quiz: [
    { type: 'mc', q: "On a steep uphill OR downhill shot, compared to a flat shot at the same line-of-sight distance, you generally need:", options: ["More elevation, in both cases", "Less elevation, because the corrected/effective range is shorter than the line-of-sight distance", "No change at all", "It depends on caliber, not angle"], correct: 1,
      explain: "Uphill and downhill both reduce the effective range relative to the slanted line-of-sight distance — both need less elevation than the raw range suggests." },
    { type: 'numeric', q: "A target is at 500 yd line-of-sight, at a 45° angle. Using this cosine table, what is the corrected range in yards?", reference: REF_COSINE, answer: 355, tolerance: 20, unit: "yd",
      explain: "0.71 × 500 = 355 yd corrected range." },
    { type: 'numeric', q: "Using a corrected range of about 355 yd and this dope card, interpolating between the 300 yd and 400 yd rows, roughly how much elevation (in mil) would you dial?", reference: REF_DOPE, answer: 2.2, tolerance: 0.3, unit: "mil",
      explain: "Interpolating between 300 yd (1.5 mil) and 400 yd (2.7 mil) at about 55% of the way: 1.5 + 0.55 × (2.7 − 1.5) ≈ 2.2 mil." },
    { type: 'mc', q: "A rangefinder's built-in Angle Cosine Indicator (ACI) exists to:", options: ["Measure wind speed", "Automatically give you the corrected/effective range so you don't have to calculate the cosine by hand", "Replace the need for a dope card entirely", "Only work on downhill shots"], correct: 1,
      explain: "ACI does the cosine correction math for you in the field, based on the measured angle and slant distance." },
    { type: 'numeric', q: "Using this dope card, your target is at a flat 900 yd (no angle). What elevation, in mil, do you dial?", reference: REF_DOPE, answer: 13.9, tolerance: 0.3, unit: "mil",
      explain: "Straight from the dope card: 900 yd → 13.9 mil." },
    { type: 'numeric', q: "Your turret provides 10.0 mil per revolution. For the 900 yd shot above (13.9 mil total), how many mils do you dial into the second revolution?", answer: 3.9, tolerance: 0.2, unit: "mil",
      explain: "13.9 − 10.0 = 3.9 mil into the second revolution — the same revolution math from the turrets lesson, now applied to real dope." },
    { type: 'mc', q: "Why must a dope card built at sea level on a cool day be re-checked before a hot, high-altitude match day?", options: ["It doesn't need to be — dope never changes", "Density altitude differences change air resistance enough to shift the actual elevation and wind needed", "Only the zero changes, not the dope", "Ballistic calculators already account for this automatically with no input needed"], correct: 1,
      explain: "Recall from the ballistics lesson: thinner air at higher density altitude means less drag, so the real elevation and wind needed can differ meaningfully from dope built under different conditions." }
  ]
},

// ======================================================================
{
  id: 7,
  title: "Reading the Wind",
  tagline: "Value, direction, and speed — before you ever adjust anything.",
  content: [
    { type: 'p', html: "Wind is the hardest variable in precision shooting because, unlike drop, it isn't constant or fully predictable. Before you can correct for it, you need a shared vocabulary for describing it: <strong>value</strong>, <strong>direction</strong>, and <strong>speed</strong>." },
    { type: 'heading', text: "The Clock System" },
    { type: 'p', html: "Picture yourself at the center of a clock face, with 12 o'clock pointed straight at the target. Where the wind is coming <em>from</em> tells you its clock position." },
    { type: 'svg', html: Diagrams.windClock() },
    { type: 'table', headers: ["Clock Position", "Value", "Horizontal Effect"], rows: [
      ["3 or 9 o'clock", "Full value", "Maximum push, directly left/right"],
      ["1-2, 4-5, 7-8, 10-11 o'clock", "Half value", "Roughly half the push of full value"],
      ["12 or 6 o'clock", "No value", "Little to no horizontal push"]
    ]},
    { type: 'callout', text: "\"No value\" wind (straight on or straight behind) can still slightly affect vertical impact and time of flight, but it produces almost no left-right drift — which is the effect wind-value classification is built around." },
    { type: 'heading', text: "Estimating Speed" },
    { type: 'p', html: "Without an anemometer, shooters read the environment:" },
    { type: 'list', items: [
      "Mirage — the \"boil\" or shimmer visible through a scope at high magnification, whose speed and angle hint at wind speed and direction.",
      "Flags, wind socks, or smoke drifting at a known angle.",
      "Grass, leaves, and dust moving at the target and at points in between — wind is rarely uniform over the whole distance."
    ]},
    { type: 'heading', text: "Reading Wind Along the Whole Flight Path" },
    { type: 'p', html: "Wind at your muzzle, wind at mid-range, and wind at the target are rarely the same. Wind near you has more time to act on the bullet before it arrives, so it's often weighted as the most important read — but a serious wind call blends conditions across the full path, not just what you feel standing at the line." },
    { type: 'p', html: "A handheld wind meter (a \"Kestrel\" is the common brand name shooters use as shorthand) gives an accurate speed reading <em>at your position</em> — useful, but it's still only one point along that flight path. Reading mirage and vegetation downrange fills in the rest." }
  ],
  quiz: [
    { type: 'mc', q: "Wind blowing from your 3 o'clock or 9 o'clock (perpendicular to your line of fire) is called:", options: ["No value", "Half value", "Full value", "Cross value"], correct: 2,
      explain: "Full value wind is perpendicular to the shot and produces the maximum horizontal push." },
    { type: 'mc', q: "Wind blowing from 12 o'clock (straight at you) or 6 o'clock (straight behind) is:", options: ["Full value", "No value / minimal horizontal value", "Half value", "Impossible to have"], correct: 1,
      explain: "Wind along the line of the shot produces little horizontal drift, hence \"no value.\"" },
    { type: 'mc', q: "Wind from roughly 1-2, 4-5, 7-8, or 10-11 o'clock is treated as:", options: ["Full value", "No value", "Half value", "Double value"], correct: 2,
      explain: "These diagonal positions are treated as contributing about half the push of a full-value wind." },
    { type: 'mc', q: "Which of the following is a real field method for estimating wind speed through a scope?", options: ["Counting bullet holes", "Reading the mirage/heat shimmer at high magnification", "Checking the rifle's serial number", "Measuring barrel temperature"], correct: 1,
      explain: "Mirage reading is a standard technique precision shooters use to gauge wind speed and direction without instruments." },
    { type: 'mc', q: "Why do experienced wind callers pay attention to wind conditions along the entire flight path, not just at their own position?", options: ["Downrange wind doesn't actually matter", "Wind is rarely uniform over distance, and a handheld meter at the shooter only reads one point along the path", "A wind meter reading is always wrong", "It's only relevant indoors"], correct: 1,
      explain: "Wind near the shooter often has outsized effect since it acts on the bullet longest, but a full call blends the whole path, not one single reading." }
  ]
},

// ======================================================================
{
  id: 8,
  title: "Windage with Mils",
  tagline: "Turning a wind read into a mil hold or dial.",
  content: [
    { type: 'p', html: "Just like elevation, windage correction is usually built from a reference chart calculated for your specific load — typically expressed as the mils needed at a reference wind speed (commonly 10 mph), full value, at each range." },
    { type: 'table', headers: ["Range (yd)", "Wind Mils @ 10 mph, Full Value"], rows: WIND_ROWS },
    { type: 'p', html: "From that reference, you scale the hold for the wind you actually have:" },
    { type: 'formula', text: "Wind Hold = Chart Value × (Actual Speed ÷ Reference Speed) × Value Factor" },
    { type: 'p', html: "Value factor: <code>1.0</code> for full value, <code>0.5</code> for half value, roughly <code>0</code> for no value." },
    { type: 'p', html: "<strong>Worked example 1:</strong> 300 yd, wind is 15 mph at 3 o'clock (full value).<br>Hold = 0.6 × (15 ÷ 10) × 1.0 = <strong>0.9 mil</strong>." },
    { type: 'p', html: "<strong>Worked example 2:</strong> 400 yd, wind is 10 mph at 4-5 o'clock (half value).<br>Hold = 1.0 × (10 ÷ 10) × 0.5 = <strong>0.5 mil</strong>." },
    { type: 'callout', label: "Direction", text: "Hold or dial into the wind — toward the direction the wind is coming from. A left-to-right wind pushes your bullet right, so you hold or dial left to bring it back." },
    { type: 'callout', label: 'On the Clock', text: "A gridded reticle lets you combine this windage hold with your elevation hold from the previous lessons at a single grid intersection — one holdover point, no turret movement, for fast transitions between targets." }
  ],
  quiz: [
    { type: 'numeric', q: "Using this reference wind chart, what is the value at 300 yards (10 mph, full value)?", reference: REF_WIND, answer: 0.6, tolerance: 0.05, unit: "mil",
      explain: "Straight from the table: 300 yd → 0.6 mil at 10 mph full value." },
    { type: 'numeric', q: "At 400 yards, actual wind is 20 mph, full value. Using this reference chart's 400 yd value, what's the adjusted hold?", reference: REF_WIND, answer: 2.0, tolerance: 0.15, unit: "mil",
      explain: "1.0 × (20 ÷ 10) × 1.0 = 2.0 mil — doubling the speed doubles the hold." },
    { type: 'numeric', q: "At 300 yards, actual wind is 10 mph but at half value (e.g. 4-5 o'clock). Using this reference chart's 300 yd value, what's the adjusted hold?", reference: REF_WIND, answer: 0.3, tolerance: 0.05, unit: "mil",
      explain: "0.6 × (10 ÷ 10) × 0.5 = 0.3 mil." },
    { type: 'mc', q: "Wind is coming from your left (9 o'clock), full value. Which way do you hold or dial to compensate?", options: ["Right, downwind", "Left, into the wind", "Up", "Down"], correct: 1,
      explain: "The wind pushes the bullet to the right, so you hold/dial left — into the wind — to cancel that push." },
    { type: 'mc', q: "Holding range and value constant, doubling the wind speed roughly:", options: ["Halves the needed hold", "Has no effect on the hold", "Doubles the needed hold", "Quadruples the needed hold"], correct: 2,
      explain: "The wind formula scales linearly with speed in this model — double the speed, double the hold." }
  ]
},

// ======================================================================
{
  id: 9,
  title: "Capstone: Full Engagement",
  tagline: "Combine ranging, elevation, angle, and windage under one sequence.",
  content: [
    { type: 'p', html: "Every skill in this course feeds into one repeatable sequence. A competent PRS-style shooter should be able to run this sequence calmly, in order, on demand, under time pressure." },
    { type: 'heading', text: "The Engagement Sequence" },
    { type: 'list', ordered: true, items: [
      "Range the target — mil formula (known size ÷ mils read) or a rangefinder.",
      "If the shot is meaningfully uphill or downhill, apply the cosine correction to get the effective range.",
      "Look up or interpolate your trued elevation dope for that corrected range.",
      "Read the wind — value, direction, and speed along the flight path — and calculate the windage hold.",
      "Dial (tracking revolutions) or hold the elevation correction.",
      "Dial or hold the windage correction.",
      "Confirm your reticle placement and break the shot.",
      "Call your shot, observe impact, and correct before the next round."
    ]},
    { type: 'callout', text: "This sequence, repeated until it's automatic under time pressure, is the core skill set of a competent mil-scope shooter — the foundation you'd bring into a PRS-style match." },
    { type: 'heading', text: "Reference Tables" },
    { type: 'p', html: "Elevation and windage, side by side:" },
    { type: 'table', headers: ["Range (yd)", "Elevation (mil)", "Wind Mils @ 10 mph Full Value"], rows: REF_COMBINED.rows },
    { type: 'p', html: "Angle correction:" },
    { type: 'table', headers: ["Angle Off Horizontal", "Cosine Multiplier"], rows: COSINE_ROWS }
  ],
  quiz: [
    { type: 'numeric', q: "A target known to be 60 cm tall spans 1.0 mil in your reticle. What is the range in meters?", answer: 600, tolerance: 25, unit: "m",
      explain: "(60 × 10) ÷ 1.0 = 600 m." },
    { type: 'numeric', q: "Using this reference table, what elevation (in mil) would you dial at 800 yards, flat ground?", reference: REF_COMBINED, answer: 10.8, tolerance: 0.3, unit: "mil",
      explain: "Straight from the table: 800 yd → 10.8 mil elevation." },
    { type: 'numeric', q: "A target is at 800 yd line-of-sight, but at a 40° downhill angle. Using this cosine table, what's the corrected range in yards?", reference: REF_COSINE, answer: 616, tolerance: 30, unit: "yd",
      explain: "0.77 × 800 = 616 yd corrected range — meaningfully less than the raw 800 yd line-of-sight distance." },
    { type: 'numeric', q: "At 500 yards, wind is 10 mph, full value. Using this reference table's 500 yd wind value, what's your windage hold?", reference: REF_COMBINED, answer: 1.5, tolerance: 0.1, unit: "mil",
      explain: "The table value (1.5 mil) already assumes 10 mph full value, so no scaling is needed here." },
    { type: 'mc', q: "Mid-string, the wind noticeably picks up before your next shot. What should you do?", options: ["Keep the same windage hold — it was correct for the first shot", "Re-assess the wind and adjust your hold or dial before firing again", "Ignore wind entirely for follow-up shots", "Switch to a different dope card"], correct: 1,
      explain: "Wind is dynamic. A correction that was right a moment ago may not be right now — always re-read before the next shot." },
    { type: 'mc', q: "What is the correct order of the core engagement sequence taught in this course?", options: [
        "Fire → Range → Elevation → Windage",
        "Windage → Elevation → Range → Fire",
        "Range (+ angle correction) → Elevation → Windage → Confirm → Fire",
        "Elevation → Fire → Range → Windage"
      ], correct: 2,
      explain: "You must know the (corrected) range before you can look up elevation or scale windage — then confirm and fire." },
    { type: 'mc', q: "Having completed this course, you should now understand:", options: [
        "Advanced exterior ballistics software development",
        "Mil-based ranging, angle-corrected elevation, turret mechanics, and windage — the foundation to compete in a PRS-style match using mils",
        "How to gunsmith a custom rifle",
        "Competitive shooting league administrative rules"
      ], correct: 1,
      explain: "This course builds the full mil-reading, ranging, ballistics, turret, angle, and windage skill set needed to run a mil scope competently in competition." }
  ]
}

];
