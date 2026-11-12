export interface ProjectCardData {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  description: string;
  techStack: string[];
}

export interface ServiceItemData {
  number: string;
  title: string;
  description: string;
}

export interface EngineeringProjectData {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period?: string;
  highlights: string[];
  tech: string[];
  badge: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  projects: {
    name: string;
    focus: string;
    duration: string;
    bullets: string[];
  }[];
}

export interface EducationData {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
}

export const MARQUEE_IMAGES_ROW_1 = [
  '/assets/aistudio/projects/gifs/invent.gif',
  '/assets/aistudio/projects/gifs/pizzahub.gif',
  '/assets/aistudio/projects/gifs/commscope.gif',
  '/assets/aistudio/projects/gifs/Streaming_website_interface_for_…_b89ca21a.gif',
  '/assets/aistudio/projects/gifs/video.gif',
  
  
];

export const MARQUEE_IMAGES_ROW_2 = [
  '/assets/aistudio/projects/gifs/Marketing_posters_displaying_pro…_e592601c.gif',
  '/assets/aistudio/projects/Gemini_Generated_Image_c6d7osc6d7osc6d7.png',
    '/assets/aistudio/projects/gifs/laptop.gif',
    '/assets/aistudio/projects/gifs/Display_website_fullscreen_418046ed.gif',
    '/assets/aistudio/projects/gifs/editing.gif',
];

export const STACKED_PROJECTS: ProjectCardData[] = [
  {
    id: 'wind-speed-ai',
    number: '01',
    title: 'Wind Speed & Inventory System',
    category: 'Client',
    tagline: 'Smart Inventory Management, QR-Based Tracking & 10-Day Wind Forecasting',
    description:
      'Developed an inventory management solution for Anemos Energies to track available stock, manage product quantities, and generate e-way bill receipts. Integrated QR code scanning to instantly identify packaged items and retrieve their associated products and quantities. Additionally, incorporated a 10-day wind speed prediction module to support windmill installation planning and site assessment.',
    techStack: ['Flutter',
      'Node.js',
      'Express.js',
      'QR Code Scanning',
      'Weather APIs',
      'MySQL'],
    col1Image1:
      'assets/aistudio/projects/Screenshot 2026-11-11 185342.png',
    col1Image2:
      'assets/aistudio/projects/Screenshot 2026-11-11 185357.png',
    col2Image:
      'assets/aistudio/projects/Gemini_Generated_Image_ctms65ctms65ctms.png',
  },
  {
    id: 'commscope-visitor-management',
    number: '02',
    title: 'Visitor Management System',
    category: 'Client',
    tagline: 'Digital Visitor Registration, Pass Generation & Entry Management for CommScope',
    description:
      'Developed a digital visitor management platform for CommScope to streamline visitor registration and entry authorization. The system generates visitor passes for individuals entering the facility, capturing essential details such as visitor information, meeting host, and purpose of visit. Designed to simplify visitor tracking, improve entry management, and provide a structured record of facility visits.',
    techStack: [ 'ASP.NET',
      'C#',
      'SQL Server',
      'HTML',
      'CSS',
      'JavaScript',],
    col1Image1:
      'assets/aistudio/projects/Screenshot 2026-11-11 201756.png',
    col1Image2:
      'assets/aistudio/projects/Gemini_Generated_Image_79aa5v79aa5v79aa.png', 
    col2Image:
      'assets/aistudio/projects/Gemini_Generated_Image_t2z8h8t2z8h8t2z8.png',
  },
  {
    id: 'cineflix-streaming',
    number: '03',
    title: 'CineFlix - Movie Streaming Platform',
    category: 'Personal',
    tagline: 'On-Demand Movie Discovery, Digital Rentals & Online Payment Integration',
    description:
      'Built a React-based movie streaming and rental platform using external movie APIs to dynamically fetch and display movie information. Implemented movie discovery, detailed movie pages, shopping cart functionality, and a rental workflow that allows users to select movies, proceed to checkout, and pay for rentals. Designed to deliver an intuitive digital entertainment experience.',
    techStack: [ 'React.js',
      'JavaScript',
      'REST APIs',
      'CSS',
      'RazorPay',],
    col1Image1:
      'assets/aistudio/projects/Gemini_Generated_Image_t5xj36t5xj36t5xj.png',
    col1Image2:
      'assets/aistudio/projects/Gemini_Generated_Image_pp5q80pp5q80pp5q.png', 
    col2Image:
      'assets/aistudio/projects/Gemini_Generated_Image_fmhov0fmhov0fmho.png',
  },
  {
    id: 'pizzahub-ordering',
    number: '04',
    title: 'PizzaHub - Online Pizza Ordering',
    category: 'Academic',
    tagline: 'Pizza Discovery, Smart Cart Management & Dine-In / Takeaway Ordering',
    description:
          'Developed a pizza ordering and e-commerce web application as a college project, allowing customers to explore a variety of pizzas, browse menus, view product details, and add items to their shopping cart. Implemented a complete ordering workflow with quantity management, order summaries, and checkout functionality. Customers can choose between takeaway and dine-in options during checkout, providing a convenient and flexible food ordering experience.',
    techStack: [ 'HTML',
      'JavaScript',
      'JQuery',
      'CSS',
      'RazorPay',],
    col1Image1:
      'assets/aistudio/projects/Gemini_Generated_Image_qo1i13qo1i13qo1i.png',
    col1Image2:
      'assets/aistudio/projects/Gemini_Generated_Image_n0mt9n0mt9n0mt9n.png', 
    col2Image:
      'assets/aistudio/projects/Gemini_Generated_Image_421v0x421v0x421v.png',
  },
];


export const SERVICES_LIST: ServiceItemData[] = [
  {
    number: '01',
    title: 'FULL-STACK WEB DEVELOPMENT',
    description:
      'Building responsive, scalable web applications with modern frontend and backend technologies, delivering seamless user experiences and robust functionality.\nASP.NET Core · C# · Blazor · React · JavaScript',
  },
  {
    number: '02',
    title: 'BACKEND, API & DATABASE SOLUTIONS',
    description:
      'Developing secure REST APIs, scalable backend services, efficient database architectures, and third-party integrations to power reliable applications.\nASP.NET Core · C# · Node.js · SQL Server · MySQL · REST APIs',
  },
  {
    number: '03',
    title: 'UI DEVELOPMENT & SYSTEM INTEGRATION',
    description:
      'Creating modern, interactive interfaces while connecting external services and automating workflows for seamless digital experiences.\nHTML · CSS · JavaScript · React · Blazor · RabbitMQ · Hangfire',
  },
  {
    number: '04',
    title: 'VIDEO EDITING & MOTION DESIGN',
    description:
      'Producing engaging videos, cinematic edits, promotional content, and creative motion graphics that bring ideas and stories to life.\nAdobe Premiere Pro · Adobe After Effects · Video Production',
  },
  {
    number: '05',
    title: 'SOCIAL MEDIA MANAGEMENT & DIGITAL MARKETING',
    description:
      'Building and managing social media presence through creative content, content planning, audience engagement, and digital marketing strategies that grow brand visibility.\nSocial Media Management · Content Strategy · Digital Marketing',
  },
];


export const ENGINEERING_PROJECTS: EngineeringProjectData[] = [
  {
    id: 'wind-speed-ai',
    title: 'Wind Speed Prediction App for Anemos Energies',
    subtitle: 'Final Year Engineering Project',
    role: 'Lead ML & Full-Stack Developer',
    period: '2023',
    badge: 'AI / ML Forecast',
    tech: ['Python', 'Node.js', 'Flutter', 'Windy.com API', 'Machine Learning'],
    highlights: [
      'Collaborated in a team of three to develop an AI/ML-powered wind speed forecasting application for Anemos Energies using Flutter and Node.js, integrating live weather data from Windy.com.',
      'Developed a next-day (24-hour) wind speed prediction model using five days of historical weather trends, achieving forecast accuracy within 10–15% of actual wind speed measurements.',
      'Constructed automated data ingestion pipelines and responsive mobile interfaces for real-time wind turbine energy planning.',
    ],
  },
  {
    id: 'movie-streaming',
    title: 'Movie Streaming Platform',
    subtitle: 'Production-Grade Single Page Application',
    role: 'Frontend Architect',
    period: '2023',
    badge: 'React.js Web App',
    tech: ['React.js', 'REST APIs', 'CSS3', 'Tailwind', 'Responsive Design'],
    highlights: [
      'Developed a responsive movie streaming platform page using React.js, showcasing the latest movies and TV shows.',
      'Implemented dynamic movie listings with poster images, titles, descriptions, and categories.',
      'Designed an interactive, user-friendly interface with reusable React components and client-side caching.',
      'Integrated API-based data fetching to display movie details and keep content updated.',
    ],
  },
  {
    id: 'pizza-ecommerce',
    title: 'Pizza Ordering & Takeaway Website',
    subtitle: 'Interactive E-Commerce Platform',
    role: 'Web Developer',
    period: 'College Project',
    badge: 'E-Commerce Web',
    tech: ['JavaScript', 'jQuery', 'HTML5', 'CSS3', 'UI/UX'],
    highlights: [
      'Developed an e-commerce website for pizza dining and takeaway using HTML, CSS, and jQuery.',
      'Built interactive web interfaces to present menu items and support a user-friendly browsing and ordering experience.',
      'Implemented cart management, custom topping selections, and smooth checkout workflows.',
    ],
  },
];

export const PROFESSIONAL_EXPERIENCES: ExperienceData[] = [
  {
    role: 'Software Engineer',
    company: 'HotelHub Technologies Pvt Ltd',
    location: 'Panjim, India',
    period: 'Sep 2023 – Present',
    type: 'Full-Time',
    projects: [
      {
        name: 'HBS (Hotel Booking System)',
        focus: 'Full-Stack Development',
        duration: '1 yr 11 mos',
        bullets: [
          'Built client-facing booking features in ASP.NET Core, Blazor, C#, and SQL Server for the Hotel Booking System, contributing to a production hospitality platform.',
          'Implemented booking workflow enhancements that improved the reservations process and supported a smoother user experience across the hotel booking platform.',
          'Worked on application features spanning frontend interfaces, backend business logic, and database integration.',
        ],
      },
      {
        name: 'Admin',
        focus: 'Backend & Administrative Systems',
        duration: '9 mos',
        bullets: [
          'Maintained and enhanced core application functionalities supporting hotel booking operations and internal administration.',
          'Managed database operations and backend services for hotel data handling across administrative workflows.',
          'Enhanced existing modules to support effective data management, system maintenance, and administrative operations.',
        ],
      },
      {
        name: 'Hotel Data Management',
        focus: 'Data Automation',
        duration: '5 mos',
        bullets: [
          'Worked with hotel inventory and property data to manage hotel listings across the booking platform.',
          'Automated hotel onboarding and removal workflows from client-provided data to reduce manual processing in listing updates.',
          'Improved the consistency and efficiency of hotel listing updates by streamlining data processing workflows.',
          'Coordinated data-related operations with application requirements to maintain accurate and up-to-date hotel information.',
        ],
      },
    ],
  },
  {
    role: 'Associate Software Developer (Intern)',
    company: 'Commscope India Pvt Ltd',
    location: 'Verna, India',
    period: 'Aug 2022 – Oct 2022',
    type: 'Internship',
    projects: [
      {
        name: 'Visitor Pass Generation System',
        focus: 'Enterprise Web & Security Digitization',
        duration: '3 mos',
        bullets: [
          'Built a Visitor Pass Generation system in ASP.NET and C# that reduced average visitor check-in time by 30–50% by digitizing registration, security checks, and meeting approvals.',
          'Implemented multi-tier authorization workflows and printable digital badge generation for facility safety.',
        ],
      },
    ],
  },
];

export const EDUCATION_ITEMS: EducationData[] = [
  {
    degree: 'Master of Business Administration (MBA), Information Technology',
    institution: 'Amity University Online',
    location: 'Noida, India',
    period: 'Expected 2027',
    cgpa: '8.14',
  },
  {
    degree: 'Bachelor of Engineering (B.E.), Information Technology',
    institution: 'Goa College of Engineering',
    location: 'Ponda, India',
    period: '2023',
    cgpa: '8.34',
  },
];

export const CERTIFICATIONS = [
  { name: 'Blazor Bootcamp: Building a Commerce Web App', issuer: 'Udemy' },
  { name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft' },
  { name: 'React JS', issuer: 'Scaler Topics' },
  { name: 'Power BI Fundamentals', issuer: 'Microsoft / Enterprise' },
  { name: 'Google AI Fundamentals: Art of Prompting', issuer: 'Google' },
  { name: 'Building Services with ASP.NET Web API', issuer: 'Microsoft Learn / Coursera' },
];

export const ATHLETICS = {
  title: 'National Level Archer',
  subtitle: 'Competitive Archery & Athletic Discipline',
  achievements: [
    'Competed in National Games representing Goa State Archery Team',
    'Won 3 Gold Medals at State-level Championships',
    'Demonstrated extreme focus, patience, precision, and peak mental performance under competitive pressure',
  ],
};
