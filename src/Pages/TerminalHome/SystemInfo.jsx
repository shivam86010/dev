import React, { useState, useEffect } from 'react';
import Icon from '../../Components/AppIcon';

const SystemInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [systemStats, setSystemStats] = useState({
    cpu: 12,
    memory: 2.1,
    network: { up: 24, down: 156 },
    uptime: '7d 14h 32m'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate dynamic system stats
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20) + 5,
        memory: (Math.random() * 1.5 + 1.5).toFixed(1),
        network: {
          up: Math.floor(Math.random() * 50) + 10,
          down: Math.floor(Math.random() * 200) + 100
        }
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-terminal p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-terminal text-primary text-sm flex items-center space-x-2">
          <Icon name="Monitor" size={16} />
          <span>System Information</span>
        </h3>
        {/* <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="font-code text-xs text-success">ONLINE</span>
        </div> */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-destructive'} animate-pulse`}></div>
          <span className={`font-code text-xs ${isOnline ? 'text-success' : 'text-destructive'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Time & Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background border border-border rounded p-3">
          <div className="text-xs text-muted mb-1">Current Time</div>
          <div className="font-terminal text-primary text-lg">
            {formatTime(currentTime)}
          </div>
        </div>
        <div className="bg-background border border-border rounded p-3">
          <div className="text-xs text-muted mb-1">Date</div>
          <div className="font-terminal text-foreground text-sm">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="space-y-3">
        <div className="text-xs text-muted">Resource Usage</div>
        
        {/* CPU */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cpu" size={14} className="text-primary" />
            <span className="font-code text-xs text-foreground">CPU</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${systemStats.cpu}%` }}
              ></div>
            </div>
            <span className="font-terminal text-xs text-primary w-8 text-right">
              {systemStats.cpu}%
            </span>
          </div>
        </div>

        {/* Memory */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="HardDrive" size={14} className="text-accent" />
            <span className="font-code text-xs text-foreground">MEM</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${(parseFloat(systemStats.memory) / 8) * 100}%` }}
              ></div>
            </div>
            <span className="font-terminal text-xs text-accent w-8 text-right">
              {systemStats.memory}GB
            </span>
          </div>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={14} className="text-success" />
            <span className="font-code text-xs text-foreground">NET</span>
          </div>
          <div className="font-terminal text-xs text-success">
            ↑{systemStats.network.up}KB/s ↓{systemStats.network.down}KB/s
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="border-t border-border pt-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted">Uptime</span>
          <span className="font-terminal text-foreground">{systemStats.uptime}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Shell</span>
          <span className="font-terminal text-foreground">portfolio-bash v2.1</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">User</span>
          <span className="font-terminal text-foreground">shivam@portfolio</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Location</span>
          <span className="font-terminal text-foreground">~/workspace</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Quick Actions</span>
          <div className="flex items-center space-x-2">
            <button className="text-primary hover:text-accent transition-colors" title="Refresh">
              <Icon name="RefreshCw" size={12} />
            </button>
            <button className="text-primary hover:text-accent transition-colors" title="Settings">
              <Icon name="Settings" size={12} />
            </button>
            <button className="text-primary hover:text-accent transition-colors" title="Help">
              <Icon name="HelpCircle" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;