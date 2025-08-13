import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../Components/AppIcon';

const QuickActions = ({ onCommandExecute }) => {
  const navigate = useNavigate();

  const quickCommands = [
    {
      label: 'View Resume',
      command: 'cat resume.txt',
      icon: 'FileText',
      description: 'Quick overview of experience'
    },
    {
      label: 'List Projects',
      command: 'ls projects/',
      icon: 'FolderOpen',
      description: 'Browse project directory'
    },
    {
      label: 'Show Skills',
      command: 'cat skills.json',
      icon: 'Code2',
      description: 'Technical capabilities'
    },
    {
      label: 'Contact Me',
      command: 'sudo hire-me',
      icon: 'Mail',
      description: 'Initiate hiring process'
    }
  ];

  const navigationActions = [
    {
      label: 'Story Mode',
      path: '/interactive-story-mode',
      icon: 'BookOpen',
      description: 'Interactive journey'
    },
    {
      label: 'Projects Lab',
      path: '/projects-lab-showcase',
      icon: 'Beaker',
      description: 'Project showcase'
    },
    {
      label: 'AI Assistant',
      path: '/ai-assistant-chat-interface',
      icon: 'Bot',
      description: 'Chat with AI'
    },
    {
      label: 'Settings',
      path: '/settings-customization-hub',
      icon: 'Settings',
      description: 'Customize experience'
    }
  ];

  const handleQuickCommand = (command) => {
    onCommandExecute(command);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Quick Commands */}
      <div>
        <h3 className="font-terminal text-primary text-lg mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Quick Commands</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickCommands.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickCommand(item.command)}
              className="group bg-card border border-border rounded-terminal p-4 text-left hover:bg-muted/20 hover:border-primary/50 transition-all duration-200 terminal-glow"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-terminal flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={item.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-terminal text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted mt-1">{item.description}</div>
                  <code className="font-code text-xs text-primary/70 mt-2 block">
                    $ {item.command}
                  </code>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Actions */}
      <div>
        <h3 className="font-terminal text-primary text-lg mb-4 flex items-center space-x-2">
          <Icon name="Navigation" size={20} />
          <span>Explore Sections</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {navigationActions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="group bg-card border border-border rounded-terminal p-4 text-left hover:bg-muted/20 hover:border-accent/50 transition-all duration-200 terminal-glow-cyan"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-terminal flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon name={item.icon} size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-terminal text-sm text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted mt-1">{item.description}</div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="ArrowRight" size={12} className="text-accent/70" />
                    <span className="font-code text-xs text-accent/70">Navigate</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border border-border rounded-terminal p-4">
        <h4 className="font-terminal text-primary text-sm mb-3 flex items-center space-x-2">
          <Icon name="Activity" size={16} />
          <span>System Status</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-success font-terminal">●</div>
            <div className="text-muted mt-1">Online</div>
          </div>
          <div className="text-center">
            <div className="text-primary font-terminal">98%</div>
            <div className="text-muted mt-1">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-terminal">2.1s</div>
            <div className="text-muted mt-1">Response</div>
          </div>
          <div className="text-center">
            <div className="text-warning font-terminal">24/7</div>
            <div className="text-muted mt-1">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;