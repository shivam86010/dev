import React, { useState, useEffect } from 'react';

const ASCIIArt = ({ isVisible = true }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const asciiArt = [
    "   ███████╗██╗  ██╗██╗██╗   ██╗ █████╗ ███╗   ███╗ ",
    "   ██╔════╝██║  ██║██║██║   ██║██╔══██╗████╗ ████║",
    "   ███████╗███████║██║██║   ██║███████║██╔████╔██║",
    "   ╚════██║██╔══██║██║╚██╗ ██╔╝██╔══██║██║╚██╔╝██║",
    "   ███████║██║  ██║██║ ╚████╔╝ ██║  ██║██║ ╚═╝ ██║",
    "   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝     ╚═╝",
    "",
    "                    ██████╗ ███████╗██╗   ██╗",
    "                    ██╔══██╗██╔════╝██║   ██║",
    "                    ██║  ██║█████╗  ██║   ██║",
    "                    ██║  ██║██╔══╝  ╚██╗ ██╔╝",
    "                    ██████╔╝███████╗ ╚████╔╝ ",
    "                    ╚═════╝ ╚══════╝  ╚═══╝  ",
    "",
    "╔══════════════════════════════════════════════════════════════════╗",
    "║          Frontend Developer Portfolio                            ║", 
    "║              React • Redux • Rechart • Tailwind CSS              ║", 
    "╚══════════════════════════════════════════════════════════════════╝"

  ];

  const welcomeText = [
    "",
    "Welcome to Shivam \'s Digital Workspace...",
    "",
    "System initialized successfully ✓",
    "Loading portfolio modules ✓",
    "Establishing secure connection ✓",
    "",
    "Type \'help\' to see available commands",
    "Type \'ls\' to explore directories",
    "Type \'cat resume.txt\' for quick overview",
    ""
  ];

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true);
      setDisplayedLines([]);
      setCurrentLineIndex(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isAnimating && currentLineIndex < asciiArt.length + welcomeText.length) {
      const timer = setTimeout(() => {
        if (currentLineIndex < asciiArt.length) {
          setDisplayedLines(prev => [...prev, asciiArt[currentLineIndex]]);
        } else {
          const welcomeIndex = currentLineIndex - asciiArt.length;
          setDisplayedLines(prev => [...prev, welcomeText[welcomeIndex]]);
        }
        setCurrentLineIndex(prev => prev + 1);
      }, currentLineIndex < asciiArt.length ? 100 : 200);

      return () => clearTimeout(timer);
    } else if (currentLineIndex >= asciiArt.length + welcomeText.length) {
      setIsAnimating(false);
    }
  }, [currentLineIndex, isAnimating]);

  if (!isVisible) return null;

  return (
    <div className="font-terminal text-primary leading-tight">
      <pre className="text-xs sm:text-sm lg:text-base whitespace-pre overflow-x-auto">
        {displayedLines.map((line, index) => (
          <div 
            key={index} 
            className={`${
              index >= asciiArt.length 
                ? 'text-foreground animate-pulse' 
                : 'text-primary terminal-glow'
            }`}
          >
            {line}
          </div>
        ))}
        {isAnimating && (
          <span className="text-primary cursor-blink">█</span>
        )}
      </pre>
    </div>
  );
};

export default ASCIIArt;