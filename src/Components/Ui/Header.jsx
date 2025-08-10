import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTerminalMode, setIsTerminalMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { path: '/terminal-homepage', label: 'Home', command: 'cd ~', icon: 'Home' },
    { path: '/interactive-story-mode', label: 'Story', command: './story.sh', icon: 'BookOpen' },
    { path: '/projects-lab-showcase', label: 'Projects', command: 'ls projects/', icon: 'Code2' },
    { path: '/ai-assistant-chat-interface', label: 'AI Chat', command: 'chat --ai', icon: 'MessageSquare' }
  ];

  const moreMenuItems = [
    { path: '/settings-customization-hub', label: 'Settings', command: 'sudo config', icon: 'Settings' },
    { path: '/web3-integration-zone', label: 'Web3', command: './web3.sh', icon: 'Coins' }
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const handleTerminalCommand = (command) => {
    console.log(`Executing: ${command}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-terminal border-b border-border terminal-window">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/terminal-homepage" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              onClick={closeMenu}
            >
              <div className="w-8 h-8 bg-primary rounded-terminal flex items-center justify-center terminal-glow">
                <span className="font-terminal text-primary-foreground text-sm font-bold">$</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-terminal text-lg font-bold text-primary brand-text-gradient">
                  Terminal Portfolio
                </h1>
                <div className="font-system text-xs text-muted">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative px-4 py-2 rounded-terminal transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground terminal-glow'
                    : 'text-foreground hover:bg-card hover:text-primary'
                }`}
                onClick={() => handleTerminalCommand(item.command)}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={16} />
                  <span className="font-terminal text-sm">{item.label}</span>
                </div>
                {isTerminalMode && (
                  <div className="absolute -bottom-6 left-0 right-0 text-xs font-code text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.command}
                  </div>
                )}
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary"
                iconName="MoreHorizontal"
                iconSize={16}
              >
                More
              </Button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-terminal terminal-window opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors ${
                      isActiveRoute(item.path) ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span className="font-terminal">{item.label}</span>
                    {isTerminalMode && (
                      <span className="ml-auto font-code text-xs text-muted">{item.command}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Terminal Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Terminal Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTerminalMode(!isTerminalMode)}
              className="hidden sm:flex text-foreground hover:text-primary"
              iconName={isTerminalMode ? 'Terminal' : 'Monitor'}
              iconSize={16}
            >
              <span className="font-terminal text-xs">
                {isTerminalMode ? 'CLI' : 'GUI'}
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden text-foreground hover:text-primary"
              iconName={isMenuOpen ? 'X' : 'Menu'}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-terminal">
            <nav className="py-4 space-y-2">
              {[...navigationItems, ...moreMenuItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-terminal transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground terminal-glow'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={() => {
                    handleTerminalCommand(item.command);
                    closeMenu();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item.icon} size={18} />
                    <span className="font-terminal">{item.label}</span>
                  </div>
                  {isTerminalMode && (
                    <span className="font-code text-xs text-muted">{item.command}</span>
                  )}
                </Link>
              ))}
              
              {/* Mobile Terminal Toggle */}
              <div className="px-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTerminalMode(!isTerminalMode)}
                  className="w-full justify-between"
                  iconName={isTerminalMode ? 'Terminal' : 'Monitor'}
                  iconSize={16}
                >
                  <span className="font-terminal">
                    {isTerminalMode ? 'Terminal Mode' : 'GUI Mode'}
                  </span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Terminal Status Bar */}
      {isTerminalMode && (
        <div className="hidden sm:block bg-card border-t border-border px-4 py-1">
          <div className="flex items-center justify-between text-xs font-code">
            <div className="flex items-center space-x-4">
              <span className="text-success">●</span>
              <span className="text-muted">shivam@portfolio:~$</span>
              <span className="text-primary cursor-blink">_</span>
            </div>
            <div className="flex items-center space-x-4 text-muted">
              <span>CPU: 12%</span>
              <span>MEM: 2.1GB</span>
              <span>NET: ↑24KB/s ↓156KB/s</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;