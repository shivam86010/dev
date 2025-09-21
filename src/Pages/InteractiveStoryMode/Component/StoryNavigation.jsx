import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../Components/Ui/Button';

const StoryNavigation = ({ 
  currentPanel, 
  totalPanels, 
  onNavigate, 
  onToggleAutoPlay,
  isAutoPlaying = false,
  autoPlaySpeed = 5000 
}) => {
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowControls(true);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);

  useEffect(() => {
    const hideTimer = setInterval(() => {
      if (Date.now() - lastActivity > 3000) {
        setShowControls(false);
      }
    }, 1000);

    return () => clearInterval(hideTimer);
  }, [lastActivity]);

  useEffect(() => {
    setProgress(((currentPanel + 1) / totalPanels) * 100);
  }, [currentPanel, totalPanels]);

  useEffect(() => {
    let autoPlayTimer;
    if (isAutoPlaying) {
      autoPlayTimer = setInterval(() => {
        if (currentPanel < totalPanels - 1) {
          onNavigate(currentPanel + 1);
        } else {
          onToggleAutoPlay(false);
        }
      }, autoPlaySpeed);
    }

    return () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    };
  }, [isAutoPlaying, currentPanel, totalPanels, autoPlaySpeed, onNavigate, onToggleAutoPlay]);

  const handlePrevious = () => {
    if (currentPanel > 0) {
      onNavigate(currentPanel - 1);
    }
  };

  const handleNext = () => {
    if (currentPanel < totalPanels - 1) {
      onNavigate(currentPanel + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === ' ') {
      e.preventDefault();
      onToggleAutoPlay(!isAutoPlaying);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPanel, isAutoPlaying]);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-card/50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Navigation Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-card/95 backdrop-blur-terminal border border-border rounded-terminal p-4 terminal-window">
              <div className="flex items-center space-x-4">
                {/* Previous Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPanel === 0}
                  iconName="ChevronLeft"
                  className="w-10 h-10 p-0"
                />

                {/* Panel Indicators */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPanels }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentPanel
                          ? 'bg-primary w-6'
                          : index < currentPanel
                          ? 'bg-primary/60' :'bg-border hover:bg-muted'
                      }`}
                      aria-label={`Go to panel ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPanel === totalPanels - 1}
                  iconName="ChevronRight"
                  className="w-10 h-10 p-0"
                />

                {/* Divider */}
                <div className="w-px h-6 bg-border" />

                {/* Auto Play Toggle */}
                <Button
                  variant={isAutoPlaying ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onToggleAutoPlay(!isAutoPlaying)}
                  iconName={isAutoPlaying ? "Pause" : "Play"}
                  className="w-10 h-10 p-0"
                />

                {/* Panel Counter */}
                <div className="font-terminal text-sm text-muted min-w-[4rem] text-center">
                  {String(currentPanel + 1).padStart(2, '0')} / {String(totalPanels).padStart(2, '0')}
                </div>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center justify-center space-x-4 text-xs text-muted font-code">
                  <span>← → Navigate</span>
                  <span>Space Auto-play</span>
                  <span>Mouse Hide controls</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Navigation (Desktop) */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="space-y-2">
          {Array.from({ length: totalPanels }, (_, index) => (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`block w-3 h-8 rounded-full transition-all duration-200 ${
                index === currentPanel
                  ? 'bg-primary terminal-glow'
                  : index < currentPanel
                  ? 'bg-primary/40' :'bg-border hover:bg-muted'
              }`}
              aria-label={`Go to chapter ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Touch Gesture Areas (Mobile) */}
      <div className="lg:hidden">
        {/* Left Touch Area */}
        <button
          className="fixed left-0 top-0 bottom-0 w-16 z-30 opacity-0"
          onClick={handlePrevious}
          disabled={currentPanel === 0}
          aria-label="Previous panel"
        />
        
        {/* Right Touch Area */}
        <button
          className="fixed right-0 top-0 bottom-0 w-16 z-30 opacity-0"
          onClick={handleNext}
          disabled={currentPanel === totalPanels - 1}
          aria-label="Next panel"
        />
      </div>
    </>
  );
};

export default StoryNavigation;