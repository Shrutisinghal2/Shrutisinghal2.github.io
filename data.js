// ============================================================
//  EDIT THIS FILE to update your portfolio.
//  - Add a project: copy one { ... } block in `projects`.
//    Put the live link in `live` and GitHub link in `code`;
//    QR codes are created automatically.
//  - Optional: put a screenshot in the folder and set `image`.
//  - Your photo: save it as photo.jpg next to index.html.
// ============================================================
window.PORTFOLIO = {
  name: "Shruti Singhal",
  designation: "Software Engineer | Software & Product",
  company: "",                // leave empty to show only the line above
  location: "Jaipur, Rajasthan",
  photo: "photo.jpg",
  email: "shrutisinghal3003@gmail.com",
  phone: "",               // optional, e.g. "+91-XXXXXXXXXX" (it will be public)
  resume: "Shruti_Singhal_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/shruti-singhal-39b078382",
    github: "https://github.com/Shrutisinghal2",
    trailhead: "https://www.salesforce.com/trailblazer/ssinghal114",
    portfolio: "https://shrutisinghal2.github.io/",
  },

  summary: [
    "I'm an MCA graduate (Banasthali Vidyapith, 2026) focused on software testing and quality. During my internship at PaySecure Technologies I tested payment processing and merchant management modules.",
    "I write test cases from requirements, run functional, integration and regression tests, reproduce defects and work with developers until they're fixed. I'm a Salesforce Certified Platform Developer I and enjoy building small apps, from Lightning Web Components to JavaScript web apps, to understand quality from the developer's side too.",
    "I'm looking for roles in software development, testing and product.",
  ],

  projects: [
    {
      name: "AniFind", tagline: "Anime discovery web app", status: "Live",
      image: "shots/anifind.png",
      description: "Search anime, filter by genre, browse trending and seasonal lists, keep a watchlist and find official places to watch.",
      tech: ["JavaScript", "GraphQL", "AniList API", "GitHub Pages"],
      live: "https://shrutisinghal2.github.io/anifind/",
      code: "https://github.com/Shrutisinghal2/anifind",
    },
    {
      name: "SauceDemo Test Automation", tagline: "Playwright end-to-end tests", status: "In progress",
      description: "Automated login tests for a demo e-commerce site, run across Chromium, Firefox and WebKit, growing into a Page Object Model framework.",
      tech: ["Playwright", "JavaScript", "Git"],
      live: "", code: "", note: "Code coming soon on GitHub.",
    },
    {
      name: "BMI Calculator", tagline: "Lightning Web Component", status: "Live",
      description: "Calculates Body Mass Index from height and weight with input validation and a result category.",
      tech: ["LWC", "JavaScript", "Experience Cloud"],
      live: "https://shrutisinghal2.github.io/apps/bmi/", image: "shots/bmi.png", code: "https://github.com/Shrutisinghal2/myPortfolio/tree/main/force-app/main/default/lwc/bmiCalculator",
    },
    {
      name: "Alarm Clock", tagline: "Lightning Web Component", status: "Live",
      description: "A live clock with hour, minute and AM/PM dropdowns to set and clear an alarm.",
      tech: ["LWC", "JavaScript", "Experience Cloud"],
      live: "https://shrutisinghal2.github.io/apps/alarm/", image: "shots/alarm.png", code: "https://github.com/Shrutisinghal2/myPortfolio/tree/main/force-app/main/default/lwc/alarmClockApp",
    },
    {
      name: "Currency Converter", tagline: "Lightning Web Component", status: "Live",
      description: "Converts between currencies using live exchange rates from a REST API.",
      tech: ["LWC", "REST API", "Experience Cloud"],
      live: "https://shrutisinghal2.github.io/apps/currency/", image: "shots/currency.png", code: "https://github.com/Shrutisinghal2/myPortfolio/tree/main/force-app/main/default/lwc/currencyConvertor",
    },
    {
      name: "Weather App", tagline: "LWC + Apex", status: "Live",
      description: "Shows current weather for any city, calling the OpenWeatherMap API through an Apex controller.",
      tech: ["LWC", "Apex", "REST API"],
      live: "https://shrutisinghal2.github.io/apps/weather/", image: "shots/weather.png", code: "https://github.com/Shrutisinghal2/myPortfolio/tree/main/force-app/main/default/lwc/weatherApp",
    },
    {
      name: "Note Taking App", tagline: "LWC + Apex", status: "Live",
      description: "Create, edit and delete notes stored as Salesforce records through an Apex controller.",
      tech: ["LWC", "Apex", "SOQL"],
      live: "https://shrutisinghal2.github.io/apps/notes/", image: "shots/notes.png", code: "https://github.com/Shrutisinghal2/myPortfolio/tree/main/force-app/main/default/lwc/noteTakingApp",
    },
    {
      name: "Employee Survey", tagline: "Salesforce Surveys", status: "Live",
      description: "An employee feedback survey built with Salesforce Surveys and shared through an invitation link.",
      tech: ["Salesforce Surveys"],
      live: "https://shrutisinghal2.github.io/apps/survey/", image: "shots/survey.png", code: "",
    },
  ],

  experience: [
    {
      role: "Software Development and Testing Intern",
      company: "PaySecure Technologies Pvt. Ltd.",
      location: "Jaipur",
      dates: "Jan 2026 – Oct 2026",
      current: false,
      points: [
        "Wrote and executed test cases and scenarios from product requirements for payment processing and merchant management modules.",
        "Ran functional, integration and regression tests across dashboard and backend transaction workflows.",
        "Reproduced and logged defects in JIRA with clear steps and evidence, and worked with developers through fixes and retesting.",
        "Verified REST API behaviour with Postman to confirm business logic and fixes.",
      ],
    },
  ],

  skills: [
    { group: "Technical skills", items: ["Manual testing", "Functional testing", "Integration testing", "Regression testing", "API testing", "Test case design", "JavaScript", "HTML", "CSS", "GraphQL", "Apex", "SOQL", "Lightning Web Components"] },
    { group: "Tools", items: ["JIRA", "Postman", "Git", "GitHub", "VS Code", "Salesforce CLI", "MySQL", "MongoDB"] },
    { group: "Methodologies", items: ["SDLC", "STLC", "Agile"] },
    { group: "Learning", items: ["Playwright", "Java"] },
  ],

  education: [
    { title: "Master of Computer Applications (MCA)", institution: "Banasthali Vidyapith", year: "2026", score: "CGPA 8.0" },
    { title: "Bachelor of Computer Applications (BCA)", institution: "University of Rajasthan, Jaipur", year: "2024", score: "83%" },
  ],

  certifications: [
    "Salesforce Certified Platform Developer I",
  ],

  other: {
    achievements: ["Selected by Infosys in the on-campus recruitment drive (Nov 2025)", "Launched AniFind, a live web app used on GitHub Pages"],
    languages: [],          // e.g. ["English", "Hindi"]
    superbadges: [],        // Trailhead superbadges, if any
  },
};
