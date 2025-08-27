import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../Components/Ui/Header';
import StoryNavigation from './StoryNavigation' 
import StoryIntro from '../../Pages/InteractiveStory/StoryIntro'
import StoryPanel from '../../Pages/InteractiveStory/StoryPanel'
import Button from '../../Components/Ui/Button'
import { useNavigate } from 'react-router-dom';

const InteractiveStoryMode = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock story data
  const storyPanels = [
    {
      id: 1,
      year: "2020",
      title: "The Beginning",
      subtitle: "First Steps into Development",
      description: `My journey began with curiosity and a simple "Hello World" program. What started as a fascination with how websites work quickly evolved into a passion for creating digital experiences. The first lines of code I wrote were clunky, but they sparked something that would define my career path.`,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      imageAlt: "Person coding on laptop with multiple monitors",
      imageCaption: "Late nights learning the fundamentals",
      codeSnippet: `console.log("Hello, World!");\n\n// My first program\n// Little did I know this would lead to\n// building complex applications`,
      technologies: [
        {
          name: "HTML",
          category: "Markup",
          description: "The foundation of web development. Started with basic tags and semantic structure.",
          proficiency: 95,
          experienceLevel: "Expert",
          keyFeatures: ["Semantic HTML5", "Accessibility", "SEO Optimization", "Form Validation"],
          projectsUsedIn: [
            { name: "Personal Portfolio", role: "Structure & Content" },
            { name: "E-commerce Site", role: "Product Pages" }
          ],
          learningResources: [
            { title: "MDN Web Docs", type: "Documentation" },
            { title: "HTML5 Specification", type: "Official Spec" }
          ],
          codeExample: `<article class="story-panel">\n  <header>\n    <h1>Interactive Story</h1>\n    <time datetime="2020-01-01">2020</time>\n  </header>\n  <section>\n    <p>Content goes here...</p>\n  </section>\n</article>`,
          firstUsed: "January 2020",
          documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML"
        },
        {
          name: "CSS",
          category: "Styling",
          description: "Learned to bring designs to life with responsive layouts and animations.",
          proficiency: 90,
          experienceLevel: "Expert",
          keyFeatures: ["Flexbox", "Grid", "Animations", "Responsive Design"],
          projectsUsedIn: [
            { name: "Portfolio Website", role: "Complete Styling" },
            { name: "Dashboard UI", role: "Component Styling" }
          ],
          learningResources: [
            { title: "CSS Grid Garden", type: "Interactive Tutorial" },
            { title: "Flexbox Froggy", type: "Game-based Learning" }
          ],
          codeExample: `.story-panel {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  padding: 2rem;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #1a1f2e, #111929);\n}`,
          firstUsed: "February 2020",
          documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS"
        }
      ],
      keyProjects: [
        {
          name: "Personal Website",
          description: "My first complete web project",
          category: "Personal Project",
          status: "completed",
          year: "2020",
          features: ["Responsive Design", "Contact Form", "Portfolio Gallery", "Blog Section"],
          techStack: ["HTML", "CSS", "JavaScript", "PHP"],
          timeline: "3 months",
          architecture: "Simple static website with PHP contact form processing",
          codeSnippet: `// Simple contact form validation\nfunction validateForm() {\n  const name = document.getElementById('name').value;\n  const email = document.getElementById('email').value;\n  \n  if (!name || !email) {\n    alert('Please fill in all fields');\n    return false;\n  }\n  \n  return true;\n}`,
          challenges: [
            {
              problem: "Cross-browser Compatibility",
              description: "Website looked different across browsers",
              solution: "Learned about CSS resets and vendor prefixes"
            }
          ],
          metrics: [
            { value: "100%", label: "Mobile Responsive" },
            { value: "3s", label: "Load Time" }
          ],
          impact: "Successfully launched my first website and gained confidence in web development fundamentals.",
          learnings: [
            "Importance of semantic HTML",
            "CSS specificity and cascade",
            "Basic JavaScript DOM manipulation"
          ]
        }
      ],
      achievements: [
        "First Website Deployed",
        "HTML/CSS Fundamentals",
        "Basic JavaScript Skills",
        "Git Version Control"
      ],
      metrics: [
        { value: "100+", label: "Hours Coded" },
        { value: "5", label: "Projects Built" }
      ],
      expandedDetails: `This was the foundation phase where I spent countless hours watching tutorials, reading documentation, and building small projects. Every bug was a learning opportunity, and every successful feature was a victory that motivated me to keep going.`,
      ctaButton: {
        text: "View Early Projects",
        icon: "ExternalLink",
        action: () => navigate('/projects-lab-showcase')
      }
    },
    {
      id: 2,
      year: "2021",
      title: "JavaScript Mastery",
      subtitle: "Diving Deep into Programming Logic",
      description: `The transition from static websites to dynamic applications marked a crucial turning point. JavaScript opened up a world of possibilities - from DOM manipulation to API integrations. This year was about understanding programming fundamentals and building interactive experiences.`,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      imageAlt: "JavaScript code on multiple screens",
      imageCaption: "Mastering the language of the web",
      codeSnippet: `// Advanced JavaScript concepts\nconst fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error('Error fetching user:', error);\n    throw error;\n  }\n};`,
      technologies: [
        {
          name: "JavaScript",
          category: "Programming Language",
          description: "Mastered ES6+ features, async programming, and modern JavaScript patterns.",
          proficiency: 92,
          experienceLevel: "Expert",
          keyFeatures: ["ES6+ Syntax", "Async/Await", "Promises", "Modules", "Destructuring"],
          projectsUsedIn: [
            { name: "Task Manager App", role: "Complete Logic" },
            { name: "Weather Dashboard", role: "API Integration" }
          ],
          learningResources: [
            { title: "JavaScript: The Good Parts", type: "Book" },
            { title: "You Don't Know JS", type: "Book Series" }
          ],
          codeExample: `// Modern JavaScript patterns\nconst createUser = ({ name, email, ...rest }) => ({\n  id: Date.now(),\n  name,\n  email,\n  createdAt: new Date().toISOString(),\n  ...rest\n});\n\nconst users = [\n  createUser({ name: 'John', email: 'john@example.com' }),\n  createUser({ name: 'Jane', email: 'jane@example.com' })\n];`,
          firstUsed: "March 2021",
          documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        },
        {
          name: "Node.js",
          category: "Runtime Environment",
          description: "Started building server-side applications and understanding full-stack development.",
          proficiency: 85,
          experienceLevel: "Advanced",
          keyFeatures: ["Express.js", "NPM Packages", "File System", "HTTP Servers"],
          projectsUsedIn: [
            { name: "REST API", role: "Backend Development" },
            { name: "Real-time Chat", role: "WebSocket Server" }
          ],
          learningResources: [
            { title: "Node.js Documentation", type: "Official Docs" },
            { title: "Express.js Guide", type: "Framework Docs" }
          ],
          codeExample: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'OK', timestamp: new Date() });\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
          firstUsed: "June 2021",
          documentationUrl: "https://nodejs.org/en/docs/"
        }
      ],
      keyProjects: [
        {
          name: "Task Management App",
          description: "Full-featured todo application with user authentication",
          category: "Web Application",
          status: "completed",
          year: "2021",
          features: ["User Authentication", "CRUD Operations", "Real-time Updates", "Responsive Design"],
          techStack: ["JavaScript", "Node.js", "Express", "MongoDB", "Socket.io"],
          timeline: "4 months",
          architecture: "RESTful API with real-time WebSocket connections for live updates",
          codeSnippet: `// Real-time task updates\nio.on('connection', (socket) => {\n  socket.on('join-room', (userId) => {\n    socket.join(\`user-\${userId}\`);\n  });\n  \n  socket.on('task-updated', (task) => {\n    socket.to(\`user-\${task.userId}\`).emit('task-changed', task);\n  });\n});`,
          challenges: [
            {
              problem: "Real-time Synchronization",
              description: "Multiple users editing tasks simultaneously",
              solution: "Implemented WebSocket-based real-time updates with conflict resolution"
            },
            {
              problem: "State Management",
              description: "Complex application state becoming hard to manage",
              solution: "Adopted Redux pattern for predictable state updates"
            }
          ],
          metrics: [
            { value: "500+", label: "Daily Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "< 2s", label: "Response Time" }
          ],
          impact: "Successfully deployed a production application used by over 500 daily users, gaining experience in scalability and user experience design.",
          learnings: [
            "Importance of proper error handling",
            "Database design and optimization",
            "User experience and interface design",
            "Deployment and DevOps basics"
          ],
          demoUrl: "https://taskmanager-demo.example.com"
        }
      ],
      achievements: [
        "First Full-Stack Application",
        "API Development Skills",
        "Database Integration",
        "Real-time Features"
      ],
      metrics: [
        { value: "500+", label: "Lines of Code" },
        { value: "10", label: "APIs Built" }
      ],
      expandedDetails: `This year was transformative as I moved beyond static websites to building dynamic, interactive applications. The learning curve was steep, but each challenge taught me valuable lessons about software architecture, user experience, and the importance of writing maintainable code.`,
      ctaButton: {
        text: "Explore JavaScript Projects",
        icon: "Code2",
        action: () => navigate('/projects-lab-showcase')
      }
    },
    {
      id: 3,
      year: "2022",
      title: "React Revolution",
      subtitle: "Component-Based Architecture",
      description: `Discovering React was like finding the missing piece of the puzzle. The component-based architecture, virtual DOM, and ecosystem of tools opened up new possibilities for building scalable user interfaces. This year was about mastering modern frontend development.`,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      imageAlt: "React component structure visualization",
      imageCaption: "Building with components and hooks",
      codeSnippet: `// Modern React with hooks\nconst StoryPanel = ({ panel, onTechClick }) => {\n  const [isVisible, setIsVisible] = useState(false);\n  const [selectedTech, setSelectedTech] = useState(null);\n  \n  useEffect(() => {\n    const observer = new IntersectionObserver(\n      ([entry]) => setIsVisible(entry.isIntersecting),\n      { threshold: 0.3 }\n    );\n    \n    return () => observer.disconnect();\n  }, []);\n  \n  return (\n    <motion.div\n      initial={{ opacity: 0, y: 50 }}\n      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}\n    >\n      {/* Component content */}\n    </motion.div>\n  );\n};`,
      technologies: [
        {
          name: "React",
          category: "Frontend Framework",
          description: "Mastered component-based architecture, hooks, and modern React patterns for building scalable UIs.",
          proficiency: 95,
          experienceLevel: "Expert",
          keyFeatures: ["Functional Components", "Hooks", "Context API", "Performance Optimization"],
          projectsUsedIn: [
            { name: "E-commerce Platform", role: "Complete Frontend" },
            { name: "Dashboard Application", role: "UI Components" }
          ],
          learningResources: [
            { title: "React Documentation", type: "Official Docs" },
            { title: "React Patterns", type: "Best Practices" }
          ],
          codeExample: `import React, { useState, useEffect } from 'react'
;\n\nconst UserProfile = ({ userId }) => {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    fetchUser(userId)\n      .then(setUser)\n      .finally(() => setLoading(false));\n  }, [userId]);\n  \n  if (loading) return <Spinner />;\n  \n  return (\n    <div className="user-profile">\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n};`,
          firstUsed: "January 2022",
          documentationUrl: "https://reactjs.org/docs/"
        },
        {
          name: "Redux",
          category: "State Management",
          description: "Implemented predictable state management for complex applications with multiple data flows.",
          proficiency: 88,
          experienceLevel: "Advanced",
          keyFeatures: ["Actions & Reducers", "Middleware", "DevTools", "Async Actions"],
          projectsUsedIn: [
            { name: "Shopping Cart", role: "State Management" },
            { name: "User Dashboard", role: "Global State" }
          ],
          learningResources: [
            { title: "Redux Toolkit", type: "Official Library" },
            { title: "Redux Patterns", type: "Best Practices" }
          ],
          codeExample: `import { createSlice } from '@reduxjs/toolkit'
;\n\nconst userSlice = createSlice({\n  name: 'user',\n  initialState: {\n    profile: null,\n    loading: false,\n    error: null\n  },\n  reducers: {\n    setLoading: (state, action) => {\n      state.loading = action.payload;\n    },\n    setUser: (state, action) => {\n      state.profile = action.payload;\n      state.loading = false;\n    }\n  }\n});`,
          firstUsed: "March 2022",
          documentationUrl: "https://redux.js.org/"
        }
      ],
      keyProjects: [
        {
          name: "E-commerce Platform",
          description: "Full-featured online shopping platform with modern UI/UX",
          category: "Web Application",
          status: "completed",
          year: "2022",
          features: ["Product Catalog", "Shopping Cart", "User Authentication", "Payment Integration", "Admin Dashboard"],
          techStack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe"],
          timeline: "6 months",
          architecture: "Microservices architecture with separate services for products, users, orders, and payments",
          codeSnippet: `// Shopping cart logic with Redux\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [], total: 0 },\n  reducers: {\n    addItem: (state, action) => {\n      const existingItem = state.items.find(item => item.id === action.payload.id);\n      if (existingItem) {\n        existingItem.quantity += 1;\n      } else {\n        state.items.push({ ...action.payload, quantity: 1 });\n      }\n      state.total = calculateTotal(state.items);\n    }\n  }\n});`,
          challenges: [
            {
              problem: "Performance Optimization",
              description: "Large product catalogs causing slow rendering",
              solution: "Implemented virtualization and lazy loading for product lists"
            },
            {
              problem: "State Complexity",
              description: "Managing cart, user, and product states across components",
              solution: "Structured Redux store with normalized data and efficient selectors"
            }
          ],
          metrics: [
            { value: "1000+", label: "Products" },
            { value: "95%", label: "Performance Score" },
            { value: "< 3s", label: "Load Time" }
          ],
          impact: "Built a production-ready e-commerce platform that handles thousands of products and provides excellent user experience across all devices.",
          learnings: [
            "Component composition and reusability",
            "Performance optimization techniques",
            "Complex state management patterns",
            "Testing strategies for React applications"
          ],
          demoUrl: "https://ecommerce-demo.example.com"
        }
      ],
      achievements: [
        "React Expert Level",
        "State Management Mastery",
        "Component Architecture",
        "Performance Optimization"
      ],
      metrics: [
        { value: "50+", label: "Components Built" },
        { value: "95%", label: "Test Coverage" }
      ],
      expandedDetails: `React transformed how I think about user interfaces. The component-based approach made code more maintainable and reusable. Learning hooks changed everything - useState, useEffect, and custom hooks became powerful tools for building complex interactions with clean, readable code.`,
      ctaButton: {
        text: "View React Projects",
        icon: "Layers",
        action: () => navigate('/projects-lab-showcase')
      }
    },
    {
      id: 4,
      year: "2023",
      title: "Full-Stack Mastery",
      subtitle: "End-to-End Development",
      description: `This year marked the achievement of true full-stack capabilities. From database design to deployment strategies, I gained comprehensive understanding of the entire development lifecycle. Building production-ready applications became second nature.`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      imageAlt: "Full-stack development workflow diagram",
      imageCaption: "Mastering the complete development stack",
      codeSnippet: `// Full-stack architecture\nclass ApplicationServer {\n  constructor() {\n    this.app = express();\n    this.database = new DatabaseConnection();\n    this.auth = new AuthenticationService();\n    this.setupMiddleware();\n    this.setupRoutes();\n  }\n  \n  setupMiddleware() {\n    this.app.use(cors());\n    this.app.use(helmet());\n    this.app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));\n    this.app.use('/api', this.auth.authenticate);\n  }\n  \n  async start() {\n    await this.database.connect();\n    this.app.listen(process.env.PORT, () => {\n      console.log(\`Server running on port \${process.env.PORT}\`);\n    });\n  }\n}`,
      technologies: [
        {
          name: "TypeScript",
          category: "Programming Language",
          description: "Adopted TypeScript for better code quality, developer experience, and maintainability in large applications.",
          proficiency: 90,
          experienceLevel: "Advanced",
          keyFeatures: ["Static Typing", "Interfaces", "Generics", "Advanced Types"],
          projectsUsedIn: [
            { name: "Enterprise Dashboard", role: "Complete Type Safety" },
            { name: "API Gateway", role: "Backend Services" }
          ],
          learningResources: [
            { title: "TypeScript Handbook", type: "Official Documentation" },
            { title: "Advanced TypeScript", type: "Deep Dive Course" }
          ],
          codeExample: `interface User {\n  id: string;\n  name: string;\n  email: string;\n  preferences: UserPreferences;\n}\n\ninterface UserPreferences {\n  theme: 'light' | 'dark';\n  notifications: boolean;\n  language: string;\n}\n\nclass UserService {\n  async getUser(id: string): Promise<User | null> {\n    try {\n      const user = await this.database.findById(id);\n      return user;\n    } catch (error) {\n      console.error('Error fetching user:', error);\n      return null;\n    }\n  }\n}`,
          firstUsed: "February 2023",
          documentationUrl: "https://www.typescriptlang.org/docs/"
        },
        {
          name: "PostgreSQL",
          category: "Database",
          description: "Mastered relational database design, complex queries, and performance optimization for production applications.",
          proficiency: 85,
          experienceLevel: "Advanced",
          keyFeatures: ["Complex Queries", "Indexing", "Transactions", "Performance Tuning"],
          projectsUsedIn: [
            { name: "Analytics Platform", role: "Data Storage & Analysis" },
            { name: "User Management System", role: "Primary Database" }
          ],
          learningResources: [
            { title: "PostgreSQL Documentation", type: "Official Docs" },
            { title: "SQL Performance Explained", type: "Book" }
          ],
          codeExample: `-- Complex query with joins and aggregations\nSELECT \n  u.name,\n  u.email,\n  COUNT(o.id) as order_count,\n  SUM(o.total) as total_spent,\n  AVG(o.total) as avg_order_value\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.created_at >= '2023-01-01'\nGROUP BY u.id, u.name, u.email\nHAVING COUNT(o.id) > 0\nORDER BY total_spent DESC\nLIMIT 100;`,
          firstUsed: "April 2023",
          documentationUrl: "https://www.postgresql.org/docs/"
        }
      ],
      keyProjects: [
        {
          name: "Analytics Dashboard",
          description: "Real-time analytics platform for business intelligence",
          category: "Enterprise Application",
          status: "completed",
          year: "2023",
          features: ["Real-time Data", "Interactive Charts", "Custom Reports", "User Management", "API Integration"],
          techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
          timeline: "8 months",
          architecture: "Microservices with event-driven architecture, using Redis for caching and real-time updates",
          codeSnippet: `// Real-time data processing\nclass AnalyticsProcessor {\n  constructor(redisClient, database) {\n    this.redis = redisClient;\n    this.db = database;\n    this.eventEmitter = new EventEmitter();\n  }\n  \n  async processEvent(event: AnalyticsEvent) {\n    // Store raw event\n    await this.db.events.create(event);\n    \n    // Update real-time metrics\n    await this.updateMetrics(event);\n    \n    // Emit to connected clients\n    this.eventEmitter.emit('metrics-updated', {\n      type: event.type,\n      metrics: await this.getMetrics(event.userId)\n    });\n  }\n}`,
          challenges: [
            {
              problem: "Real-time Performance",
              description: "Processing thousands of events per second while maintaining UI responsiveness",
              solution: "Implemented event streaming with Redis and optimized database queries with proper indexing"
            },
            {
              problem: "Data Visualization",
              description: "Rendering complex charts with large datasets",
              solution: "Used data virtualization and implemented progressive loading for chart components"
            }
          ],
          metrics: [
            { value: "10K+", label: "Events/Second" },
            { value: "99.9%", label: "Uptime" },
            { value: "< 100ms", label: "Query Time" }
          ],
          impact: "Delivered a high-performance analytics platform that processes millions of events daily and provides real-time insights to business stakeholders.",
          learnings: [
            "Event-driven architecture patterns",
            "Database optimization and indexing",
            "Real-time data processing",
            "Scalable system design"
          ],
          demoUrl: "https://analytics-demo.example.com"
        }
      ],
      achievements: [
        "Full-Stack Architecture",
        "Database Optimization",
        "Real-time Systems",
        "Production Deployment"
      ],
      metrics: [
        { value: "99.9%", label: "System Uptime" },
        { value: "10M+", label: "API Requests" }
      ],
      expandedDetails: `This year was about connecting all the pieces - frontend, backend, database, and deployment. I learned to think in terms of system architecture, considering scalability, security, and maintainability from the ground up. Every project became an opportunity to apply full-stack thinking.`,
      ctaButton: {
        text: "Explore Full-Stack Projects",
        icon: "Database",
        action: () => navigate('/projects-lab-showcase')
      }
    },
    {
      id: 5,
      year: "2024",
      title: "Innovation & Leadership",
      subtitle: "Pushing Boundaries",
      description: `The current chapter focuses on innovation, mentorship, and pushing the boundaries of what's possible with web technologies. From AI integration to Web3 experiments, this year is about exploring emerging technologies while sharing knowledge with the developer community.`,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      imageAlt: "Futuristic technology and innovation concept",
      imageCaption: "Exploring the future of web development",
      codeSnippet: `// AI-powered development tools\nclass AIAssistant {\n  constructor(apiKey) {\n    this.openai = new OpenAI({ apiKey });\n    this.context = new ConversationContext();\n  }\n  \n  async generateCode(prompt, context = {}) {\n    const completion = await this.openai.chat.completions.create({\n      model: "gpt-4",\n      messages: [\n        {\n          role: "system",\n          content: "You are an expert React developer assistant."\n        },\n        {\n          role: "user",\n          content: \`Generate React component: \${prompt}\`\n        }\n      ],\n      temperature: 0.7,\n      max_tokens: 1000\n    });\n    \n    return this.parseCodeResponse(completion.choices[0].message.content);\n  }\n  \n  async reviewCode(code) {\n    // AI-powered code review implementation\n    return await this.analyzeCodeQuality(code);\n  }\n}`,
      technologies: [
        {
          name: "Next.js",
          category: "React Framework",
          description: "Advanced Next.js features including SSR, SSG, API routes, and performance optimization for production applications.",
          proficiency: 92,
          experienceLevel: "Expert",
          keyFeatures: ["Server-Side Rendering", "Static Generation", "API Routes", "Image Optimization"],
          projectsUsedIn: [
            { name: "Portfolio Website", role: "Complete Framework" },
            { name: "E-commerce Platform", role: "Performance Optimization" }
          ],
          learningResources: [
            { title: "Next.js Documentation", type: "Official Docs" },
            { title: "Next.js Conf Talks", type: "Conference Videos" }
          ],
          codeExample: `// Advanced Next.js patterns\nexport async function getStaticProps({ params }) {\n  const post = await getPostBySlug(params.slug);\n  \n  return {\n    props: { post },\n    revalidate: 60 // ISR - revalidate every minute\n  };\n}\n\nexport async function getStaticPaths() {\n  const posts = await getAllPosts();\n  \n  return {\n    paths: posts.map(post => ({ params: { slug: post.slug } })),\n    fallback: 'blocking'\n  };\n}`,
          firstUsed: "January 2024",
          documentationUrl: "https://nextjs.org/docs"
        },
        {
          name: "AI Integration",
          category: "Artificial Intelligence",
          description: "Integrating AI capabilities into web applications for enhanced user experiences and automated workflows.",
          proficiency: 78,
          experienceLevel: "Intermediate",
          keyFeatures: ["OpenAI API", "Natural Language Processing", "Code Generation", "Content Creation"],
          projectsUsedIn: [
            { name: "AI Chat Assistant", role: "Core AI Logic" },
            { name: "Content Generator", role: "AI Integration" }
          ],
          learningResources: [
            { title: "OpenAI API Documentation", type: "API Reference" },
            { title: "AI for Developers", type: "Online Course" }
          ],
          codeExample: `// AI-powered content generation\nconst generateBlogPost = async (topic, tone = 'professional') => {\n  const prompt = \`Write a blog post about \${topic} in a \${tone} tone.\`;\n  \n  const response = await openai.chat.completions.create({\n    model: 'gpt-4',\n    messages: [{ role: 'user', content: prompt }],\n    max_tokens: 1000,\n    temperature: 0.7\n  });\n  \n  return {\n    content: response.choices[0].message.content,\n    wordCount: response.choices[0].message.content.split(' ').length,\n    generatedAt: new Date().toISOString()\n  };\n};`,
          firstUsed: "March 2024",
          documentationUrl: "https://platform.openai.com/docs"
        }
      ],
      keyProjects: [
        {
          name: "Terminal Portfolio",
          description: "Interactive terminal-style portfolio with AI assistance and Web3 features",
          category: "Personal Project",
          status: "in-progress",
          year: "2024",
          features: ["Terminal Interface", "AI Chat Assistant", "Web3 Integration", "Interactive Story", "Gesture Controls"],
          techStack: ["React", "Next.js", "TypeScript", "Framer Motion", "OpenAI API", "Web3.js"],
          timeline: "Ongoing",
          architecture: "Modern React architecture with AI microservices and blockchain integration",
          codeSnippet: `// Terminal command processor\nclass TerminalProcessor {\n  constructor(aiAssistant, web3Provider) {\n    this.ai = aiAssistant;\n    this.web3 = web3Provider;\n    this.commands = new Map();\n    this.initializeCommands();\n  }\n  \n  async processCommand(input) {\n    const [command, ...args] = input.trim().split(' ');\n    \n    if (this.commands.has(command)) {\n      return await this.commands.get(command)(args);\n    }\n    \n    // Fallback to AI assistance\n    return await this.ai.interpretCommand(input);\n  }\n}`,
          challenges: [
            {
              problem: "Terminal Authenticity",
              description: "Creating a realistic terminal experience in the browser",
              solution: "Implemented custom terminal emulator with proper keyboard handling and command history"
            },
            {
              problem: "AI Integration",
              description: "Seamlessly integrating AI assistance without breaking the terminal flow",
              solution: "Created context-aware AI that understands terminal commands and portfolio content"
            }
          ],
          metrics: [
            { value: "95%", label: "Lighthouse Score" },
            { value: "< 1s", label: "First Paint" },
            { value: "100%", label: "Accessibility" }
          ],
          impact: "Creating a unique portfolio experience that showcases technical skills while providing an engaging, interactive journey for visitors.",
          learnings: [
            "Advanced React patterns and performance optimization",
            "AI integration and prompt engineering",
            "Web3 development and blockchain interaction",
            "Accessibility and inclusive design principles"
          ],
          demoUrl: "https://terminal-portfolio.example.com"
        }
      ],
      achievements: [
        "AI Integration Expert",
        "Web3 Development",
        "Community Mentorship",
        "Open Source Contributions"
      ],
      metrics: [
        { value: "50+", label: "Developers Mentored" },
        { value: "10K+", label: "GitHub Stars" }
      ],
      expandedDetails: `This year represents the culmination of years of learning and the beginning of giving back to the community. I'm focused on exploring cutting-edge technologies while mentoring other developers and contributing to open source projects that make a difference.`,
      ctaButton: {
        text: "Connect & Collaborate",
        icon: "Users",
        action: () => navigate('/ai-assistant-chat-interface')
      }
    }
  ];
  

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleStartStory = () => {
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  const handleNavigatePanel = (panelIndex) => {
    setCurrentPanel(panelIndex);
  };

  const handleToggleAutoPlay = (enabled) => {
    setIsAutoPlaying(enabled);
  };

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
    setIsTechModalOpen(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseTechModal = () => {
    setIsTechModalOpen(false);
    setSelectedTech(null);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateToProjects = () => {
    navigate('/projects-lab-showcase');
  };

  const toggleTextToSpeech = () => {
    setIsTextToSpeechEnabled(!isTextToSpeechEnabled);
    
    if (!isTextToSpeechEnabled) {
      // Start text-to-speech for current panel
      const currentPanelData = storyPanels[currentPanel];
      const textToSpeak = `${currentPanelData.title}. ${currentPanelData.subtitle}. ${currentPanelData.description}`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    } else {
      // Stop text-to-speech
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showIntro) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (currentPanel > 0) {
            setCurrentPanel(currentPanel - 1);
          }
          break;
        case 'ArrowRight':
          if (currentPanel < storyPanels.length - 1) {
            setCurrentPanel(currentPanel + 1);
          }
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
        case 'Escape':
          if (isTechModalOpen) {
            handleCloseTechModal();
          } else if (isProjectModalOpen) {
            handleCloseProjectModal();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showIntro, currentPanel, isAutoPlaying, isTechModalOpen, isProjectModalOpen]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0 && currentPanel < storyPanels.length - 1) {
          // Swipe left - next panel
          setCurrentPanel(currentPanel + 1);
        } else if (diffX < 0 && currentPanel > 0) {
          // Swipe right - previous panel
          setCurrentPanel(currentPanel - 1);
        }
      }

      startX = 0;
      startY = 0;
    };

    if (!showIntro) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showIntro, currentPanel]);

  if (showIntro) {
    return (
      <StoryIntro 
        onStart={handleStartStory}
        onSkip={handleSkipIntro}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Accessibility Controls */}
      <div className="fixed top-20 right-4 z-40 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTextToSpeech}
          className={`w-12 h-12 p-0 ${isTextToSpeechEnabled ? 'bg-primary text-primary-foreground' : ''}`}
          iconName={isTextToSpeechEnabled ? "VolumeX" : "Volume2"}
          title={isTextToSpeechEnabled ? "Stop narration" : "Start narration"}
        />
      </div>

      {/* Story Panels */}
      <main className="relative">
        <AnimatePresence mode="wait">
          <StoryPanel
            key={currentPanel}
            panel={storyPanels[currentPanel]}
            index={currentPanel}
            isActive={true}
            onTechClick={handleTechClick}
            onProjectClick={handleProjectClick}
            enableParallax={true}
          />
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <StoryNavigation
        currentPanel={currentPanel}
        totalPanels={storyPanels.length}
        onNavigate={handleNavigatePanel}
        onToggleAutoPlay={handleToggleAutoPlay}
        isAutoPlaying={isAutoPlaying}
        autoPlaySpeed={5000}
      />
      
    </div>
  );
};

export default InteractiveStoryMode;