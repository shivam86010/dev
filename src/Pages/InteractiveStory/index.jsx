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
      
    </div>
  );
};

export default InteractiveStoryMode;