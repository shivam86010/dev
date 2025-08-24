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
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const storyPanels = [
    {
      id:1,
      year : "2020",
      title : "The Beginning",
      subtitle : "First Steps into Development",
      description : `My journey began with curiosity and a simple "Hello World" program. What started as a fascination with how websites work quickly evolved into a passion for creating digital experiences. The first lines of code I wrote were clunky, but they sparked that would define my career path.`,

    }
  ]

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleTextToSpeech = () => {
    
  }

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

  const handleNavigateToProjects = () => {
    navigate('/projects-lab-showcase');
  };

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