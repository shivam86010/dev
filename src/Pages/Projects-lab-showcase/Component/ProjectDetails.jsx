import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectDetails = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'demo', label: 'Live Demo', icon: 'Play' },
    { id: 'code', label: 'Code', icon: 'Code2' },
    { id: 'whatif', label: 'What If?', icon: 'GitBranch' },
    { id: 'metrics', label: 'Metrics', icon: 'BarChart3' }
  ];

  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project.images]);

  const handleNarration = () => {
    setIsNarrating(!isNarrating);
    if ('speechSynthesis' in window) {
      if (isNarrating) {
        window.speechSynthesis.cancel();
      } else {
        const content = activeTab === 'overview' ? project.narration : project.tabs[activeTab]?.narration || project.narration;
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const runDemo = async () => {
    setIsRunningDemo(true);
    setTerminalOutput([]);
    
    const demoSteps = project.demoSteps || [
      "$ npm install",
      "Installing dependencies...",
      "✓ Dependencies installed successfully",
      "$ npm run build",
      "Building application...",
      "✓ Build completed in 2.3s",
      "$ npm start",
      "Starting development server...",
      "✓ Server running on http://localhost:3000"
    ];

    for (let i = 0; i < demoSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalOutput(prev => [...prev, demoSteps[i]]);
    }
    
    setIsRunningDemo(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-terminal text-lg font-bold text-foreground mb-4">
                  Project Overview
                </h3>
                <p className="font-code text-muted mb-4 leading-relaxed">
                  {project.fullDescription}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-terminal text-sm font-bold text-primary mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="font-code text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-terminal text-sm font-bold text-primary mb-2">
                      Challenges Faced
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                          <span className="font-code text-sm text-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative h-64 rounded-terminal overflow-hidden mb-4">
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-code">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/10 border border-muted/20 rounded-terminal p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="font-terminal text-sm font-bold text-foreground">Timeline</span>
                    </div>
                    <p className="font-code text-xs text-muted">{project.timeline}</p>
                  </div>

                  <div className="bg-muted/10 border border-muted/20 rounded-terminal p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="font-terminal text-sm font-bold text-foreground">Team Size</span>
                    </div>
                    <p className="font-code text-xs text-muted">{project.teamSize}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'demo':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-terminal text-lg font-bold text-foreground">
                Live Demo Terminal
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runDemo}
                  disabled={isRunningDemo}
                  iconName="Play"
                  iconSize={16}
                >
                  {isRunningDemo ? 'Running...' : 'Run Demo'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTerminalOutput([])}
                  iconName="RotateCcw"
                  iconSize={16}
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="bg-terminal-black border border-border rounded-terminal p-4 h-96 overflow-y-auto font-terminal text-sm">
              <div className="text-primary mb-2">
                shivam@portfolio:~/projects/{project.directory}$
              </div>
              {terminalOutput.map((line, index) => (
                <div key={index} className={`mb-1 ${
                  line.startsWith('$') ? 'text-primary' : 
                  line.startsWith('✓') ? 'text-success' : 
                  line.startsWith('✗') ? 'text-error' : 
                  'text-foreground'
                }`}>
                  {line}
                </div>
              ))}
              {isRunningDemo && (
                <div className="text-primary">
                  <span className="cursor-blink">_</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-warning" />
                  <span className="font-terminal text-sm font-bold">Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-code">
                    <span>Load Time:</span>
                    <span className="text-success">{project.performance.loadTime}ms</span>
                  </div>
                  <div className="flex justify-between text-xs font-code">
                    <span>Bundle Size:</span>
                    <span className="text-primary">{project.performance.bundleSize}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Activity" size={16} className="text-accent" />
                  <span className="font-terminal text-sm font-bold">Metrics</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-code">
                    <span>Uptime:</span>
                    <span className="text-success">{project.metrics.uptime}%</span>
                  </div>
                  <div className="flex justify-between text-xs font-code">
                    <span>Response:</span>
                    <span className="text-primary">{project.metrics.responseTime}ms</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="font-terminal text-sm font-bold">Security</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-code">
                    <span>SSL Score:</span>
                    <span className="text-success">A+</span>
                  </div>
                  <div className="flex justify-between text-xs font-code">
                    <span>Vulnerabilities:</span>
                    <span className="text-success">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-terminal text-lg font-bold text-foreground">
                Code Repository
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  iconSize={16}
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  View on GitHub
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconSize={16}
                >
                  Clone
                </Button>
              </div>
            </div>

            <div className="bg-terminal-black border border-border rounded-terminal p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="FileCode" size={16} className="text-primary" />
                  <span className="font-terminal text-sm text-foreground">
                    {project.mainFile || 'src/App.jsx'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-code text-muted">
                  <span>{project.metrics.lines} lines</span>
                  <span>•</span>
                  <span>{project.metrics.files} files</span>
                </div>
              </div>
              
              <pre className="font-code text-sm text-foreground overflow-x-auto">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-terminal text-sm font-bold text-primary mb-3">
                  Architecture Decisions
                </h4>
                <div className="space-y-3">
                  {project.architectureDecisions.map((decision, index) => (
                    <div key={index} className="bg-card border border-border rounded-terminal p-3">
                      <h5 className="font-terminal text-xs font-bold text-foreground mb-1">
                        {decision.title}
                      </h5>
                      <p className="font-code text-xs text-muted">
                        {decision.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-terminal text-sm font-bold text-primary mb-3">
                  Technology Stack
                </h4>
                <div className="space-y-3">
                  {Object.entries(project.techStack).map(([category, techs]) => (
                    <div key={category} className="bg-card border border-border rounded-terminal p-3">
                      <h5 className="font-terminal text-xs font-bold text-foreground mb-2 capitalize">
                        {category}
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted/20 border border-muted/30 rounded text-xs font-code text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'whatif':
        return (
          <div className="space-y-6">
            <h3 className="font-terminal text-lg font-bold text-foreground">
              Alternative Implementations
            </h3>
            
            <div className="space-y-6">
              {project.alternatives.map((alternative, index) => (
                <div key={index} className="bg-card border border-border rounded-terminal p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-terminal text-base font-bold text-primary mb-2">
                        {alternative.title}
                      </h4>
                      <p className="font-code text-sm text-muted">
                        {alternative.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-code ${
                        alternative.complexity === 'low' ? 'bg-success/20 text-success' :
                        alternative.complexity === 'medium'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                      }`}>
                        {alternative.complexity} complexity
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-terminal text-sm font-bold text-foreground mb-2">
                        Pros
                      </h5>
                      <ul className="space-y-1">
                        {alternative.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-start space-x-2">
                            <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span className="font-code text-xs text-foreground">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-terminal text-sm font-bold text-foreground mb-2">
                        Cons
                      </h5>
                      <ul className="space-y-1">
                        {alternative.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-start space-x-2">
                            <Icon name="Minus" size={14} className="text-error mt-0.5 flex-shrink-0" />
                            <span className="font-code text-xs text-foreground">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {alternative.codeExample && (
                    <div className="mt-4">
                      <h5 className="font-terminal text-sm font-bold text-foreground mb-2">
                        Code Example
                      </h5>
                      <div className="bg-terminal-black border border-border rounded-terminal p-3">
                        <pre className="font-code text-xs text-foreground overflow-x-auto">
                          <code>{alternative.codeExample}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <h3 className="font-terminal text-lg font-bold text-foreground">
              Project Metrics & Analytics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="GitCommit" size={16} className="text-primary" />
                  <span className="font-terminal text-sm font-bold">Commits</span>
                </div>
                <div className="text-2xl font-terminal font-bold text-foreground">
                  {project.metrics.commits}
                </div>
                <div className="text-xs font-code text-success">+12 this week</div>
              </div>

              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="font-terminal text-sm font-bold">Stars</span>
                </div>
                <div className="text-2xl font-terminal font-bold text-foreground">
                  {project.metrics.stars}
                </div>
                <div className="text-xs font-code text-success">+5 this month</div>
              </div>

              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Eye" size={16} className="text-accent" />
                  <span className="font-terminal text-sm font-bold">Views</span>
                </div>
                <div className="text-2xl font-terminal font-bold text-foreground">
                  {project.metrics.views}
                </div>
                <div className="text-xs font-code text-success">+234 today</div>
              </div>

              <div className="bg-card border border-border rounded-terminal p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Download" size={16} className="text-success" />
                  <span className="font-terminal text-sm font-bold">Downloads</span>
                </div>
                <div className="text-2xl font-terminal font-bold text-foreground">
                  {project.metrics.downloads || '1.2k'}
                </div>
                <div className="text-xs font-code text-success">+89 this week</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-terminal p-6">
              <h4 className="font-terminal text-base font-bold text-foreground mb-4">
                Contribution Activity
              </h4>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 365 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.7 ? 'bg-primary' :
                      Math.random() > 0.5 ? 'bg-primary/60' :
                      Math.random() > 0.3 ? 'bg-primary/30': 'bg-muted/20'
                    }`}
                    title={`${Math.floor(Math.random() * 10)} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs font-code text-muted">
                <span>Less</span>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-muted/20 rounded-sm" />
                  <div className="w-3 h-3 bg-primary/30 rounded-sm" />
                  <div className="w-3 h-3 bg-primary/60 rounded-sm" />
                  <div className="w-3 h-3 bg-primary rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-terminal">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="ArrowLeft"
              iconSize={16}
            >
              Back
            </Button>
            <div>
              <h1 className="font-terminal text-xl font-bold text-foreground">
                {project.name}
              </h1>
              <p className="font-code text-sm text-muted">
                {project.directory}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNarration}
              iconName={isNarrating ? "VolumeX" : "Volume2"}
              iconSize={16}
            >
              {isNarrating ? 'Stop' : 'Narrate'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconSize={16}
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 px-6 py-3 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              iconName={tab.icon}
              iconSize={16}
              className="flex-shrink-0"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;