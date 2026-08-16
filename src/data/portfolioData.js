export const personalDetails = {
  name: "Gaurav Suryavanshi",
  title: "Full-Stack Developer & Competitive Programmer",
  subtitles: [
    "Software Engineer",
    "Full-Stack Web Developer",
    "Competitive Programmer (LeetCode 1670)",
    "B.Tech Student @ IIITDM Jabalpur"
  ],
  bio: "Passionate Full-Stack Developer and B.Tech student at PDPM IIITDM Jabalpur. Experienced in building scalable full-stack web applications with Node.js, Express, React, and MongoDB, alongside a robust background in Data Structures, Algorithms, and Competitive Programming (500+ problems solved, Flipkart GRID 8.0 Semi-Finalist).",
  location: "Hisar, Haryana, India — 125001",
  phone: "+91 7404666092",
  email: "itzgaurav003@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/gaurav-suryavanshi",
    github: "https://github.com/Dev-Gaurav-3",
    leetcode: "https://leetcode.com/u/greedyGaur/",
    codeforces: "https://codeforces.com/profile/itzgaurav003"
  },
  status: "Open for Software Engineering Internships & Roles"
};

export const keyMetrics = [
  { id: 1, label: "LeetCode Contest Rating", value: 1670, suffix: "", icon: "Trophy", description: "Top percentile competitive programmer" },
  { id: 2, label: "DSA Problems Solved", value: 500, suffix: "+", icon: "Code2", description: "Arrays, Trees, Graphs, DP & Greedy" },
  { id: 3, label: "Flipkart GRID 8.0", value: 3, suffix: "rd Round", icon: "Award", description: "Semi-Finalist in flagship SDE challenge" },
  { id: 4, label: "Codeforces Rating", value: 1270, suffix: " (Pupil)", icon: "Zap", description: "Active competitive programming rank" }
];

export const projects = [
  {
    id: "stayscape",
    title: "StayScape",
    subtitle: "Full-Stack Property Rental Platform",
    category: "Full-Stack Web App",
    techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Mapbox API", "Render"],
    description: "Full-stack property rental application inspired by Airbnb, featuring secure user authentication, interactive map search, flash messaging, and complete CRUD functionality.",
    highlights: [
      "Developed full-stack rental platform with secure user authentication, authorization, and complete CRUD operations.",
      "Integrated Mapbox Geocoding API to render interactive map locations and automatically compute coordinate coordinates.",
      "Implemented session-based authentication, flash messaging, and strict form validation for seamless UX.",
      "Structured with MVC architecture, RESTful APIs, Mongoose models, and deployed live on Render with MongoDB Atlas."
    ],
    githubUrl: "https://github.com/Dev-Gaurav-3/StayScape",
    liveUrl: "https://stayscape-nkjp.onrender.com/",
    badge: "Featured App",
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent"
  },
  {
    id: "kanban-board",
    title: "Kanban Board",
    subtitle: "Real-Time Drag & Drop Task Manager",
    category: "Frontend Web App",
    techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "DOM Manipulation", "Local State"],
    description: "Sleek task management application featuring drag-and-drop workflow, real-time column state synchronization, and dynamic DOM manipulation.",
    highlights: [
      "Developed intuitive task management application with native drag-and-drop workflow across columns.",
      "Implemented dynamic DOM updates for real-time task status transitions and column badge counters.",
      "Managed task states and column tracking efficiently for seamless productivity."
    ],
    githubUrl: "https://github.com/Dev-Gaurav-3/Kanban-Board",
    liveUrl: "https://dev-gaurav-3.github.io/Kanban-Board/",
    badge: "Interactive App",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent"
  },
  {
    id: "snake-game",
    title: "Snake Game",
    subtitle: "Classic Arcade Game with Custom Logic",
    category: "JavaScript Game Dev",
    techStack: ["HTML5 Canvas", "CSS3", "JavaScript", "Game Loop Architecture"],
    description: "Classic Snake arcade game with smooth keyboard controls, score tracking system, collision detection algorithms, and responsive UI.",
    highlights: [
      "Implemented custom game loop logic, collision detection, dynamic food generation, and high score tracking.",
      "Handled real-time keyboard inputs for smooth, stutter-free snake movement and direction queueing.",
      "Designed interactive UI with responsive gameplay controls for desktop and mobile."
    ],
    githubUrl: "https://github.com/Dev-Gaurav-3/Snake-Game",
    liveUrl: "https://dev-gaurav-3.github.io/Snake-Game/",
    badge: "Arcade Game",
    gradient: "from-orange-600/20 via-yellow-500/10 to-transparent"
  }
];

export const skillsData = {
  languages: [
    { name: "C++", level: 90, icon: "FileCode", tag: "Primary CP Language" },
    { name: "Python", level: 82, icon: "Terminal", tag: "Scripting & Algorithms" },
    { name: "JavaScript (ES6+)", level: 88, icon: "Braces", tag: "Web & Logic" }
  ],
  coreCS: [
    { name: "Data Structures & Algorithms", level: 92, icon: "Cpu", tag: "500+ Solved" },
    { name: "Object-Oriented Programming (OOP)", level: 88, icon: "Layers", tag: "System Design" },
    { name: "RESTful API Design", level: 85, icon: "Globe", tag: "Backend Arch" },
    { name: "MVC Architecture", level: 85, icon: "LayoutGrid", tag: "Design Pattern" }
  ],
  frontend: [
    { name: "HTML5 & CSS3", level: 90, icon: "Layout", tag: "Semantic & Modern" },
    { name: "JavaScript", level: 88, icon: "Code2", tag: "Async & DOM" },
    { name: "ReactJS", level: 84, icon: "Atom", tag: "Component UI" },
    { name: "Tailwind CSS", level: 86, icon: "Palette", tag: "Modern Styling" }
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "Server", tag: "Runtime Environment" },
    { name: "Express.js", level: 86, icon: "Network", tag: "Web Framework" },
    { name: "MongoDB & Mongoose", level: 82, icon: "Database", tag: "NoSQL DB" },
    { name: "EJS Templates", level: 80, icon: "FileSpreadsheet", tag: "SSR Rendering" },
    { name: "Passport.js Auth", level: 82, icon: "ShieldCheck", tag: "Session & Auth" }
  ],
  tools: [
    { name: "Git & GitHub", level: 88, icon: "GitBranch", tag: "Version Control" },
    { name: "VS Code", level: 92, icon: "Laptop", tag: "IDE & Extensions" },
    { name: "Mapbox API", level: 80, icon: "MapPin", tag: "Geocoding Services" },
    { name: "Render & Atlas", level: 84, icon: "Cloud", tag: "Cloud Deployment" }
  ]
};

export const educationList = [
  {
    institution: "PDPM IIITDM Jabalpur",
    location: "Jabalpur, Madhya Pradesh, India",
    degree: "Bachelor of Technology in Smart Manufacturing",
    duration: "Expected June 2028",
    grade: "CGPA: 7.9",
    highlights: [
      "Focused on core engineering, computer science fundamentals, and smart manufacturing software systems.",
      "Active participant in competitive programming challenges and software development hackathons."
    ],
    isCurrent: true
  },
  {
    institution: "St. Sophia Sr. Sec. School",
    location: "Hisar, Haryana, India",
    degree: "Senior Secondary Education (Class XII)",
    duration: "Graduated",
    grade: "Final Grade: 84.6%",
    highlights: [
      "Strong foundation in Mathematics, Physics, and Computer Science."
    ],
    isCurrent: false
  }
];

export const achievementsList = [
  {
    title: "Flipkart GRID 8.0 Semi-Finalist",
    category: "Hackathon / Competition",
    description: "Qualified for the Semi-Final (Round 3) of Flipkart GRID 8.0 after clearing the competitive coding round in Flipkart's flagship Software Development Challenge.",
    badge: "Round 3 Qualified",
    year: "2024",
    icon: "Award"
  },
  {
    title: "1670 Contest Rating on LeetCode",
    category: "Competitive Programming",
    description: "Achieved a 1670 contest rating on LeetCode (@greedyGaur), demonstrating strong algorithmic problem-solving speed and accuracy.",
    badge: "Top Rating",
    year: "Active",
    icon: "Trophy"
  },
  {
    title: "Codeforces Pupil (Max 1270 Rating)",
    category: "Competitive Programming",
    description: "Reached Pupil rank on Codeforces (1270 max rating) competing against international competitive programmers.",
    badge: "Pupil Rank",
    year: "Active",
    icon: "Flame"
  },
  {
    title: "500+ DSA Problems Solved",
    category: "Data Structures & Algorithms",
    description: "Solved 500+ algorithmic problems on LeetCode across Arrays, Trees, Graphs, Dynamic Programming, and Greedy Algorithms.",
    badge: "500+ Solved",
    year: "Ongoing",
    icon: "Code"
  }
];
