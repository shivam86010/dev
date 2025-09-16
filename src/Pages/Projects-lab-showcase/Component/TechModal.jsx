import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../Components/Ui/Button';


const TechModal = ({ tech, isOpen, onClose }) => {
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

  if (!tech) return null;

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
            className="relative w-full max-w-2xl bg-card border border-border rounded-terminal terminal-modal overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-terminal flex items-center justify-center">
                  <Icon name="Code2" size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{tech.name}</h3>
                  <p className="text-sm text-muted">{tech.category}</p>
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

            {/* Content */}
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Description */}
              <div>
                <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  About
                </h4>
                <p className="text-foreground leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                  Proficiency Level
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                  <span className="font-terminal text-sm text-primary">
                    {tech.proficiency}%
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{tech.experienceLevel}</p>
              </div>

              {/* Key Features */}
              {tech.keyFeatures && tech.keyFeatures.length > 0 && (
                <div>
                  <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                    Key Features Used
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tech.keyFeatures.map((feature, index) => (
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

              {/* Projects Used In */}
              {tech.projectsUsedIn && tech.projectsUsedIn.length > 0 && (
                <div>
                  <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                    Projects Used In
                  </h4>
                  <div className="space-y-2">
                    {tech.projectsUsedIn.map((project, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-background/30 rounded-terminal border border-border/30"
                      >
                        <div className="font-medium text-foreground">{project.name}</div>
                        <div className="text-sm text-muted">{project.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Resources */}
              {tech.learningResources && tech.learningResources.length > 0 && (
                <div>
                  <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                    Learning Journey
                  </h4>
                  <div className="space-y-2">
                    {tech.learningResources.map((resource, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 p-2 hover:bg-background/30 rounded-terminal transition-colors"
                      >
                        <Icon name="BookOpen" size={16} className="text-accent" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{resource.title}</div>
                          <div className="text-xs text-muted">{resource.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Example */}
              {tech.codeExample && (
                <div>
                  <h4 className="font-terminal text-primary text-sm uppercase tracking-wide mb-2">
                    Code Example
                  </h4>
                  <div className="bg-github-dark border border-border rounded-terminal p-4 font-code text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted text-xs">{tech.name.toLowerCase()}.example</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-error rounded-full" />
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <div className="w-2 h-2 bg-success rounded-full" />
                      </div>
                    </div>
                    <pre className="text-primary whitespace-pre-wrap">
                      <code>{tech.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-background/30">
              <div className="flex items-center space-x-2 text-sm text-muted">
                <Icon name="Calendar" size={14} />
                <span>First used: {tech.firstUsed}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Close
                </Button>
                {tech.documentationUrl && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(tech.documentationUrl, '_blank')}
                  >
                    Documentation
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TechModal;