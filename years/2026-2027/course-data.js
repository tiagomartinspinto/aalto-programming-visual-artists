// Source of truth for the 2026-2027 year page.
// assets/year.js renders session cards, sketch cards, slide controls, and search
// from this data. Update this file before editing repeated markup by hand, then
// run npm run build:index and npm run check.
window.COURSE_DATA = {
  year: "2026-2027",
  lab: {
    defaultSketch: "face-exercise",
  },
  currentSession: {
    id: "session-01",
    description: "Session 01 starts with coordinates, shapes, color, and one reusable face-drawing function.",
    links: [
      { label: "Open Session 01", href: "sessions/session-01/", primary: true },
    ],
  },
  sessions: [
    {
      id: "session-01",
      kicker: "Session 01",
      title: "Drawing, Coordinates and First Functions",
      description: "Coordinates, shapes, and color become one reusable function that draws three faces instead of one.",
      duration: "2h 45m",
      tags: ["drawing", "coordinates", "functions"],
      href: "sessions/session-01/",
      links: [
        { label: "Open session page", href: "sessions/session-01/", primary: true },
      ],
    },
    {
      id: "session-02",
      kicker: "Session 02",
      title: "Variables, Mouse Input and Mapping",
      description: "Named values that change every frame, mouse position, and map() driving color and movement.",
      duration: "2h 45m",
      tags: ["variables", "mouse", "map()"],
      href: "sessions/session-02/",
      links: [
        { label: "Open session page", href: "sessions/session-02/", primary: true },
      ],
    },
  ],
  sketches: [
    {
      id: "face-exercise",
      title: "Face Exercise",
      session: "Session 01",
      page: "web/face-exercise/index.html",
      source: "source/session-01/face-exercise/face-exercise.pde",
      description: "See how one reusable function draws three faces at different sizes.",
      try: "change the eye offsets, add a parameter, or call drawFace() again.",
      tags: ["functions", "drawing"],
      difficulty: "intro",
      related: ["mouse-shapes"],
    },
    {
      id: "color-house",
      title: "Color House",
      session: "Session 02",
      page: "web/color-house/index.html",
      source: "source/session-02/color-house/color-house.pde",
      description: "Click to see two variables change, then watch the drawing follow.",
      try: "change the random ranges, or randomize a third variable.",
      tags: ["mousePressed()", "state"],
      difficulty: "intro",
      related: ["mouse-shapes"],
    },
    {
      id: "mouse-shapes",
      title: "Mouse Shapes",
      session: "Session 02",
      page: "web/mouse-shapes/index.html",
      source: "source/session-02/mouse-shapes/mouse-shapes.pde",
      description: "Move the pointer to see mouseX and mouseY drive position and color through map().",
      try: "change a map() output range, or add a click-driven variable.",
      tags: ["mouseX", "map()", "variables"],
      difficulty: "intro",
      related: ["face-exercise", "color-house"],
    },
  ],
  slides: [],
  searchExtras: [],
};
