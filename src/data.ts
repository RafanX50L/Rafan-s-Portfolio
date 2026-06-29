import { Project, ExperienceItem, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "MUHAMMED RAFAN M",
  title: "FULL STACK DEVELOPER",
  email: "rafanmu33@gmail.com",
  phone: "+91 9400690106",
  github: "https://github.com", // standard github placeholder that we can style nicely
  linkedin: "https://linkedin.com", // standard linkedin placeholder
  location: "Remote, India",
  summary: "Dynamic and results-driven Full Stack Developer with 6 months of professional remote experience and intensive hands-on project work. Expertise in building high-performance web applications using SvelteKit, Elysia.js + Bun, and OpenSeadragon for deep zoom imaging. Strong background in developing scalable end-to-end solutions with real-time features, payment integrations, and AI capabilities."
};

export const PROJECTS: Project[] = [
  {
    id: "workout-app",
    title: "AI-Powered Home Workout Fitness Application",
    subtitle: "Personalized Workout & Diet Platform",
    description: "Comprehensive fitness platform with AI-driven personalized workout and diet plan generation, featuring real-time communication between trainers and users with integrated payment processing.",
    bullets: [
      "Developed AI-driven personalized workout and diet plan generation system for customized fitness experiences.",
      "Integrated Stripe payment gateway for seamless subscription and trainer session purchases.",
      "Implemented real-time one-to-one video calling with trainers using WebRTC technology.",
      "Built intelligent chatbot system with AI integration for automated user assistance.",
      "Created real-time notification system and chat functionality using Socket.io.",
      "Designed automated weekly workout challenge system using cron jobs for user engagement.",
      "Architected backend following Repository pattern and SOLID principles for scalable code structure."
    ],
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Stripe", "WebRTC", "Socket.io", "AI Integration"],
    liveUrl: "#",
    githubUrl: "#",
    category: "featured",
    iconName: "Dumbbell"
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Enterprise E-Commerce Engine",
    description: "Full-featured e-commerce solution with dual admin and client interfaces, comprehensive product management, and secure payment processing for seamless online shopping experience.",
    bullets: [
      "Built full-featured e-commerce solution with dual admin and client interfaces for comprehensive management.",
      "Implemented comprehensive product management, order processing, and user authentication systems.",
      "Developed responsive frontend using React and modern CSS frameworks for optimal user experience.",
      "Architected backend following MVC pattern for maintainable and scalable code structure.",
      "Integrated secure payment processing and inventory management systems.",
      "Employed efficient database design with MongoDB for scalable data storage and retrieval."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs", "MVC Architecture"],
    liveUrl: "#",
    githubUrl: "#",
    category: "featured",
    iconName: "ShoppingCart"
  },
  {
    id: "quiz-app",
    title: "Quiz Application",
    subtitle: "Interactive Learning & Assessment System",
    description: "An interactive quiz platform that allows users to take coding quizzes, track scores, and view performance results in real time with JWT-based authorization.",
    bullets: [
      "Developed RESTful APIs for quiz and user management with secure JWT-based authentication and role-based access control.",
      "Implemented dynamic quiz rendering and result evaluation using React.js with a responsive UI built using Tailwind CSS.",
      "Integrated MongoDB for storing users, quizzes, and results with optimized data handling using Mongoose."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "additional",
    iconName: "Award"
  },
  {
    id: "user-management",
    title: "User Management System",
    subtitle: "Secure Access Control Platform",
    description: "Comprehensive user management system with role-based authentication and authorization, utilizing cryptographically secure password hashing.",
    bullets: [
      "Implemented JWT authentication with secure password hashing using bcrypt.",
      "Built admin dashboard for user management with CRUD operations and access control."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubUrl: "#",
    category: "additional",
    iconName: "ShieldAlert"
  },
  {
    id: "olx-clone",
    title: "OLX Clone",
    subtitle: "Peer-to-Peer Marketplace",
    description: "Online marketplace platform for buying and selling products with user authentication, category-based filtering, and dynamic product listing.",
    bullets: [
      "Implemented product listing, search functionality, and category-based filtering system.",
      "Built responsive UI with image upload functionality and user profile management."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap"],
    githubUrl: "#",
    category: "additional",
    iconName: "Store"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-knowbin",
    role: "Full Stack Developer",
    company: "Knowbin Technologies Private Limited",
    location: "Remote",
    period: "November 2025 – June 2026",
    description: "Developed modern web applications using SvelteKit and Elysia.js + Bun. Engineered advanced deep zoom imaging systems for medical microscopy.",
    bullets: [
      "Developed modern web applications using SvelteKit for frontend and Elysia.js + Bun for high-performance JavaScript backend.",
      "Implemented advanced Deep Zoom Image functionality using OpenSeadragon for high-resolution pathogen imaging and detailed analysis.",
      "Built scalable RESTful APIs, optimized application performance, and handled complex data visualization.",
      "Worked on full-stack features including responsive UI, image processing, and efficient backend architecture.",
      "Maintained high code quality and delivered features effectively in a remote environment."
    ],
    technologies: ["SvelteKit", "Elysia.js", "Bun", "OpenSeadragon", "RESTful APIs", "Data Visualization", "Responsive UI"],
    type: "professional"
  },
  {
    id: "exp-training",
    role: "Self-Directed Full Stack Development Program",
    company: "Intensive Hands-on Development Training",
    location: "Remote",
    period: "March 2025 – October 2025",
    description: "Rigorous full-time engineering simulation equivalent to 2+ years of professional development, building and architecting complex applications from scratch.",
    bullets: [
      "Completed intensive, hands-on development program focusing on real-world application development.",
      "Developed multiple production-ready applications from concept to deployment.",
      "Implemented complex features including AI integration, real-time communication, and payment processing.",
      "Applied enterprise-level architectural patterns including Repository and MVC architectures.",
      "Utilized SOLID principles and clean code practices throughout development process."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "SOLID", "MVC", "Repository Pattern", "AI integration"],
    type: "training"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript (ES6+)", level: "expert" },
      { name: "HTML5", level: "expert" },
      { name: "CSS3", level: "expert" }
    ]
  },
  {
    title: "Frontend Frameworks & Libs",
    skills: [
      { name: "SvelteKit", level: "expert" },
      { name: "React.js", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Redux", level: "advanced" },
      { name: "Context API", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "ShadCN", level: "advanced" },
      { name: "Bootstrap", level: "advanced" },
      { name: "EJS", level: "intermediate" }
    ]
  },
  {
    title: "Backend & Real-time",
    skills: [
      { name: "Elysia.js", level: "expert" },
      { name: "Bun", level: "expert" },
      { name: "Node.js", level: "expert" },
      { name: "Express.js", level: "expert" },
      { name: "REST APIs", level: "expert" },
      { name: "Socket.io", level: "expert" },
      { name: "WebRTC", level: "advanced" },
      { name: "JWT", level: "expert" }
    ]
  },
  {
    title: "Databases & Integrations",
    skills: [
      { name: "MongoDB", level: "expert" },
      { name: "SQL", level: "advanced" },
      { name: "Stripe", level: "advanced" },
      { name: "Razorpay", level: "advanced" },
      { name: "AI Integration", level: "expert" },
      { name: "OpenSeadragon", level: "expert" }
    ]
  },
  {
    title: "Development Tools & Architecture",
    skills: [
      { name: "Docker", level: "intermediate" },
      { name: "Git & GitHub", level: "expert" },
      { name: "Postman", level: "expert" },
      { name: "VS Code", level: "expert" },
      { name: "Repository Architecture", level: "expert" },
      { name: "MVC Architecture", level: "expert" },
      { name: "SOLID Principles", level: "expert" },
      { name: "Clean Code", level: "expert" }
    ]
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Indira Gandhi National Open University (IGNOU)",
    status: "In Progress",
    type: "Distance Education"
  },
  {
    degree: "Higher Secondary Education",
    institution: "Academic Excellence in Analytical and Problem-Solving",
    status: "Completed",
    grade: "93% Grade"
  }
];

export const CORE_COMPETENCIES = [
  {
    category: "Technical Excellence",
    items: ["Full Stack Development", "SvelteKit", "Elysia.js + Bun", "OpenSeadragon Deep Zoom", "API Design & Integration", "Payment Gateway Integration"]
  },
  {
    category: "Soft Skills",
    items: ["Quick Learning & Adaptability", "Excellent Communication", "Problem-Solving", "Team Collaboration", "Self-Motivation"]
  },
  {
    category: "Development Practices",
    items: ["Clean Code Principles", "Architectural Patterns", "Version Control", "Responsive Design", "Performance Optimization"]
  }
];
