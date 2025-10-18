import React, { useState, useEffect } from 'react';

import Icon from '../../../Components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../Components/Ui/Button';

const ProjectCard = ({ project, onSelect, isSelected, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);

  useEffect(() => {
    if (project.images && project.images.length > 1 && isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, project.images]);

  const handleNarration = () => {
    setIsNarrating(!isNarrating);
    if ('speechSynthesis' in window) {
      if (isNarrating) {
        window.speechSynthesis.cancel();
      } else {
        const utterance = new SpeechSynthesisUtterance(project.narration);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'planning': return 'text-accent';
      default: return 'text-muted';
    }
  };

  if (viewMode === 'terminal') {
    return (
      <div 
        className={`bg-card border border-border rounded-terminal p-4 transition-all duration-300 cursor-pointer ${
          isSelected ? 'border-primary terminal-glow' : 'hover:border-muted'
        }`}
        onClick={() => onSelect(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Folder" size={16} className="text-primary" />
            <span className="font-terminal text-sm text-primary">{project.directory}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-code ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                handleNarration();
              }}
              iconName={isNarrating ? "VolumeX" : "Volume2"}
              iconSize={14}
              className="text-muted hover:text-primary"
            />
          </div>
        </div>

        <h3 className="font-terminal text-lg font-bold text-foreground mb-2">
          {project.name}
        </h3>

        <p className="font-code text-sm text-muted mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-muted/20 border border-muted/30 rounded text-xs font-code text-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-code text-muted">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-code text-muted">
          <div className="flex items-center space-x-4">
            <span>Lines: {project.metrics.lines}</span>
            <span>Commits: {project.metrics.commits}</span>
          </div>
          <span>{project.lastUpdated}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group bg-card border border-border rounded-terminal overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected ? 'border-primary terminal-glow' : 'hover:border-muted hover:shadow-lg'
      }`}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.images[currentImageIndex]}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              handleNarration();
            }}
            iconName={isNarrating ? "VolumeX" : "Volume2"}
            iconSize={14}
            className="bg-background/80 text-foreground hover:bg-background"
          />
          <span className={`px-2 py-1 rounded text-xs font-code bg-background/80 ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-terminal text-lg font-bold text-foreground mb-1">
            {project.name}
          </h3>
          <p className="font-code text-sm text-muted line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-muted/20 border border-muted/30 rounded text-xs font-code text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-code text-muted">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="GitBranch" size={12} />
              <span>{project.metrics.commits}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>{project.metrics.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{project.metrics.views}</span>
            </div>
          </div>
          <span>{project.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;