import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../Components/AppIcon';
import Image from '../../Components/AppImage';
import Button from '../../Components/Ui/Button';

const StoryPanel = ({ 
  panel, 
  index, 
  isActive, 
  onTechClick, 
  onProjectClick,
  enableParallax = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { threshold: 0.3 });

  const handleTechClick = (tech) => {
    onTechClick?.(tech);
  };

  const handleProjectClick = (project) => {
    onProjectClick?.(project);
  };

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  return (
    <motion.div
      ref={panelRef}
      className={`relative min-h-screen flex items-center justify-center p-4 sm:p-8 ${
        index % 2 === 0 ? 'bg-background' : 'bg-card'
      }`}
      variants={panelVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
        }`}>
          
          {/* Content Section */}
          <motion.div 
            className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
            variants={contentVariants}
          >
            {/* Timeline Badge */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full terminal-glow" />
              <span className="font-terminal text-sm text-primary">
                {panel.year} - Chapter {index + 1}
              </span>
            </div>

            {/* Title */}
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              {panel.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-muted font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              {panel.subtitle}
            </motion.p>

            {/* Description */}
            <motion.div 
              className="prose prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-foreground leading-relaxed text-base sm:text-lg">
                {panel.description}
              </p>
            </motion.div>

            {/* Code Snippet */}
            {panel.codeSnippet && (
              <motion.div 
                className="bg-github-dark border border-border rounded-terminal p-4 font-code text-sm overflow-x-auto terminal-window"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted text-xs">~/career/{panel.year}</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-error rounded-full" />
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <div className="w-2 h-2 bg-success rounded-full" />
                  </div>
                </div>
                <pre className="text-primary whitespace-pre-wrap">
                  <code>{panel.codeSnippet}</code>
                </pre>
              </motion.div>
            )}

            {/* Technologies */}
            {panel.technologies && panel.technologies.length > 0 && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="font-terminal text-primary text-sm uppercase tracking-wide">
                  Technologies Mastered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {panel.technologies.map((tech, techIndex) => (
                    <Button
                      key={techIndex}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTechClick(tech)}
                      className="font-code text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      {tech.name}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Key Projects */}
            {panel.keyProjects && panel.keyProjects.length > 0 && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-terminal text-primary text-sm uppercase tracking-wide">
                  Key Projects
                </h4>
                <div className="space-y-2">
                  {panel.keyProjects.map((project, projectIndex) => (
                    <Button
                      key={projectIndex}
                      variant="ghost"
                      onClick={() => handleProjectClick(project)}
                      className="w-full justify-start p-3 h-auto hover:bg-card border border-transparent hover:border-border transition-all duration-200"
                    >
                      <div className="text-left">
                        <div className="font-medium text-foreground">{project.name}</div>
                        <div className="text-sm text-muted">{project.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {panel.achievements && panel.achievements.length > 0 && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9 }}
              >
                <h4 className="font-terminal text-primary text-sm uppercase tracking-wide">
                  Achievements Unlocked
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {panel.achievements.map((achievement, achIndex) => (
                    <div 
                      key={achIndex}
                      className="flex items-center space-x-2 p-2 bg-card/50 rounded-terminal border border-border/50"
                    >
                      <Icon name="Trophy" size={16} className="text-warning" />
                      <span className="text-sm text-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.0 }}
            >
              <Button
                variant="default"
                onClick={() => setShowDetails(!showDetails)}
                iconName={showDetails ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
              
              {panel.ctaButton && (
                <Button
                  variant="outline"
                  onClick={panel.ctaButton.action}
                  iconName={panel.ctaButton.icon}
                  iconPosition="right"
                >
                  {panel.ctaButton.text}
                </Button>
              )}
            </motion.div>

            {/* Expanded Details */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card/30 border border-border rounded-terminal p-4 space-y-3"
              >
                <h5 className="font-terminal text-primary text-sm">Additional Details</h5>
                <p className="text-sm text-muted leading-relaxed">
                  {panel.expandedDetails || `During this phase of my journey, I focused on mastering the fundamentals and building a strong foundation. The challenges were significant, but each obstacle became a stepping stone to greater understanding and capability.`}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
            variants={imageVariants}
          >
            <div className="relative group">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-terminal border border-border terminal-window">
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />
                
                {/* Hover Content */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-background/90 backdrop-blur-sm border border-border rounded-terminal p-3">
                      <p className="text-sm text-foreground font-medium">
                        {panel.imageCaption || "A pivotal moment in the journey"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full blur-sm" />
            </div>

            {/* Stats or Metrics */}
            {panel.metrics && (
              <motion.div 
                className="mt-6 grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.1 }}
              >
                {panel.metrics.map((metric, metricIndex) => (
                  <div 
                    key={metricIndex}
                    className="bg-card border border-border rounded-terminal p-3 text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{metric.value}</div>
                    <div className="text-xs text-muted font-terminal">{metric.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Panel Number */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center">
        <span className="font-terminal text-primary font-bold">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
};

export default StoryPanel;