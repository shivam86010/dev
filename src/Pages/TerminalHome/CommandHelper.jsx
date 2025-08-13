import React, { useState } from 'react';
import Icon from '../../Components/AppIcon';

const CommandHelper = ({ isVisible, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const commandCategories = {
    basic: {
      title: 'Basic Commands',
      icon: 'Terminal',
      commands: [
        { cmd: 'help', desc: 'Show this help menu', example: 'help' },
        { cmd: 'clear', desc: 'Clear the terminal screen', example: 'clear' },
        { cmd: 'ls', desc: 'List directory contents', example: 'ls' },
        { cmd: 'pwd', desc: 'Print working directory', example: 'pwd' },
        { cmd: 'whoami', desc: 'Display current user info', example: 'whoami' }
      ]
    },
    navigation: {
      title: 'Navigation',
      icon: 'Navigation',
      commands: [
        { cmd: 'cd', desc: 'Change directory', example: 'cd projects' },
        { cmd: 'cd ..', desc: 'Go to parent directory', example: 'cd ..' },
        { cmd: 'cd ~', desc: 'Go to home directory', example: 'cd ~' },
        { cmd: 'tree', desc: 'Display directory tree', example: 'tree' }
      ]
    },
    portfolio: {
      title: 'Portfolio',
      icon: 'User',
      commands: [
        { cmd: 'cat resume.txt', desc: 'View resume summary', example: 'cat resume.txt' },
        { cmd: 'cat skills.json', desc: 'Display technical skills', example: 'cat skills.json' },
        { cmd: 'cat experience.md', desc: 'Show work experience', example: 'cat experience.md' },
        { cmd: 'projects --list', desc: 'List all projects', example: 'projects --list' }
      ]
    },
    interactive: {
      title: 'Interactive',
      icon: 'Zap',
      commands: [
        { cmd: 'story', desc: 'Launch interactive story mode', example: 'story' },
        { cmd: 'projects', desc: 'Open projects showcase', example: 'projects' },
        { cmd: 'chat', desc: 'Start AI assistant chat', example: 'chat' },
        { cmd: 'sudo hire-me', desc: 'Initiate contact process', example: 'sudo hire-me' }
      ]
    },
    system: {
      title: 'System',
      icon: 'Settings',
      commands: [
        { cmd: 'theme', desc: 'Change terminal theme', example: 'theme --dark' },
        { cmd: 'settings', desc: 'Open settings panel', example: 'settings' },
        { cmd: 'status', desc: 'Show system status', example: 'status' },
        { cmd: 'exit', desc: 'Exit terminal mode', example: 'exit' }
      ]
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-terminal z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-terminal terminal-modal w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            <h2 className="font-terminal text-lg text-primary">Terminal Command Reference</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex h-96">
          {/* Sidebar */}
          <div className="w-64 border-r border-border bg-muted/10">
            <div className="p-4">
              <h3 className="font-terminal text-sm text-muted mb-3">Categories</h3>
              <nav className="space-y-1">
                {Object.entries(commandCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-terminal text-left transition-colors ${
                      activeCategory === key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon name={category.icon} size={16} />
                    <span className="font-terminal text-sm">{category.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Icon name={commandCategories[activeCategory].icon} size={24} className="text-primary" />
                <h3 className="font-terminal text-xl text-primary">
                  {commandCategories[activeCategory].title}
                </h3>
              </div>

              <div className="space-y-4">
                {commandCategories[activeCategory].commands.map((command, index) => (
                  <div key={index} className="bg-background border border-border rounded-terminal p-4">
                    <div className="flex items-start justify-between mb-2">
                      <code className="font-terminal text-primary bg-muted/20 px-2 py-1 rounded text-sm">
                        {command.cmd}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(command.example)}
                        className="text-muted hover:text-primary transition-colors"
                        title="Copy to clipboard"
                      >
                        <Icon name="Copy" size={16} />
                      </button>
                    </div>
                    <p className="text-foreground text-sm mb-2">{command.desc}</p>
                    <div className="bg-muted/10 rounded px-3 py-2">
                      <span className="text-muted text-xs">Example:</span>
                      <code className="font-terminal text-primary text-sm ml-2">
                        $ {command.example}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-muted">
              <span className="flex items-center space-x-1">
                <Icon name="Keyboard" size={14} />
                <span>Tab for autocomplete</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="ArrowUp" size={14} />
                <span>History navigation</span>
              </span>
            </div>
            <div className="font-terminal text-primary">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandHelper; 