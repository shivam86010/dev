import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StoryIntro from '../../Pages/InteractiveStory/StoryIntro'
import StoryPanel from '../../Pages/InteractiveStory/StoryPanel'
import Button from '../../Components/Ui/Button'
const InteractiveStoryMode = () => {
  const [showIntro, setShowIntro] = useState(true);
  
  const storyPanels = [
    {
      id:1,
      year : "2020",
      title : "The Beginning",
      subtitle : "First Steps into Development",
      description : `My journey began with curiosity and a simple "Hello World" program. What started as a fascination with how websites work quickly evolved into a passion for creating digital experiences. The first lines of code I wrote were clunky, but they sparked that would define my career path.`,

    }
  ]

  const toggleTextToSpeech = () => {
    
  }

  const handleStartStory = () => {
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
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
      
    </div>
  );
};

export default InteractiveStoryMode;