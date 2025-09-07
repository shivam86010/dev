import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../Components/AppIcon';
import Button from '../../../Components/Ui/Button';


const ProjectModal = ({ project, isOpen, onClose, onNavigateToProjects }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'technical', label: 'Technical', icon: 'Code2' },
    { id: 'challenges', label: 'Challenges', icon: 'Zap' },
    { id: 'results', label: 'Results', icon: 'TrendingUp' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{project.description}</p>
            
            {project.features && project.features.length > 0 && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Key Features
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-background/50 rounded-terminal border border-border/50"
                    >
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.timeline && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Timeline
                </h5>
                <div className="bg-background/30 rounded-terminal p-3 border border-border/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Duration:</span>
                    <span className="text-foreground font-medium">{project.timeline}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-4">
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Technology Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-card border border-border rounded-terminal text-sm font-code"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.architecture && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Architecture
                </h5>
                <p className="text-foreground leading-relaxed text-sm">{project.architecture}</p>
              </div>
            )}

            {project.codeSnippet && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Code Highlight
                </h5>
                <div className="bg-github-dark border border-border rounded-terminal p-4 font-code text-sm overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted text-xs">{project.name.toLowerCase().replace(/\s+/g, '-')}.js</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-error rounded-full" />
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                  </div>
                  <pre className="text-primary whitespace-pre-wrap">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-4">
            {project.challenges && project.challenges.length > 0 ? (
              project.challenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-background/30 rounded-terminal border border-border/30">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={16} className="text-warning mt-1" />
                    <div className="flex-1">
                      <h6 className="font-medium text-foreground mb-1">{challenge.problem}</h6>
                      <p className="text-sm text-muted mb-2">{challenge.description}</p>
                      <div className="flex items-start space-x-2">
                        <Icon name="Lightbulb" size={14} className="text-accent mt-1" />
                        <p className="text-sm text-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-8">No specific challenges documented for this project.</p>
            )}
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Key Metrics
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric, index) => (
                    <div 
                      key={index}
                      className="bg-card border border-border rounded-terminal p-3 text-center"
                    >
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted font-terminal">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.impact && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Impact & Outcomes
                </h5>
                <p className="text-foreground leading-relaxed">{project.impact}</p>
              </div>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <div>
                <h5 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Key Learnings
                </h5>
                <div className="space-y-2">
                  {project.learnings.map((learning, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-2 p-2"
                    >
                      <Icon name="BookOpen" size={14} className="text-accent mt-1" />
                      <span className="text-sm text-foreground">{learning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-card border border-border rounded-terminal terminal-modal overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-terminal flex items-center justify-center">
                  <Icon name="Folder" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted">{project.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
                className="w-8 h-8 p-0"
              />
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-0 p-6 pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-t-terminal border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-background/50' :'border-transparent text-muted hover:text-foreground hover:bg-background/30'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="font-terminal text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-background/30">
              <div className="flex items-center space-x-4 text-sm text-muted">
                {project.status && (
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'completed' ? 'bg-success' :
                      project.status === 'in-progress'? 'bg-warning' : 'bg-muted'
                    }`} />
                    <span className="capitalize">{project.status}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} />
                    <span>{project.year}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Close
                </Button>
                {project.demoUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    Live Demo
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => {
                    onClose();
                    onNavigateToProjects?.();
                  }}
                >
                  View All Projects
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;