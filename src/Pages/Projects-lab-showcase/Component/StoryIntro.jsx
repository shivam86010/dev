import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../Components/AppIcon';
import Button from '../../../Components/Ui/Button';

const StoryIntro = ({ onStart, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const introSteps = [
    {
      title: "Welcome to My Journey",
      content: `$ cat story.md\n\nInitializing interactive story mode...\nLoading professional journey data...\n\n✓ Career milestones loaded\n✓ Project archives accessed\n✓ Skill progression mapped\n\nReady to begin narrative experience.`,
      icon: "Terminal"
    },
    {
      title: "Navigation Guide",
      content: `$ help --navigation\n\nAvailable controls:\n• Arrow keys or swipe to navigate\n• Space bar to toggle auto-play\n• Click technologies for details\n• Tap projects for deep dive\n• ESC to exit modals\n\nOptimized for all devices and accessibility.`,
      icon: "Navigation"
    },
    {
      title: "Interactive Features",
      content: `$ ls features/\n\ninteractive-panels/\ntech-deep-dives/\nproject-showcases/\ncode-examples/\naccessibility-tools/\ngesture-controls/\n\nEach chapter contains clickable elements\nfor deeper exploration of my journey.`,
      icon: "MousePointer"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsTyping(true);
    } else {
      onStart();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsTyping(true);
    }
  };

  const currentStepData = introSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* ASCII Art Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <pre className="font-terminal text-primary text-xs sm:text-sm leading-tight">
{`
    ███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗    ███╗   ███╗ ██████╗ ██████╗ ███████╗
    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ████╗ ████║██╔═══██╗██╔══██╗██╔════╝
    ███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝     ██╔████╔██║██║   ██║██║  ██║█████╗  
    ╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝      ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  
    ███████║   ██║   ╚██████╔╝██║  ██║   ██║       ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗
    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
`}
          </pre>
          <motion.p 
            className="text-muted font-code text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            An Interactive Journey Through Professional Growth
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-terminal terminal-window overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-error rounded-full" />
                <div className="w-3 h-3 bg-warning rounded-full" />
                <div className="w-3 h-3 bg-success rounded-full" />
              </div>
              <span className="font-terminal text-sm text-muted">story-intro.sh</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted font-code">
              <span>Step {currentStep + 1} of {introSteps.length}</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Step Header */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-terminal flex items-center justify-center">
                  <Icon name={currentStepData.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{currentStepData.title}</h2>
                  <p className="text-sm text-muted">Interactive Story Mode</p>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="bg-github-dark border border-border rounded-terminal p-6 font-code text-sm">
                <motion.pre 
                  className="text-primary whitespace-pre-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentStepData.content}
                </motion.pre>
                
                {isTyping && (
                  <motion.span
                    className="text-primary cursor-blink"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                )}
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center space-x-2">
                {introSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentStep
                        ? 'bg-primary w-8'
                        : index < currentStep
                        ? 'bg-primary/60' :'bg-border'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-background/30">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted font-code">
              <Icon name="Info" size={14} />
              <span>Use arrow keys to navigate</span>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSkip}
              >
                Skip Intro
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleNext}
                iconName={currentStep === introSteps.length - 1 ? "Play" : "ChevronRight"}
                iconPosition="right"
              >
                {currentStep === introSteps.length - 1 ? "Start Story" : "Next"}
              </Button>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-xs text-muted font-code bg-card/50 border border-border rounded-terminal px-4 py-2">
            <span>← → Navigate</span>
            <span>Enter Continue</span>
            <span>Esc Skip</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryIntro;