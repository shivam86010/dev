import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../Components/Ui/Header';
import Icon from '../../Components/AppIcon';
import Button from '../../Components/Ui/Button';
import ProjectCard from './Component/ProjectCard';
import ProjectDetails from './Component/ProjectDetails';
import TerminalInterface from './Component/TerminalInterface';
import TechBadgeCollection from './Component/TechBadgeCollection';
import ProjectFilters from './Component/ProjectFilter';

const ProjectsLabShowcase = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'terminal'
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      directory: "ecommerce-platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      fullDescription: `A comprehensive e-commerce platform built with modern web technologies. This project demonstrates full-stack development capabilities with a focus on user experience, performance, and scalability. The platform includes advanced features like real-time inventory management, personalized recommendations, and comprehensive analytics dashboard.`,
      status: "completed",
      category: "web-application",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Tailwind CSS"],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      lastUpdated: "2 days ago",
      timeline: "3 months",
      teamSize: "Solo project",
      metrics: {
        lines: 15420,
        commits: 127,
        stars: 45,
        views: 1234,
        files: 89,
        uptime: 99.9,
        responseTime: 245
      },
      performance: {
        loadTime: 1200,
        bundleSize: "245KB"
      },
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and wishlist functionality",
        "Secure payment processing with Stripe",
        "Order tracking and history",
        "Admin dashboard for inventory management",
        "Real-time notifications",
        "Responsive design for all devices"
      ],
      challenges: [
        "Implementing secure payment processing",
        "Optimizing database queries for large product catalogs",
        "Managing complex state across multiple components",
        "Ensuring responsive design across all screen sizes"
      ],
      narration: `This e-commerce platform represents a comprehensive solution for online retail businesses. Built with React for the frontend and Node.js for the backend, it demonstrates modern full-stack development practices. The project showcases advanced features like real-time inventory management, secure payment processing, and a responsive design that works seamlessly across all devices.`,
      codeSnippet: `// Product catalog component with search and filtering
import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductCatalog = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading, error } = useProducts(filters, searchTerm);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="product-catalog">
      <SearchBar onSearch={setSearchTerm} />
      <FilterPanel onFilterChange={handleFilterChange} />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};`,
      architectureDecisions: [
        {
          title: "State Management",
          description: "Used Redux Toolkit for complex state management across cart, user, and product data"
        },
        {
          title: "Database Design",
          description: "Implemented MongoDB with optimized indexing for fast product searches and filtering"
        },
        {
          title: "Authentication",
          description: "JWT-based authentication with refresh tokens for enhanced security"
        }
      ],
      techStack: {
        frontend: ["React", "Redux Toolkit", "Tailwind CSS"],
        backend: ["Node.js", "Express", "MongoDB"],
        payment: ["Stripe API"],
        deployment: ["Vercel", "MongoDB Atlas"]
      },
      alternatives: [
        {
          title: "Next.js with Server-Side Rendering",
          description: "Could have used Next.js for better SEO and initial page load performance",
          complexity: "medium",
          pros: ["Better SEO", "Faster initial load", "Built-in API routes"],
          cons: ["More complex deployment", "Learning curve", "Overkill for SPA"],
          codeExample: `// Next.js page with SSR
export async function getServerSideProps(context) {
  const products = await fetchProducts();
  return { props: { products } };
}`
        },
        {
          title: "Microservices Architecture",
          description: "Split into separate services for user management, product catalog, and payments",
          complexity: "high",
          pros: ["Better scalability", "Independent deployments", "Technology diversity"],
          cons: ["Increased complexity", "Network overhead", "Harder to debug"],
          codeExample: `// Microservice communication
const userService = new UserService('http://user-service:3001');
const productService = new ProductService('http://product-service:3002');`
        }
      ],
      demoSteps: [
        "$ npm install",
        "Installing dependencies...",
        "✓ React, Node.js, MongoDB packages installed",
        "$ npm run build",
        "Building production bundle...",
        "✓ Build completed - 245KB gzipped",
        "$ npm start",
        "Starting development server...",
        "✓ Server running on http://localhost:3000",
        "✓ Database connected to MongoDB Atlas",
        "✓ Stripe webhook endpoints configured"
      ]
    },
    {
      id: 2,
      name: "Task Management Dashboard",
      directory: "task-dashboard",
      description: "React-based task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      fullDescription: `A sophisticated task management dashboard designed for modern teams. Built with React and featuring an intuitive drag-and-drop interface, real-time collaboration, and comprehensive project tracking. The application includes advanced features like time tracking, file attachments, and detailed analytics to help teams stay productive and organized.`,
      status: "in-progress",
      category: "productivity",
      technologies: ["React", "TypeScript", "Firebase", "React DnD", "Chart.js", "Material-UI"],
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/task-dashboard",
      liveUrl: "https://task-dashboard-demo.netlify.app",
      lastUpdated: "1 day ago",
      timeline: "2 months",
      teamSize: "2 developers",
      metrics: {
        lines: 12350,
        commits: 89,
        stars: 32,
        views: 856,
        files: 67,
        uptime: 98.5,
        responseTime: 180
      },
      performance: {
        loadTime: 950,
        bundleSize: "189KB"
      },
      features: [
        "Drag-and-drop task management",
        "Real-time collaboration with team members",
        "Project timeline and milestone tracking",
        "File attachments and comments",
        "Time tracking and reporting",
        "Custom labels and priority levels",
        "Advanced search and filtering",
        "Mobile-responsive design"
      ],
      challenges: [
        "Implementing smooth drag-and-drop interactions",
        "Managing real-time updates across multiple users",
        "Optimizing performance with large task lists",
        "Creating intuitive user experience for complex workflows"
      ],
      narration: `The task management dashboard showcases advanced React development techniques with a focus on user experience and real-time collaboration. The drag-and-drop functionality is powered by React DnD, while Firebase provides real-time synchronization across team members. The application demonstrates complex state management and performance optimization techniques.`,
      codeSnippet: `// Drag and drop task component
import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';

const DroppableColumn = ({ column, tasks, onTaskMove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => onTaskMove(item.id, column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div ref={drop} className={\`column \${isOver ? 'drag-over' : ''}\`}>
      <h3>{column.title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};`,
      architectureDecisions: [
        {
          title: "Real-time Updates",
          description: "Firebase Firestore for real-time synchronization across team members"
        },
        {
          title: "Drag and Drop",
          description: "React DnD library for smooth drag-and-drop interactions with touch support"
        },
        {
          title: "State Management",
          description: "Context API with useReducer for complex task state management"
        }
      ],
      techStack: {
        frontend: ["React", "TypeScript", "Material-UI"],
        backend: ["Firebase", "Firestore"],
        libraries: ["React DnD", "Chart.js"],
        deployment: ["Netlify", "Firebase Hosting"]
      },
      alternatives: [
        {
          title: "Redux for State Management",
          description: "Could have used Redux instead of Context API for more predictable state updates",
          complexity: "medium",
          pros: ["Better debugging", "Time travel debugging", "Predictable state updates"],
          cons: ["More boilerplate", "Learning curve", "Overkill for medium apps"],
          codeExample: `// Redux slice for tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false },
  reducers: {
    moveTask: (state, action) => {
      // Handle task movement logic
    }
  }
});`
        }
      ],
      demoSteps: [
        "$ npm install",
        "Installing TypeScript and React dependencies...",
        "✓ React, TypeScript, Firebase packages installed",
        "$ npm run dev",
        "Starting development server...",
        "✓ Server running on http://localhost:3000",
        "✓ Firebase connection established",
        "✓ Real-time listeners activated"
      ]
    },
    {
      id: 3,
      name: "Weather Analytics App",
      directory: "weather-analytics",
      description: "Vue.js weather application with data visualization, location-based forecasts, and historical weather analysis.",
      fullDescription: `A comprehensive weather analytics application built with Vue.js that provides detailed weather information, forecasts, and historical data analysis. The app features interactive charts, location-based services, and advanced data visualization to help users understand weather patterns and trends.`,
      status: "completed",
      category: "data-visualization",
      technologies: ["Vue.js", "D3.js", "OpenWeather API", "Vuex", "Vue Router", "SCSS"],
      images: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/weather-analytics",
      liveUrl: "https://weather-analytics.surge.sh",
      lastUpdated: "5 days ago",
      timeline: "6 weeks",
      teamSize: "Solo project",
      metrics: {
        lines: 8750,
        commits: 64,
        stars: 28,
        views: 642,
        files: 45,
        uptime: 99.2,
        responseTime: 320
      },
      performance: {
        loadTime: 800,
        bundleSize: "156KB"
      },
      features: [
        "Real-time weather data from OpenWeather API",
        "Interactive charts and data visualization",
        "Location-based weather forecasts",
        "Historical weather data analysis",
        "Weather alerts and notifications",
        "Multiple location comparison",
        "Responsive design with dark/light themes",
        "Offline data caching"
      ],
      challenges: [
        "Handling large datasets for historical analysis",
        "Creating responsive data visualizations",
        "Managing API rate limits efficiently",
        "Implementing smooth animations for chart transitions"
      ],
      narration: `The weather analytics app demonstrates advanced data visualization techniques using Vue.js and D3.js. It showcases how to work with external APIs, manage complex data transformations, and create engaging user interfaces for data-heavy applications. The app includes sophisticated charting capabilities and real-time data updates.`,
      codeSnippet: `// Weather data visualization component
<template>
  <div class="weather-chart">
    <svg ref="chartSvg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'WeatherChart',
  props: ['weatherData', 'width', 'height'],
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const svg = d3.select(this.$refs.chartSvg);
      const xScale = d3.scaleTime()
        .domain(d3.extent(this.weatherData, d => d.date))
        .range([0, this.width]);
      
      // Create temperature line chart
      const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => this.yScale(d.temperature));
    }
  }
};
</script>`,
      architectureDecisions: [
        {
          title: "Vue.js Framework",
          description: "Chose Vue.js for its reactive data binding and component-based architecture"
        },
        {
          title: "D3.js for Visualization",
          description: "Used D3.js for creating custom, interactive data visualizations"
        },
        {
          title: "Vuex State Management",
          description: "Implemented Vuex for managing weather data and application state"
        }
      ],
      techStack: {
        frontend: ["Vue.js", "D3.js", "SCSS"],
        state: ["Vuex"],
        api: ["OpenWeather API"],
        deployment: ["Surge.sh"]
      },
      alternatives: [
        {
          title: "Chart.js Instead of D3.js",
          description: "Could have used Chart.js for simpler chart implementation",
          complexity: "low",
          pros: ["Easier to implement", "Less code required", "Built-in responsiveness"],
          cons: ["Less customization", "Limited interaction", "Fewer chart types"],
          codeExample: `// Chart.js implementation
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};`
        }
      ],
      demoSteps: [
        "$ npm install",
        "Installing Vue.js and D3.js dependencies...",
        "✓ Vue.js, D3.js, Vuex packages installed",
        "$ npm run serve",
        "Starting Vue development server...",
        "✓ Server running on http://localhost:8080",
        "✓ OpenWeather API connected",
        "✓ Location services enabled"
      ]
    },
    {
      id: 4,
      name: "Real-time Chat Application",
      directory: "realtime-chat",
      description: "Socket.io powered chat application with React frontend, featuring real-time messaging, file sharing, and group chat functionality.",
      fullDescription: `A modern real-time chat application built with React and Socket.io that enables instant messaging, file sharing, and group conversations. The application features end-to-end encryption, message history, user presence indicators, and a responsive design that works seamlessly across all devices.`,
      status: "completed",
      category: "communication",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "JWT", "Multer", "Emoji Picker"],
      images: [
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/realtime-chat",
      liveUrl: "https://realtime-chat-demo.herokuapp.com",
      lastUpdated: "3 days ago",
      timeline: "8 weeks",
      teamSize: "Solo project",
      metrics: {
        lines: 11200,
        commits: 95,
        stars: 67,
        views: 1456,
        files: 58,
        uptime: 97.8,
        responseTime: 150
      },
      performance: {
        loadTime: 1100,
        bundleSize: "198KB"
      },
      features: [
        "Real-time messaging with Socket.io",
        "Group chat and private messaging",
        "File and image sharing",
        "Message encryption and security",
        "User presence and typing indicators",
        "Message history and search",
        "Emoji picker and reactions",
        "Push notifications"
      ],
      challenges: [
        "Implementing real-time message synchronization",
        "Managing socket connections efficiently",
        "Handling file uploads and storage",
        "Ensuring message delivery and ordering"
      ],
      narration: `This real-time chat application demonstrates advanced WebSocket programming with Socket.io and React. It showcases real-time communication patterns, efficient state management for chat data, and secure file handling. The application includes sophisticated features like message encryption, presence indicators, and seamless file sharing capabilities.`,
      codeSnippet: `// Socket.io chat implementation
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const useSocket = (serverPath) => {
  const [socket, setSocket] = useState();
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const socketIo = io(serverPath);
    
    socketIo.on('connect', () => {
      setOnline(true);
    });
    
    socketIo.on('disconnect', () => {
      setOnline(false);
    });

    setSocket(socketIo);
    
    return () => socketIo.close();
  }, [serverPath]);

  return { socket, online };
};`,
      architectureDecisions: [
        {
          title: "Socket.io for Real-time",
          description: "Chose Socket.io for reliable real-time communication with fallback support"
        },
        {
          title: "JWT Authentication",
          description: "Implemented JWT tokens for secure user authentication and session management"
        },
        {
          title: "MongoDB for Messages",
          description: "Used MongoDB for flexible message storage and efficient querying"
        }
      ],
      techStack: {
        frontend: ["React", "Socket.io Client"],
        backend: ["Node.js", "Socket.io", "Express"],
        database: ["MongoDB"],
        deployment: ["Heroku", "MongoDB Atlas"]
      },
      alternatives: [
        {
          title: "WebRTC for Peer-to-Peer",
          description: "Could have used WebRTC for direct peer-to-peer communication",
          complexity: "high",
          pros: ["No server overhead", "Better privacy", "Lower latency"],
          cons: ["Complex NAT traversal", "Limited group chat", "Browser compatibility"],
          codeExample: `// WebRTC peer connection
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

const dataChannel = peerConnection.createDataChannel('messages');`
        }
      ],
      demoSteps: [
        "$ npm install",
        "Installing Socket.io and React dependencies...",
        "✓ React, Socket.io, Node.js packages installed",
        "$ npm run dev",
        "Starting development servers...",
        "✓ Frontend running on http://localhost:3000",
        "✓ Backend running on http://localhost:5000",
        "✓ Socket.io server initialized",
        "✓ MongoDB connection established"
      ]
    },
    {
      id: 5,
      name: "AI-Powered Code Assistant",
      directory: "ai-code-assistant",
      description: "Machine learning powered code completion and analysis tool built with Python, TensorFlow, and a React frontend interface.",
      fullDescription: `An intelligent code assistant that uses machine learning to provide code completions, bug detection, and code quality analysis. Built with Python and TensorFlow for the AI backend and React for the user interface, this tool helps developers write better code faster with intelligent suggestions and automated code review capabilities.`,
      status: "planning",
      category: "ai-tools",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker", "Redis"],
      images: [
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/ai-code-assistant",
      liveUrl: "https://ai-code-assistant.vercel.app",
      lastUpdated: "1 week ago",
      timeline: "4 months (planned)",
      teamSize: "3 developers",
      metrics: {
        lines: 5200,
        commits: 23,
        stars: 15,
        views: 234,
        files: 32,
        uptime: 95.0,
        responseTime: 450
      },
      performance: {
        loadTime: 1500,
        bundleSize: "312KB"
      },
      features: [
        "AI-powered code completion",
        "Automated bug detection and fixes",
        "Code quality analysis and suggestions",
        "Multi-language support",
        "Integration with popular IDEs",
        "Custom model training capabilities",
        "Real-time collaboration features",
        "Performance optimization recommendations"
      ],
      challenges: [
        "Training accurate code completion models",
        "Handling multiple programming languages",
        "Optimizing inference speed for real-time suggestions",
        "Creating intuitive user interface for complex AI features"
      ],
      narration: `The AI-powered code assistant represents the cutting edge of developer tools, combining machine learning with practical software development needs. Built with TensorFlow for the AI backend and React for the frontend, it demonstrates how to integrate complex AI models into user-friendly applications. The project showcases advanced techniques in natural language processing applied to code analysis.`,
      codeSnippet: `# AI model for code completion
import tensorflow as tf
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class CodeCompletionModel:
    def __init__(self, model_path):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_path)
        self.model = GPT2LMHeadModel.from_pretrained(model_path)
    
    def complete_code(self, code_context, max_length=50):
        inputs = self.tokenizer.encode(code_context, return_tensors='pt')
        
        with tf.no_grad():
            outputs = self.model.generate(
                inputs,
                max_length=len(inputs[0]) + max_length,
                temperature=0.7,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        completion = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return completion[len(code_context):]`,
      architectureDecisions: [
        {
          title: "TensorFlow for AI",
          description: "Chose TensorFlow for robust machine learning model development and deployment"
        },
        {
          title: "FastAPI Backend",
          description: "Used FastAPI for high-performance API with automatic documentation"
        },
        {
          title: "Microservices Architecture",
          description: "Separated AI inference, code analysis, and user interface into distinct services"
        }
      ],
      techStack: {
        ai: ["Python", "TensorFlow", "Transformers"],
        backend: ["FastAPI", "PostgreSQL", "Redis"],
        frontend: ["React", "TypeScript"],
        deployment: ["Docker", "Kubernetes", "AWS"]
      },
      alternatives: [
        {
          title: "PyTorch Instead of TensorFlow",
          description: "Could have used PyTorch for more flexible model development",
          complexity: "medium",
          pros: ["More intuitive API", "Better debugging", "Dynamic computation graphs"],
          cons: ["Smaller ecosystem", "Less production tooling", "Steeper learning curve"],
          codeExample: `# PyTorch model implementation
import torch
import torch.nn as nn

class CodeTransformer(nn.Module):
    def __init__(self, vocab_size, d_model, nhead):
        super().__init__()
        self.transformer = nn.Transformer(d_model, nhead)
        self.embedding = nn.Embedding(vocab_size, d_model)`
        }
      ],
      demoSteps: [
        "$ pip install -r requirements.txt",
        "Installing Python dependencies...",
        "✓ TensorFlow, FastAPI, transformers installed",
        "$ docker-compose up",
        "Starting AI services...",
        "✓ AI model server running on port 8000",
        "✓ PostgreSQL database initialized",
        "✓ Redis cache server started",
        "$ npm start",
        "Starting React frontend...",
        "✓ Frontend running on http://localhost:3000"
      ]
    },
    {
      id: 6,
      name: "Blockchain Voting System",
      directory: "blockchain-voting",
      description: "Decentralized voting application built with Solidity smart contracts, Web3.js, and React for transparent and secure elections.",
      fullDescription: `A revolutionary blockchain-based voting system that ensures transparency, security, and immutability in electoral processes. Built with Solidity smart contracts on Ethereum, Web3.js for blockchain interaction, and React for the user interface. The system provides end-to-end verification, prevents double voting, and maintains complete transparency while preserving voter privacy.`,
      status: "completed",
      category: "blockchain",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "Truffle", "MetaMask", "IPFS"],
      images: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop"
      ],
      githubUrl: "https://github.com/shivam/blockchain-voting",
      liveUrl: "https://blockchain-voting-demo.netlify.app",
      lastUpdated: "1 week ago",
      timeline: "10 weeks",
      teamSize: "2 developers",
      metrics: {
        lines: 9800,
        commits: 78,
        stars: 89,
        views: 2134,
        files: 41,
        uptime: 99.5,
        responseTime: 280
      },
      performance: {
        loadTime: 1300,
        bundleSize: "267KB"
      },
      features: [
        "Smart contract-based voting logic",
        "MetaMask wallet integration",
        "Transparent vote counting",
        "Immutable voting records",
        "Voter registration and verification",
        "Real-time election results",
        "IPFS for decentralized storage",
        "Multi-candidate election support"
      ],
      challenges: [
        "Implementing secure smart contract logic",
        "Managing gas costs for transactions",
        "Creating user-friendly Web3 interactions",
        "Ensuring voter privacy while maintaining transparency"
      ],
      narration: `The blockchain voting system demonstrates advanced smart contract development and Web3 integration. Built on Ethereum with Solidity smart contracts, it showcases how blockchain technology can revolutionize democratic processes. The system ensures complete transparency and immutability while maintaining user privacy through cryptographic techniques.`,
      codeSnippet: `// Solidity smart contract for voting
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(address => bool) public hasVoted;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    
    event VoteCast(address indexed voter, uint indexed candidateId);
    
    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
    
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}`,
      architectureDecisions: [
        {
          title: "Ethereum Blockchain",
          description: "Chose Ethereum for its mature smart contract ecosystem and wide adoption"
        },
        {
          title: "IPFS Storage",
          description: "Used IPFS for decentralized storage of candidate information and election data"
        },
        {
          title: "MetaMask Integration",
          description: "Integrated MetaMask for seamless wallet connection and transaction signing"
        }
      ],
      techStack: {
        blockchain: ["Solidity", "Ethereum", "Truffle"],
        frontend: ["React", "Web3.js"],
        storage: ["IPFS"],
        deployment: ["Netlify", "Ethereum Testnet"]
      },
      alternatives: [
        {
          title: "Polygon for Lower Gas Fees",
          description: "Could have deployed on Polygon network for reduced transaction costs",
          complexity: "low",
          pros: ["Lower gas fees", "Faster transactions", "Ethereum compatibility"],
          cons: ["Less decentralized", "Smaller network effect", "Additional complexity"],
          codeExample: `// Polygon network configuration
const polygonConfig = {
  chainId: 137,
  rpcUrl: 'https://polygon-rpc.com',
  blockExplorer: 'https://polygonscan.com'
};`
        }
      ],
      demoSteps: [
        "$ npm install",
        "Installing Web3 and React dependencies...",
        "✓ React, Web3.js, Truffle packages installed",
        "$ truffle compile",
        "Compiling smart contracts...",
        "✓ VotingSystem.sol compiled successfully",
        "$ truffle migrate --network development",
        "Deploying contracts to local blockchain...",
        "✓ Contracts deployed to Ganache",
        "$ npm start",
        "Starting React application...",
        "✓ Frontend running on http://localhost:3000"
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFilteredProjects(projects);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    
    let filtered = [...projects];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      );
    }

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(project => filters.status.includes(project.status));
    }

    // Apply category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(project => filters.category.includes(project.category));
    }

    // Apply technology filter
    if (filters.technologies && filters.technologies.length > 0) {
      filtered = filtered.filter(project =>
        filters.technologies.some(tech =>
          project.technologies.some(projectTech =>
            projectTech.toLowerCase().includes(tech.toLowerCase())
          )
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'date':
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          case 'stars':
            return b.metrics.stars - a.metrics.stars;
          case 'commits':
            return b.metrics.commits - a.metrics.commits;
          default:
            return 0;
        }
      });
    }

    setFilteredProjects(filtered);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleBadgeCollected = (tech) => {
    console.log(`Badge collected: ${tech}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="font-terminal text-lg text-foreground">
              Loading Projects Lab...
            </div>
            <div className="font-code text-sm text-muted mt-2">
              Initializing terminal interface
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects Lab Showcase - Shivam's Portfolio</title>
        <meta name="description" content="Explore interactive project demonstrations with live code examples, technical deep-dives, and alternative implementation approaches." />
        <meta name="keywords" content="projects, portfolio, web development, React, Node.js, full-stack" />
      </Helmet>

      <Header />

      <main className="pt-16">
        {selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : (
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="font-terminal text-4xl md:text-5xl font-bold text-foreground mb-4">
                Projects Lab Showcase
              </h1>
              <p className="font-code text-lg text-muted max-w-3xl mx-auto mb-6">
                Explore interactive project demonstrations with self-narrating demos, live code examples, 
                and alternative implementation approaches. Each project tells its own story.
              </p>
              
              {/* View Mode Toggle */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'terminal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('terminal')}
                  iconName="Terminal"
                  iconSize={16}
                >
                  Terminal Mode
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-card border border-border rounded-terminal p-4">
                  <div className="text-2xl font-terminal font-bold text-primary">
                    {projects.length}
                  </div>
                  <div className="text-xs font-code text-muted">Projects</div>
                </div>
                <div className="bg-card border border-border rounded-terminal p-4">
                  <div className="text-2xl font-terminal font-bold text-success">
                    {projects.reduce((sum, p) => sum + p.metrics.commits, 0)}
                  </div>
                  <div className="text-xs font-code text-muted">Commits</div>
                </div>
                <div className="bg-card border border-border rounded-terminal p-4">
                  <div className="text-2xl font-terminal font-bold text-warning">
                    {projects.reduce((sum, p) => sum + p.metrics.stars, 0)}
                  </div>
                  <div className="text-xs font-code text-muted">Stars</div>
                </div>
                <div className="bg-card border border-border rounded-terminal p-4">
                  <div className="text-2xl font-terminal font-bold text-accent">
                    {[...new Set(projects.flatMap(p => p.technologies))].length}
                  </div>
                  <div className="text-xs font-code text-muted">Technologies</div>
                </div>
              </div>
            </div>

            {viewMode === 'terminal' ? (
              <div className="h-96 mb-8">
                <TerminalInterface
                  projects={filteredProjects}
                  onProjectSelect={handleProjectSelect}
                  onViewModeChange={setViewMode}
                />
              </div>
            ) : (
              <>
                {/* Filters */}
                <div className="mb-8">
                  <ProjectFilters
                    projects={projects}
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                  />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={handleProjectSelect}
                      isSelected={selectedProject?.id === project.id}
                      viewMode="grid"
                    />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted mx-auto mb-4" />
                    <h3 className="font-terminal text-lg font-bold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="font-code text-muted">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Tech Badge Collection */}
        <TechBadgeCollection
          projects={projects}
          onBadgeCollected={handleBadgeCollected}
        />
      </main>
    </div>
  );
};

export default ProjectsLabShowcase;