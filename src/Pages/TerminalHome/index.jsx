
import React, { useState,} from 'react';

import Header from '../../Components/Ui/Header';
import Icon from '../../Components/AppIcon';

const TerminalHomepage = () => {

//   const [isLoading, setIsLoading] = useState(true);

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
            {/* Sidebar */}
            <div className="space-y-6">
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