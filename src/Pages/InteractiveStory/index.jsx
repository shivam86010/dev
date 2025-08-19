import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StoryIntro from '../../Pages/InteractiveStory/StoryIntro'
const InteractiveStoryMode = () => {
  const [showIntro, setShowIntro] = useState(true);
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
      
    </div>
  );
};

export default InteractiveStoryMode;