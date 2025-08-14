import React, { useState,} from 'react';
import Header from '../../Components/Ui/Header';
import Icon from '../../Components/AppIcon';
import ASCIIArt from './ASCIIArt';
import CommandHelper from './CommandHelper'
import QuickActions from './QuickActions'
import SystemInfo from './SystemInfo'
const TerminalHomepage = () => {
  const [showASCII, setShowASCII] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

 const executeCommand = (command) => {
    const args = command.toLowerCase().split(' ');
    const cmd = args[0];
    
    switch (cmd) {
      case 'help':
        setShowHelp(true);
        addToHistory(command, 'Opening command reference...');
        break;

      case 'clear':
        setCommandHistory([]);
        break;

      case 'ls':
        const currentDir = fileSystem[currentDirectory];
        if (currentDir && currentDir.type === 'directory') {
          const contents = currentDir.contents.join('  ');
          addToHistory(command, contents);
        } else {
          addToHistory(command, 'Directory not found');
        }
        break;

      case 'pwd':
        addToHistory(command, `/home/shivam/${currentDirectory}`);
        break;

      case 'whoami':
        addToHistory(command, `shivam - Full Stack Developer
Portfolio: https://shivam.dev
Status: Available for opportunities
Location: Digital workspace`);
        break;

      case 'cd':
        if (args[1]) {
          const targetDir = args[1];
          if (targetDir === '..') {
            setCurrentDirectory('~');
            addToHistory(command, 'Changed to parent directory');
          } else if (targetDir === '~') {
            setCurrentDirectory('~');
            addToHistory(command, 'Changed to home directory');
          } else if (fileSystem[targetDir]) {
            setCurrentDirectory(targetDir);
            addToHistory(command, `Changed directory to ${targetDir}`);
          } else {
            addToHistory(command, `Directory '${targetDir}' not found`);
          }
        } else {
          addToHistory(command, 'Usage: cd <directory>');
        }
        break;

      case 'cat':
        if (args[1]) {
          const fileName = args[1];
          const file = fileSystem[fileName];
          if (file && file.type === 'file') {
            addToHistory(command, file.content);
          } else {
            addToHistory(command, `File '${fileName}' not found`);
          }
        } else {
          addToHistory(command, 'Usage: cat <filename>');
        }
        break;

      case 'tree':
        addToHistory(command, `~/
├── projects/
│   ├── web-apps/
│   ├── mobile-apps/
│   ├── ai-projects/
│   └── blockchain/
├── skills.json
├── resume.txt
├── experience.md
└── contact.txt`);
        break;

      case 'story': addToHistory(command,'Launching interactive story mode...');
        setTimeout(() => navigate('/interactive-story-mode'), 1000);
        break;

      case 'projects':
        if (args[1] === '--list') {
          addToHistory(command, `Available Projects:
• E-commerce Platform - React, Node.js, MongoDB
• Task Management App - React Native, Firebase
• AI Chatbot - Python, TensorFlow, NLP
• DeFi Dashboard - React, Web3.js, Ethereum
• Real-time Chat - Socket.io, Express, Redis

Use 'cd projects' to explore or visit /projects-lab-showcase`);
        } else {
          addToHistory(command, 'Opening projects showcase...');
          setTimeout(() => navigate('/projects-lab-showcase'), 1000);
        }
        break;

      case 'chat': addToHistory(command,'Initializing AI assistant...');
        setTimeout(() => navigate('/ai-assistant-chat-interface'), 1000);
        break;

      case 'settings': addToHistory(command,'Opening settings panel...');
        setTimeout(() => navigate('/settings-customization-hub'), 1000);
        break;

      case 'sudo':
        if (args[1] === 'hire-me') {
          addToHistory(command, `Initiating secure hiring protocol...
Authentication required: Please provide your details
Establishing encrypted connection...
Redirecting to contact interface...`);
          setTimeout(() => {
            window.open('mailto:shivam.dev@portfolio.com?subject=Hiring Inquiry&body=Hi Shivam, I found your terminal portfolio and would like to discuss opportunities.', '_blank');
          }, 2000);
        } else {
          addToHistory(command, 'Permission denied. Available sudo commands: hire-me');
        }
        break;

      case 'theme':
        if (args[1] === '--dark') {
          addToHistory(command, 'Dark theme already active');
        } else if (args[1] === '--light') {
          addToHistory(command, 'Light theme not available in terminal mode');
        } else {
          addToHistory(command, 'Usage: theme --dark | --light');
        }
        break;

      case 'status':
        addToHistory(command, `System Status:
• Server: Online ✓
• Response Time: 1.2ms
• Uptime: 99.9%
• Last Deploy: 2 hours ago
• Active Users: 42
• Memory Usage: 2.1GB / 8GB
• CPU Usage: 12%`);
        break;

      case 'exit': addToHistory(command,'Switching to GUI mode...');
        setTimeout(() => {
          setShowASCII(false);
        }, 1000);
        break;

      default:
        addToHistory(command, `Command '${command}' not found. Type 'help' for available commands.`);
    }
  };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <div className="font-terminal text-primary">Initializing Terminal...</div>
//           <div className="font-code text-muted text-sm mt-2">Loading portfolio modules</div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Main Terminal Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* ASCII Art Welcome */}
              {showASCII && (
                <div className="bg-card border border-border rounded-terminal p-6 terminal-window">
                  <ASCIIArt isVisible={showASCII} />
                </div>
              )}

              {/* Terminal Window */}
              {/* <TerminalWindow
                onCommandExecute={executeCommand}
                currentDirectory={currentDirectory}
                commandHistory={commandHistory}
              /> */}

              {/* Quick Actions - Mobile */}
              <div className="lg:hidden">
                <QuickActions onCommandExecute={executeCommand} />
              </div>
            </div>
            {/* Sidebar */}
            <div className="space-y-6">

               {/* System Info */}
              <SystemInfo />
              {/* Terminal Tips */}
              <div className="bg-card border border-border rounded-terminal p-4">
                <h3 className="font-terminal text-primary text-sm mb-3 flex items-center space-x-2">
                  <Icon name="Lightbulb" size={16} />
                  <span>Terminal Tips</span>
                </h3>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center space-x-2">
                    <Icon name="Keyboard" size={12} className="text-primary" />
                    <span>Press Tab for command completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowUp" size={12} className="text-primary" />
                    <span>Use arrow keys for command history</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="HelpCircle" size={12} className="text-primary" />
                    <span>Type 'help' for command reference</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={12} className="text-primary" />
                    <span>Try 'sudo hire-me' for quick contact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Command Helper Modal */}
      <CommandHelper 
        isVisible={showHelp} 
        onClose={() => setShowHelp(false)} 
      />
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-terminal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-terminal text-muted">
              © {new Date().getFullYear()} Shivam.dev - Terminal Portfolio
            </div>
            <div className="flex items-center space-x-4 text-muted">
              <span className="flex items-center space-x-1">
                <Icon name="Terminal" size={14} className="text-primary" />
                <span>CLI Mode Active</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Wifi" size={14} className="text-success" />
                <span>Connected</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TerminalHomepage;