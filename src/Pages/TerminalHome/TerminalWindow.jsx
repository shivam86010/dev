// import React, { useState, useEffect, useRef } from 'react';
// import Icon from '../../Components/AppIcon';

// const TerminalWindow = ({ onCommandExecute, currentDirectory, commandHistory }) => {
//   const [currentCommand, setCurrentCommand] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showCursor, setShowCursor] = useState(true);
//   const inputRef = useRef(null);
//   const terminalRef = useRef(null);
//   const [isVisible, setIsVisible]=useState(true);
//   const [isFullScreen, setIsFullScreen]=useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);

//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, 500);
//     return () => clearInterval(cursorInterval);
//   }, []);

//   useEffect(() => {
//     if (terminalRef.current) {
//       terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
//     }
//   }, [commandHistory]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentCommand.trim()) {
//       onCommandExecute(currentCommand.trim());
//       setCurrentCommand('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Tab') {
//       e.preventDefault();
//       // Basic tab completion for common commands
//       const commands = ['help', 'ls', 'cd', 'cat', 'clear', 'whoami', 'pwd', 'sudo'];
//       const matches = commands.filter(cmd => cmd.startsWith(currentCommand));
//       if (matches.length === 1) {
//         setCurrentCommand(matches[0]);
//       }
//     }
//   };

//   const focusInput = () => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   if(!isVisible)
//     return null;

//   return (
//     <div className={`bg-background border border-border rounded-terminal terminal-window ${isFullScreen ? 'fixed top-0 left-0 w-screen h-screen z-50' : 'h-96'}  flex flex-col transition-all duration-300 `}>
//       {/* Terminal Header */}
//       <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
//         <div className="flex items-center space-x-2">
//           <div onClick={()=>setIsVisible(false)}  className="w-3 h-3 rounded-full bg-error cursor-pointer hover:opacity-80"></div>
//           <div onClick={() => setIsMinimized(prev => !prev)} className="w-3 h-3 rounded-full bg-warning cursor-pointer hover:opacity-80"></div>
//           <div onClick={()=>setIsFullScreen(prev => !prev)} className="w-3 h-3 rounded-full bg-success cursor-pointer hover:opacity-80"></div>
//         </div>
//         <div className="font-terminal text-sm text-muted">shivam@portfolio:~$</div>
//         <div className="flex items-center space-x-2">
//           <Icon name="Minimize2" size={14} className="text-muted hover:text-foreground cursor-pointer" />
//           <Icon name="Square" size={14} className="text-muted hover:text-foreground cursor-pointer" />
//           <Icon name="X" size={14} className="text-muted hover:text-foreground cursor-pointer" />
//         </div>
//       </div>
      
//       {/* terminal content (hidden when minimized) */}
//       {!isMinimized && (
//         <>
//           {/* Terminal Content */}
//           <div 
//             ref={terminalRef}
//             className="flex-1 p-4 overflow-y-auto font-terminal text-sm scan-lines"
//             onClick={focusInput}
//           >
//             {/* Command History */}
//             {commandHistory.map((entry, index) => (
//               <div key={index} className="mb-2">
//                 <div className="flex items-center space-x-2 text-primary">
//                   <span>shivam@portfolio:{currentDirectory}$</span>
//                   <span className="text-foreground">{entry.command}</span>
//                 </div>
//                 <div className="mt-1 whitespace-pre-wrap text-foreground">
//                   {entry.output}
//                 </div>
//               </div>
//             ))}

//             {/* Current Input Line */}
//             <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//               <span className="text-primary">shivam@portfolio:{currentDirectory}$</span>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={currentCommand}
//                 onChange={(e) => setCurrentCommand(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="flex-1 bg-transparent text-foreground outline-none font-terminal"
//                 placeholder=""
//                 autoFocus
//               />
//               <span className={`text-primary ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
//                 _
//               </span>
//             </form>
//           </div>

//           {/* Terminal Footer */}
//           <div className="px-4 py-2 bg-card border-t border-border">
//             <div className="flex items-center justify-between text-xs font-code text-muted">
//               <div className="flex items-center space-x-4">
//                 <span className="text-success">●</span>
//                 <span>Connected</span>
//                 <span>Type 'help' for commands</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span>Lines: {commandHistory.length}</span>
//                 <span>Cols: 80</span>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//     </div>
//   );
// };

// export default TerminalWindow;


import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../Components/AppIcon';
import { Rnd } from "react-rnd";
const TerminalWindow = ({ onCommandExecute, currentDirectory, commandHistory }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // red button: close
  const [isFullScreen, setIsFullScreen] = useState(false); // green button: maximize
  const [isMinimized, setIsMinimized] = useState(false); // yellow button: minimize
  const [dockBounce, setDockBounce] = useState(false); // bounce effect for dock
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

  // Trigger bounce when minimized
  useEffect(() => {
    if (isMinimized) {
      setDockBounce(true);
      const timer = setTimeout(() => setDockBounce(false), 1200); // stop bounce after 1.2s
      return () => clearTimeout(timer);
    }
  }, [isMinimized]);

  if (!isVisible) return null; // fully closed

  return (
    <>
      {/* Terminal Window */}
      {!isMinimized && (
        <div 
          className={`bg-background border border-border rounded-terminal terminal-window flex flex-col transition-all duration-300 
          ${isFullScreen ? 'fixed top-0 left-0 w-screen h-screen z-50' : 'h-96'}`}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
            <div className="flex items-center space-x-2">
              {/* Close Button */}
              <div 
                className="w-3 h-3 rounded-full bg-error cursor-pointer hover:opacity-80"
                onClick={() => setIsVisible(false)}
              ></div>

              {/* Minimize Button */}
              <div 
                className="w-3 h-3 rounded-full bg-warning cursor-pointer hover:opacity-80"
                onClick={() => setIsMinimized(true)}
              ></div>

              {/* Maximize Button */}
              <div 
                className="w-3 h-3 rounded-full bg-success cursor-pointer hover:opacity-80"
                onClick={() => setIsFullScreen(prev => !prev)}
              ></div>
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
      )}

    
      {/* Dock-style Terminal Icon when minimized */}
      {isMinimized && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
          <button
            onClick={() => setIsMinimized(false)}
            className={`w-14 h-14 bg-black rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition transform
            ${dockBounce ? 'animate-bounceDock' : ''}`}
          >
            <span className="text-green-400 font-mono text-xl">{">_"}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default TerminalWindow;

// import React, { useState, useEffect, useRef } from 'react';
// import Icon from '../../Components/AppIcon';
// import { Rnd } from "react-rnd";
// const TerminalWindow = ({ onCommandExecute, currentDirectory, commandHistory }) => {
//   const [currentCommand, setCurrentCommand] = useState('');
//   const [showCursor, setShowCursor] = useState(true);
//   const [isVisible, setIsVisible] = useState(true); // red button: close
//   const [isFullScreen, setIsFullScreen] = useState(false); // green button: maximize
//   const [isMinimized, setIsMinimized] = useState(false); // yellow button: minimize
//   const [dockBounce, setDockBounce] = useState(false); // bounce effect for dock
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [size, setSize] = useState({ width: 600, height: 384 });
//   const inputRef = useRef(null);
//   const terminalRef = useRef(null);

//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, 500);
//     return () => clearInterval(cursorInterval);
//   }, []);

//   useEffect(() => {
//     if (terminalRef.current) {
//       terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
//     }
//   }, [commandHistory]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentCommand.trim()) {
//       onCommandExecute(currentCommand.trim());
//       setCurrentCommand('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Tab') {
//       e.preventDefault();
//       const commands = ['help', 'ls', 'cd', 'cat', 'clear', 'whoami', 'pwd', 'sudo'];
//       const matches = commands.filter(cmd => cmd.startsWith(currentCommand));
//       if (matches.length === 1) {
//         setCurrentCommand(matches[0]);
//       }
//     }
//   };

//   const focusInput = () => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   // Trigger bounce when minimized
//   useEffect(() => {
//     if (isMinimized) {
//       setDockBounce(true);
//       const timer = setTimeout(() => setDockBounce(false), 1200); // stop bounce after 1.2s
//       return () => clearTimeout(timer);
//     }
//   }, [isMinimized]);

//   const handleDragStop = (e, d) => {
//     setPosition({ x: d.x, y: d.y });
//   };

//   const handleResizeStop = (e, direction, ref, delta, position) => {
//     setSize({
//       width: ref.offsetWidth,
//       height: ref.offsetHeight,
//     });
//     if (position) {
//       setPosition(position);
//     }
//   };

//   const handleFullScreenToggle = () => {
//     if (!isFullScreen) {
//       // Store current position and size before going fullscreen
//       setPosition({ x: 0, y: 0 });
//       setSize({ width: window.innerWidth, height: window.innerHeight });
//     } else {
//       // Restore to default size and position when exiting fullscreen
//       setPosition({ x: 100, y: 100 });
//       setSize({ width: 600, height: 384 });
//     }
//     setIsFullScreen(prev => !prev);
//   };

//   if (!isVisible) return null; // fully closed

//   return (
//     <>
//       {/* Terminal Window */}
//       {!isMinimized && (
//         <Rnd
//           size={isFullScreen ? { width: '100%', height: '100%' } : size}
//           position={isFullScreen ? { x: 0, y: 0 } : position}
//           onDragStop={handleDragStop}
//           onResizeStop={handleResizeStop}
//           minWidth={400}
//           minHeight={300}
//           bounds="parent"
//           disableDragging={isFullScreen}
//           enableResizing={!isFullScreen}
//           className={isFullScreen ? 'fixed inset-0 z-50' : 'z-40'}
//         >
//           <div 
//             className={`bg-background border border-border rounded-terminal terminal-window flex flex-col transition-all duration-300 h-full
//             ${isFullScreen ? 'fixed top-0 left-0 w-screen h-screen rounded-none' : ''}`}
//           >
//             {/* Terminal Header */}
//             <div 
//               className="flex items-center justify-between px-4 py-2 bg-card border-b border-border rounded-t-terminal"
//               style={{ cursor: isFullScreen ? 'default' : 'move' }}
//             >
//               <div className="flex items-center space-x-2">
//                 {/* Close Button */}
//                 <div 
//                   className="w-3 h-3 rounded-full bg-error cursor-pointer hover:opacity-80"
//                   onClick={() => setIsVisible(false)}
//                 ></div>

//                 {/* Minimize Button */}
//                 <div 
//                   className="w-3 h-3 rounded-full bg-warning cursor-pointer hover:opacity-80"
//                   onClick={() => setIsMinimized(true)}
//                 ></div>

//                 {/* Maximize Button */}
//                 <div 
//                   className="w-3 h-3 rounded-full bg-success cursor-pointer hover:opacity-80"
//                   onClick={handleFullScreenToggle}
//                 ></div>
//               </div>

//               <div className="font-terminal text-sm text-muted">shivam@portfolio:~$</div>
//               <div className="flex items-center space-x-2">
//                 <Icon 
//                   name="Minimize2" 
//                   size={14} 
//                   className="text-muted hover:text-foreground cursor-pointer" 
//                   onClick={() => setIsMinimized(true)}
//                 />
//                 <Icon 
//                   name={isFullScreen ? "Minimize2" : "Square"} 
//                   size={14} 
//                   className="text-muted hover:text-foreground cursor-pointer" 
//                   onClick={handleFullScreenToggle}
//                 />
//                 <Icon 
//                   name="X" 
//                   size={14} 
//                   className="text-muted hover:text-foreground cursor-pointer" 
//                   onClick={() => setIsVisible(false)}
//                 />
//               </div>
//             </div>

//             {/* Terminal Content */}
//             <div 
//               ref={terminalRef}
//               className="flex-1 p-4 overflow-y-auto font-terminal text-sm scan-lines"
//               onClick={focusInput}
//             >
//               {commandHistory.map((entry, index) => (
//                 <div key={index} className="mb-2">
//                   <div className="flex items-center space-x-2 text-primary">
//                     <span>shivam@portfolio:{currentDirectory}$</span>
//                     <span className="text-foreground">{entry.command}</span>
//                   </div>
//                   <div className="mt-1 whitespace-pre-wrap text-foreground">
//                     {entry.output}
//                   </div>
//                 </div>
//               ))}

//               {/* Current Input Line */}
//               <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//                 <span className="text-primary">shivam@portfolio:{currentDirectory}$</span>
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={currentCommand}
//                   onChange={(e) => setCurrentCommand(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="flex-1 bg-transparent text-foreground outline-none font-terminal"
//                   autoFocus
//                 />
//                 <span className={`text-primary ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
//                   _
//                 </span>
//               </form>
//             </div>

//             {/* Terminal Footer */}
//             <div className="px-4 py-2 bg-card border-t border-border rounded-b-terminal">
//               <div className="flex items-center justify-between text-xs font-code text-muted">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-success">●</span>
//                   <span>Connected</span>
//                   <span>Type 'help' for commands</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span>Lines: {commandHistory.length}</span>
//                   <span>Cols: 80</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Rnd>
//       )}

    
//       {/* Dock-style Terminal Icon when minimized */}
//       {isMinimized && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
//           <button
//             onClick={() => setIsMinimized(false)}
//             className={`w-14 h-14 bg-black rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition transform
//             ${dockBounce ? 'animate-bounceDock' : ''}`}
//           >
//             <span className="text-green-400 font-mono text-xl">{">_"}</span>
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default TerminalWindow;  





 




