import React, { useState, useEffect, useRef } from 'react';

import Button from '../../../components/ui/Button';

const TerminalInterface = ({ projects, onProjectSelect, onViewModeChange }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~/projects');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      usage: 'help [command]'
    },
    ls: {
      description: 'List projects in current directory',
      usage: 'ls [-l] [-a]'
    },
    cd: {
      description: 'Change directory or open project',
      usage: 'cd <project-name>'
    },
    cat: {
      description: 'Display project information',
      usage: 'cat <project-name>'
    },
    tree: {
      description: 'Display project structure',
      usage: 'tree [project-name]'
    },
    grep: {
      description: 'Search projects by technology',
      usage: 'grep <technology>'
    },
    pwd: {
      description: 'Print current directory',
      usage: 'pwd'
    },
    clear: {
      description: 'Clear terminal screen',
      usage: 'clear'
    },
    exit: {
      description: 'Exit terminal mode',
      usage: 'exit'
    }
  };

  useEffect(() => {
    const welcomeMessage = [
      "Welcome to Shivam\'s Project Lab Terminal",
      "Type \'help\' to see available commands",
      "Use \'ls\' to list all projects",
      ""
    ];
    
    setHistory(welcomeMessage.map(msg => ({ type: 'output', content: msg })));
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async (command) => {
    const [cmd, ...args] = command.trim().split(' ');
    const arg = args.join(' ');

    setHistory(prev => [...prev, { type: 'input', content: `${currentPath}$ ${command}` }]);

    switch (cmd.toLowerCase()) {
      case 'help':
        if (arg) {
          const cmdInfo = commands[arg];
          if (cmdInfo) {
            addOutput([
              `${arg} - ${cmdInfo.description}`,
              `Usage: ${cmdInfo.usage}`
            ]);
          } else {
            addOutput([`Command '${arg}' not found. Type 'help' for available commands.`]);
          }
        } else {
          const helpText = [
            "Available commands:",
            "",
            ...Object.entries(commands).map(([cmd, info]) => 
              `  ${cmd.padEnd(8)} - ${info.description}`
            ),
            "",
            "Use 'help <command>' for detailed usage information."
          ];
          addOutput(helpText);
        }
        break;

      case 'ls':
        const isDetailed = args.includes('-l');
        if (isDetailed) {
          const projectList = projects.map(project => 
            `drwxr-xr-x  ${project.metrics.files.toString().padStart(3)}  shivam  staff  ${project.metrics.lines.toString().padStart(6)}  ${project.lastUpdated}  ${project.directory}`
          );
          addOutput([
            "total " + projects.length,
            ...projectList
          ]);
        } else {
          const projectNames = projects.map(p => p.directory).join('  ');
          addOutput([projectNames]);
        }
        break;

      case 'cd':
        if (!arg) {
          addOutput(["Usage: cd <project-name>"]);
        } else if (arg === '..') {
          setCurrentPath('~/projects');
          addOutput([]);
        } else {
          const project = projects.find(p => 
            p.directory.toLowerCase() === arg.toLowerCase() || 
            p.name.toLowerCase().includes(arg.toLowerCase())
          );
          if (project) {
            onProjectSelect(project);
            addOutput([`Opening ${project.name}...`]);
          } else {
            addOutput([`cd: ${arg}: No such project`]);
          }
        }
        break;

      case 'cat':
        if (!arg) {
          addOutput(["Usage: cat <project-name>"]);
        } else {
          const project = projects.find(p => 
            p.directory.toLowerCase() === arg.toLowerCase() || 
            p.name.toLowerCase().includes(arg.toLowerCase())
          );
          if (project) {
            addOutput([
              `# ${project.name}`,
              "",
              project.description,
              "",
              `Status: ${project.status}`,
              `Technologies: ${project.technologies.join(', ')}`,
              `Last Updated: ${project.lastUpdated}`,
              `Lines of Code: ${project.metrics.lines}`,
              `Commits: ${project.metrics.commits}`,
              ""
            ]);
          } else {
            addOutput([`cat: ${arg}: No such project`]);
          }
        }
        break;

      case 'tree':
        if (arg) {
          const project = projects.find(p => 
            p.directory.toLowerCase() === arg.toLowerCase()
          );
          if (project) {
            addOutput([
              project.directory + "/",
              "├── src/",
              "│   ├── components/",
              "│   ├── pages/",
              "│   ├── hooks/",
              "│   └── utils/",
              "├── public/",
              "├── package.json",
              "├── README.md",
              "└── .gitignore"
            ]);
          } else {
            addOutput([`tree: ${arg}: No such project`]);
          }
        } else {
          const treeOutput = [
            "projects/",
            ...projects.map((project, index) => {
              const isLast = index === projects.length - 1;
              return `${isLast ? '└──' : '├──'} ${project.directory}/`;
            })
          ];
          addOutput(treeOutput);
        }
        break;

      case 'grep':
        if (!arg) {
          addOutput(["Usage: grep <technology>"]);
        } else {
          const matchingProjects = projects.filter(project =>
            project.technologies.some(tech => 
              tech.toLowerCase().includes(arg.toLowerCase())
            )
          );
          if (matchingProjects.length > 0) {
            const results = matchingProjects.map(project =>
              `${project.directory}: ${project.technologies.filter(tech => 
                tech.toLowerCase().includes(arg.toLowerCase())
              ).join(', ')}`
            );
            addOutput(results);
          } else {
            addOutput([`No projects found using '${arg}'`]);
          }
        }
        break;

      case 'pwd':
        addOutput([currentPath]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
        onViewModeChange('grid');
        addOutput(["Switching to grid view..."]);
        break;

      default:
        if (command.trim()) {
          addOutput([`Command '${cmd}' not found. Type 'help' for available commands.`]);
        }
        break;
    }
  };

  const addOutput = (lines) => {
    setIsTyping(true);
    setTimeout(() => {
      setHistory(prev => [
        ...prev,
        ...lines.map(line => ({ type: 'output', content: line }))
      ]);
      setIsTyping(false);
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    }
  };

  return (
    <div className="bg-terminal-black border border-border rounded-terminal h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-error rounded-full" />
            <div className="w-3 h-3 bg-warning rounded-full" />
            <div className="w-3 h-3 bg-success rounded-full" />
          </div>
          <span className="font-terminal text-sm text-foreground">
            Terminal - Projects Lab
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            iconSize={14}
            className="text-muted hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setHistory([])}
            iconName="RotateCcw"
            iconSize={14}
            className="text-muted hover:text-foreground"
          />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-terminal text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className={`mb-1 ${
            entry.type === 'input' ? 'text-primary' : 'text-foreground'
          }`}>
            {entry.content}
          </div>
        ))}
        
        {isTyping && (
          <div className="text-primary">
            <span className="cursor-blink">_</span>
          </div>
        )}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-primary mr-2">
            {currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none font-terminal"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="text-primary cursor-blink ml-1">_</span>
        </form>
      </div>

      {/* Quick Commands */}
      <div className="px-4 py-2 border-t border-border bg-card/50">
        <div className="flex flex-wrap gap-2">
          {['help', 'ls -l', 'tree', 'clear'].map((cmd) => (
            <Button
              key={cmd}
              variant="ghost"
              size="xs"
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              className="text-xs font-terminal text-muted hover:text-foreground"
            >
              {cmd}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;