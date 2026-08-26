// Course content. Each level = lesson content blocks + a gating quiz.
// Block types consumed by app.js: p, heading, callout, formula, list, table, svg
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
    { type: 'p', html: "To read how many mils a target or gap spans, count from one edge to the other using the hash marks, including partial marks. In the diagram above, the bracketed span is measured directly off the horizontal stadia." }
  ],
  quiz: [
    { type: 'mc', q: "What is the main advantage of a First Focal Plane (FFP) reticle for mil-based work?", options: ["It's cheaper to manufacture", "Mil values stay accurate at any magnification setting", "It only works at one zoom level", "It removes the need for hash marks"], correct: 1,
      explain: "FFP reticles grow and shrink with zoom, so the mil spacing is always true — at 3x or 18x." },
    { type: 'mc', q: "On a Second Focal Plane (SFP) scope, mil values printed on the reticle are only accurate at:", options: ["Any magnification", "The lowest magnification only", "One specific magnification, usually maximum zoom", "They're never accurate"], correct: 2,
      explain: "SFP reticles don't change size with zoom, so the math only works at the single power the reticle was calibrated for." },
    { type: 'numeric', q: "Looking at the bracketed reticle diagram from this lesson, what mil value does the bracket span?", answer: 2.4, tolerance: 0.1, unit: "mil",
      explain: "The bracket was drawn to span 2.4 mil — practice reading brackets like this off the hash marks." },
    { type: 'mc', q: "Minor tick marks between the major whole-mil hashes typically represent:", options: ["Wind speed", "Fractions of a mil, often 0.2 mil increments", "Bullet caliber", "Nothing — they're purely decorative"], correct: 1,
      explain: "Minor ticks let you read finer subtensions than whole mils, commonly in 0.2 mil steps." },
    { type: 'mc', q: "Why do many long-range shooters prefer FFP scopes specifically for mil ranging and holdovers?", options: ["FFP scopes are always lighter", "They can range and hold at any power setting without recalculating for magnification", "FFP reticles are illuminated by default", "There is no real preference"], correct: 1,
      explain: "The one-magnification limitation of SFP scopes is exactly what FFP removes — a real practical advantage in the field." }
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
    { type: 'numeric', q: "Using the diagram in this lesson: the target is known to be 60 cm tall and spans 2.0 mils. What is the range in meters?", answer: 300, tolerance: 15, unit: "m",
      explain: "(60 × 10) ÷ 2.0 = 300 m — matches the worked example." },
    { type: 'mc', q: "What is the main real-world limitation of mil-based ranging?", options: ["It only works past 500 yards", "It requires a laser to work at all", "Any error in the assumed target size skews the range estimate directly", "It cannot be done through a scope"], correct: 2,
      explain: "The math is only as good as the size assumption feeding it — a wrong size means a wrong range, however carefully you read the mils." }
  ]
},

// ======================================================================
{
  id: 4,
  title: "Turrets & Click Values",
  tagline: "Dialing vs. holding — two ways to apply a correction.",
  content: [
    { type: 'p', html: "Once you know how many mils of correction you need — for drop, for wind, for anything — you have two ways to apply it: turn a turret, or hold off using the reticle." },
    { type: 'heading', text: "Click Values" },
    { type: 'p', html: "Most MRAD (mil-based) turrets adjust in <strong>0.1 mil</strong> increments per click, and are usually marked directly in mils rather than \"minutes.\" That keeps the math in the turret consistent with the math in the reticle." },
    { type: 'table', headers: ["Adjustment Needed", "Clicks (at 0.1 mil/click)"], rows: [
      ["0.1 mil", "1 click"],
      ["0.5 mil", "5 clicks"],
      ["1.0 mil", "10 clicks"],
      ["2.3 mil", "23 clicks"]
    ]},
    { type: 'heading', text: "Dialing vs. Holding" },
    { type: 'callout', label: "Dialing", text: "Physically turn the elevation and/or windage turret so the scope's own zero point shifts to match the needed correction. Afterward, a plain center-crosshair hold lands the shot." },
    { type: 'callout', label: "Holding", text: "Leave the turrets at zero and use the hash marks in the reticle itself to hold over, under, left, or right by the needed number of mils." },
    { type: 'p', html: "Dialing is precise and intuitive for a single known range. Holding is faster when engaging multiple targets at different distances in succession, since there's no turret to reset between shots — you just shift your eye to a different hash mark." },
    { type: 'p', html: "Good turrets include a <strong>zero stop</strong> — a mechanical stop that keeps you from dialing below your original zero, and lets you return to it by feel in the dark or under stress." }
  ],
  quiz: [
    { type: 'mc', q: "A common click value on MRAD (mil) turrets is:", options: ["0.1 mil per click", "1 full mil per click", "1 MOA per click", "0.25 inch per click"], correct: 0,
      explain: "0.1 mil per click is the standard for most mil-based precision turrets." },
    { type: 'numeric', q: "At 0.1 mil per click, how many clicks make up 1.0 full mil of adjustment?", answer: 10, tolerance: 0, unit: "clicks",
      explain: "1.0 ÷ 0.1 = 10 clicks." },
    { type: 'mc', q: "\"Dialing\" a correction means:", options: ["Ignoring the correction entirely", "Turning the turret so the scope's zero shifts to match the needed correction", "Switching to a different reticle", "Adjusting your rifle's stock"], correct: 1,
      explain: "Dialing physically moves the point of impact to the point of aim by adjusting the turret." },
    { type: 'mc', q: "\"Holding\" a correction means:", options: ["Turning the turret before every shot", "Keeping turrets at zero and using reticle hash marks to aim off-center", "Waiting for better conditions", "Removing the scope from the rifle"], correct: 1,
      explain: "Holding uses the reticle itself as the ruler — no turret movement required." },
    { type: 'mc', q: "What's the main advantage of holding over dialing when engaging several targets at different ranges quickly?", options: ["It's more accurate at extreme range", "No turret to re-dial between shots, so follow-ups are faster", "It requires less practice", "It works better in low light"], correct: 1,
      explain: "Skipping the turret adjustment between shots is the main speed advantage of holding." },
    { type: 'numeric', q: "You need 0.7 mil of elevation correction with a 0.1-mil-per-click turret. How many clicks do you dial?", answer: 7, tolerance: 0, unit: "clicks",
      explain: "0.7 ÷ 0.1 = 7 clicks." }
  ]
},

// ======================================================================
{
  id: 5,
  title: "Elevation for Bullet Drop",
  tagline: "Reading a dope card and dialing or holding for drop.",
  content: [
    { type: 'p', html: "Gravity pulls every bullet down from the moment it leaves the muzzle, and it pulls harder — relative to the target — the farther the bullet has to travel. A <strong>dope card</strong> (or ballistic drop chart) tells you exactly how many mils of \"up\" correction to apply at each range for your specific rifle, ammunition, and zero." },
    { type: 'table', headers: ["Range (yd)", "Elevation (mil)"], rows: [
      ["100", "0.0"], ["200", "0.7"], ["300", "1.6"], ["400", "2.8"], ["500", "4.3"]
    ]},
    { type: 'p', html: "Notice the gap between rows grows — drop isn't linear. Each additional 100 yards costs more elevation than the last, because the bullet is slowing down and falling for a longer time." },
    { type: 'callout', label: "Important", warn: true, text: "A dope card is only valid for the exact rifle, ammunition lot, and zero it was built for — and for similar conditions (altitude, temperature). Never trust someone else's dope card blindly; verify your own at the range." },
    { type: 'heading', text: "Applying It" },
    { type: 'p', html: "<strong>Worked example:</strong> engaging a target at 300 yards. The dope card shows <code>1.6 mil</code>. You either dial 1.6 mil of elevation on the turret, or hold 1.6 mil above your point of aim using the reticle's vertical hash marks." }
  ],
  quiz: [
    { type: 'mc', q: "A dope card lists, for each range, how many mils of elevation to add. This compensates for:", options: ["Wind drift", "Bullet drop due to gravity", "Barrel heat", "Scope parallax"], correct: 1,
      explain: "Elevation dope exists specifically to counter gravity's effect on the bullet's trajectory over distance." },
    { type: 'numeric', q: "Using this lesson's dope table, how many mils of elevation are needed at 400 yards?", answer: 2.8, tolerance: 0.1, unit: "mil",
      explain: "Straight from the table: 400 yd → 2.8 mil." },
    { type: 'mc', q: "Why is a dope card specific to one rifle, ammo lot, and zero combination?", options: ["It isn't — any dope card works for any rifle", "Different loads have different velocities and drop curves, and different zeros shift the whole chart", "Dope cards are purely decorative", "Only the barrel length matters"], correct: 1,
      explain: "Velocity, bullet shape, and your specific zero all change the drop curve — so the numbers don't transfer between setups." },
    { type: 'mc', q: "Before trusting a dope card in the field, you should:", options: ["Assume it's correct if it came from a ballistic app", "Verify it live at the range under similar conditions", "Double the values just to be safe", "Ignore elevation entirely under 300 yards"], correct: 1,
      explain: "Calculated dope is a starting point — confirmed dope, shot for real, is what you trust under pressure." },
    { type: 'mc', q: "As range increases, the elevation needed to compensate for drop:", options: ["Decreases", "Stays constant", "Increases, and increases at a growing (non-linear) rate", "Becomes irrelevant"], correct: 2,
      explain: "The gaps between rows in the dope table grow larger at longer range — drop accelerates as the bullet slows." },
    { type: 'numeric', q: "Dope calls for 1.6 mil at 300 yards. Dialing with a 0.1-mil-per-click turret, how many clicks is that?", answer: 16, tolerance: 0, unit: "clicks",
      explain: "1.6 ÷ 0.1 = 16 clicks." }
  ]
},

// ======================================================================
{
  id: 6,
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
    ]}
  ],
  quiz: [
    { type: 'mc', q: "Wind blowing from your 3 o'clock or 9 o'clock (perpendicular to your line of fire) is called:", options: ["No value", "Half value", "Full value", "Cross value"], correct: 2,
      explain: "Full value wind is perpendicular to the shot and produces the maximum horizontal push." },
    { type: 'mc', q: "Wind blowing from 12 o'clock (straight at you) or 6 o'clock (straight behind) is:", options: ["Full value", "No value / minimal horizontal value", "Half value", "Impossible to have"], correct: 1,
      explain: "Wind along the line of the shot produces little horizontal drift, hence \"no value.\"" },
    { type: 'mc', q: "Wind from roughly 1-2, 4-5, 7-8, or 10-11 o'clock is treated as:", options: ["Full value", "No value", "Half value", "Double value"], correct: 2,
      explain: "These diagonal positions are treated as contributing about half the push of a full-value wind." },
    { type: 'mc', q: "For a given wind speed, which direction pushes the bullet off target the most?", options: ["12 o'clock", "Full value (3 or 9 o'clock)", "6 o'clock", "It's the same in every direction"], correct: 1,
      explain: "Full value wind is perpendicular to the bullet's path, maximizing horizontal drift." },
    { type: 'mc', q: "Which of the following is a real field method for estimating wind speed through a scope?", options: ["Counting bullet holes", "Reading the mirage/heat shimmer at high magnification", "Checking the rifle's serial number", "Measuring barrel temperature"], correct: 1,
      explain: "Mirage reading is a standard technique precision shooters use to gauge wind speed and direction without instruments." }
  ]
},

// ======================================================================
{
  id: 7,
  title: "Windage with Mils",
  tagline: "Turning a wind read into a mil hold or dial.",
  content: [
    { type: 'p', html: "Just like elevation, windage correction is usually built from a reference chart calculated for your specific load — typically expressed as the mils needed at a reference wind speed (commonly 10 mph), full value, at each range." },
    { type: 'table', headers: ["Range (yd)", "Wind Mils @ 10 mph, Full Value"], rows: [
      ["100", "0.1"], ["200", "0.3"], ["300", "0.6"], ["400", "1.0"], ["500", "1.5"]
    ]},
    { type: 'p', html: "From that reference, you scale the hold for the wind you actually have:" },
    { type: 'formula', text: "Wind Hold = Chart Value × (Actual Speed ÷ Reference Speed) × Value Factor" },
    { type: 'p', html: "Value factor: <code>1.0</code> for full value, <code>0.5</code> for half value, roughly <code>0</code> for no value." },
    { type: 'p', html: "<strong>Worked example 1:</strong> 300 yd, wind is 15 mph at 3 o'clock (full value).<br>Hold = 0.6 × (15 ÷ 10) × 1.0 = <strong>0.9 mil</strong>." },
    { type: 'p', html: "<strong>Worked example 2:</strong> 400 yd, wind is 10 mph at 4-5 o'clock (half value).<br>Hold = 1.0 × (10 ÷ 10) × 0.5 = <strong>0.5 mil</strong>." },
    { type: 'callout', label: "Direction", text: "Hold or dial into the wind — toward the direction the wind is coming from. A left-to-right wind pushes your bullet right, so you hold or dial left to bring it back." }
  ],
  quiz: [
    { type: 'numeric', q: "Using this lesson's wind chart, what is the reference wind mil value at 300 yards (10 mph, full value)?", answer: 0.6, tolerance: 0.05, unit: "mil",
      explain: "Straight from the table: 300 yd → 0.6 mil at 10 mph full value." },
    { type: 'numeric', q: "At 400 yards, actual wind is 20 mph, full value. Chart value at 400 yd (10 mph) is 1.0 mil. What's the adjusted hold?", answer: 2.0, tolerance: 0.15, unit: "mil",
      explain: "1.0 × (20 ÷ 10) × 1.0 = 2.0 mil — doubling the speed doubles the hold." },
    { type: 'numeric', q: "At 300 yards, actual wind is 10 mph but at half value (e.g. 4-5 o'clock). Chart value is 0.6 mil at 10 mph full value. What's the adjusted hold?", answer: 0.3, tolerance: 0.05, unit: "mil",
      explain: "0.6 × (10 ÷ 10) × 0.5 = 0.3 mil." },
    { type: 'mc', q: "Wind is coming from your left (9 o'clock), full value. Which way do you hold or dial to compensate?", options: ["Right, downwind", "Left, into the wind", "Up", "Down"], correct: 1,
      explain: "The wind pushes the bullet to the right, so you hold/dial left — into the wind — to cancel that push." },
    { type: 'mc', q: "Holding range and value constant, doubling the wind speed roughly:", options: ["Halves the needed hold", "Has no effect on the hold", "Doubles the needed hold", "Quadruples the needed hold"], correct: 2,
      explain: "The wind formula scales linearly with speed in this model — double the speed, double the hold." }
  ]
},

// ======================================================================
{
  id: 8,
  title: "Capstone: Full Engagement",
  tagline: "Combine ranging, elevation, and windage under one sequence.",
  content: [
    { type: 'p', html: "Every skill in this course feeds into one repeatable sequence. A beginning precision shooter should be able to run this sequence calmly, in order, on demand." },
    { type: 'heading', text: "The Engagement Sequence" },
    { type: 'list', ordered: true, items: [
      "Range the target — mil formula (known size ÷ mils read) or a rangefinder.",
      "Look up or interpolate your elevation dope for that range.",
      "Read the wind — value, direction, and speed — and calculate the windage hold.",
      "Dial or hold the elevation correction.",
      "Dial or hold the windage correction.",
      "Confirm your reticle placement and break the shot.",
      "Call your shot, observe impact, and correct before the next round."
    ]},
    { type: 'callout', text: "This sequence, repeated until it's automatic under time pressure, is the core skill set that separates a beginning precision/sharpshooter from someone who simply owns a mil scope." },
    { type: 'heading', text: "Reference Tables" },
    { type: 'table', headers: ["Range (yd)", "Elevation (mil)", "Wind Mils @ 10 mph Full Value"], rows: [
      ["100", "0.0", "0.1"], ["200", "0.7", "0.3"], ["300", "1.6", "0.6"], ["400", "2.8", "1.0"], ["500", "4.3", "1.5"]
    ]}
  ],
  quiz: [
    { type: 'numeric', q: "A target known to be 60 cm tall spans 1.0 mil in your reticle. What is the range in meters?", answer: 600, tolerance: 25, unit: "m",
      explain: "(60 × 10) ÷ 1.0 = 600 m." },
    { type: 'numeric', q: "Using the reference table, what elevation (in mil) would you dial at 500 yards?", answer: 4.3, tolerance: 0.1, unit: "mil",
      explain: "Straight from the table: 500 yd → 4.3 mil elevation." },
    { type: 'numeric', q: "At 500 yards, wind is 10 mph, full value. Using the reference table's 500 yd wind value, what's your windage hold?", answer: 1.5, tolerance: 0.1, unit: "mil",
      explain: "The table value (1.5 mil) already assumes 10 mph full value, so no scaling is needed here." },
    { type: 'mc', q: "Mid-string, the wind noticeably picks up before your next shot. What should you do?", options: ["Keep the same windage hold — it was correct for the first shot", "Re-assess the wind and adjust your hold or dial before firing again", "Ignore wind entirely for follow-up shots", "Switch to a different dope card"], correct: 1,
      explain: "Wind is dynamic. A correction that was right a moment ago may not be right now — always re-read before the next shot." },
    { type: 'mc', q: "What is the correct order of the core engagement sequence taught in this course?", options: [
        "Fire → Range → Elevation → Windage",
        "Windage → Elevation → Range → Fire",
        "Range → Elevation → Windage → Confirm → Fire",
        "Elevation → Fire → Range → Windage"
      ], correct: 2,
      explain: "You must know the range before you can look up elevation or scale windage — then confirm and fire." },
    { type: 'mc', q: "Having completed this course, you should now understand:", options: [
        "Advanced exterior ballistics software development",
        "The fundamentals of mil-based ranging, elevation, and windage correction — the foundation of a beginning precision shooter",
        "How to gunsmith a custom rifle",
        "Competitive shooting league rules"
      ], correct: 1,
      explain: "This course builds the foundational mil-reading, ranging, elevation, and windage skill set — the baseline for a beginning sharpshooter." }
  ]
}

];
