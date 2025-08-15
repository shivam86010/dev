import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../Components/AppIcon';

const TerminalWindow = ({ onCommandExecute, currentDirectory, commandHistory }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      onCommandExecute(currentCommand.trim());
      setCurrentCommand('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for common commands
      const commands = ['help', 'ls', 'cd', 'cat', 'clear', 'whoami', 'pwd', 'sudo'];
      const matches = commands.filter(cmd => cmd.startsWith(currentCommand));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-background border border-border rounded-terminal terminal-window h-96 flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-error"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        <div className="font-terminal text-sm text-muted">shivam@portfolio:~$</div>
        <div className="flex items-center space-x-2">
          <Icon name="Minimize2" size={14} className="text-muted hover:text-foreground cursor-pointer" />
          <Icon name="Square" size={14} className="text-muted hover:text-foreground cursor-pointer" />
          <Icon name="X" size={14} className="text-muted hover:text-foreground cursor-pointer" />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-terminal text-sm scan-lines"
        onClick={focusInput}
      >
        {/* Command History */}
        {commandHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center space-x-2 text-primary">
              <span>shivam@portfolio:{currentDirectory}$</span>
              <span className="text-foreground">{entry.command}</span>
            </div>
            <div className="mt-1 whitespace-pre-wrap text-foreground">
              {entry.output}
            </div>
          </div>
        ))}

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className="text-primary">shivam@portfolio:{currentDirectory}$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none font-terminal"
            placeholder=""
            autoFocus
          />
          <span className={`text-primary ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            _
          </span>
        </form>
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-card border-t border-border">
        <div className="flex items-center justify-between text-xs font-code text-muted">
          <div className="flex items-center space-x-4">
            <span className="text-success">●</span>
            <span>Connected</span>
            <span>Type 'help' for commands</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Lines: {commandHistory.length}</span>
            <span>Cols: 80</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;