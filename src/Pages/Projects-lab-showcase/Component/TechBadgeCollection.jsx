import React, { useState, useEffect } from 'react';
import Icon from '../../../Components/AppIcon';
import Button from '../../../Components/Ui/Button';

const TechBadgeCollection = ({ projects, onBadgeCollected }) => {
  const [collectedBadges, setCollectedBadges] = useState(new Set());
  const [showCollection, setShowCollection] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  // Extract all unique technologies from projects
  const allTechnologies = [...new Set(
    projects.flatMap(project => project.technologies)
  )];

  const techCategories = {
    frontend: ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Bootstrap'],
    backend: ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'PHP', 'Laravel', 'Ruby', 'Rails', 'Java', 'Spring'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'Supabase'],
    cloud: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'Heroku', 'Docker', 'Kubernetes'],
    tools: ['Git', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress', 'Figma', 'Postman']
  };

  const getBadgeCategory = (tech) => {
    for (const [category, techs] of Object.entries(techCategories)) {
      if (techs.some(t => t.toLowerCase() === tech.toLowerCase())) {
        return category;
      }
    }
    return 'other';
  };

  const getBadgeColor = (category) => {
    const colors = {
      frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      backend: 'bg-green-500/20 text-green-400 border-green-500/30',
      database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      cloud: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      tools: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      other: 'bg-primary/20 text-primary border-primary/30'
    };
    return colors[category] || colors.other;
  };

  const getBadgeIcon = (category) => {
    const icons = {
      frontend: 'Monitor',
      backend: 'Server',
      database: 'Database',
      cloud: 'Cloud',
      tools: 'Wrench',
      other: 'Code'
    };
    return icons[category] || icons.other;
  };

  const collectBadge = (tech) => {
    if (!collectedBadges.has(tech)) {
      setCollectedBadges(prev => new Set([...prev, tech]));
      setNewBadge(tech);
      onBadgeCollected?.(tech);
      
      // Clear new badge indicator after animation
      setTimeout(() => setNewBadge(null), 3000);
    }
  };

  const getCollectionProgress = () => {
    return {
      collected: collectedBadges.size,
      total: allTechnologies.length,
      percentage: Math.round((collectedBadges.size / allTechnologies.length) * 100)
    };
  };

  const getCategoryProgress = (category) => {
    const categoryTechs = techCategories[category] || [];
    const availableTechs = categoryTechs.filter(tech => allTechnologies.includes(tech));
    const collectedTechs = availableTechs.filter(tech => collectedBadges.has(tech));
    
    return {
      collected: collectedTechs.length,
      total: availableTechs.length,
      percentage: availableTechs.length > 0 ? Math.round((collectedTechs.length / availableTechs.length) * 100) : 0
    };
  };

  // Auto-collect badges when projects are viewed
  useEffect(() => {
    const timer = setTimeout(() => {
      projects.forEach(project => {
        project.technologies.forEach(tech => {
          if (Math.random() > 0.7) { // 30% chance to auto-collect
            collectBadge(tech);
          }
        });
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [projects]);

  const progress = getCollectionProgress();

  return (
    <>
      {/* Badge Collection Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="lg"
          onClick={() => setShowCollection(true)}
          iconName="Award"
          iconSize={20}
          className="relative terminal-glow"
        >
          <span className="font-terminal">
            Badges {collectedBadges.size}/{allTechnologies.length}
          </span>
          {newBadge && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Plus" size={12} className="text-background" />
            </div>
          )}
        </Button>
      </div>

      {/* New Badge Notification */}
      {newBadge && (
        <div className="fixed top-20 right-6 z-50 bg-card border border-success rounded-terminal p-4 terminal-glow animate-slide-in-right">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-terminal flex items-center justify-center">
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <div>
              <div className="font-terminal text-sm font-bold text-foreground">
                Badge Collected!
              </div>
              <div className="font-code text-xs text-muted">
                {newBadge}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badge Collection Modal */}
      {showCollection && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-terminal">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h1 className="font-terminal text-xl font-bold text-foreground">
                  Technology Badge Collection
                </h1>
                <p className="font-code text-sm text-muted">
                  Collect badges by exploring projects with different technologies
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCollection(false)}
                iconName="X"
                iconSize={16}
              />
            </div>

            {/* Progress Overview */}
            <div className="p-6 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-terminal p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Trophy" size={16} className="text-warning" />
                    <span className="font-terminal text-sm font-bold">Overall Progress</span>
                  </div>
                  <div className="text-2xl font-terminal font-bold text-foreground">
                    {progress.percentage}%
                  </div>
                  <div className="text-xs font-code text-muted">
                    {progress.collected} of {progress.total} badges
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {Object.entries(techCategories).slice(0, 3).map(([category]) => {
                  const categoryProgress = getCategoryProgress(category);
                  return (
                    <div key={category} className="bg-card border border-border rounded-terminal p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name={getBadgeIcon(category)} size={16} className="text-primary" />
                        <span className="font-terminal text-sm font-bold capitalize">{category}</span>
                      </div>
                      <div className="text-xl font-terminal font-bold text-foreground">
                        {categoryProgress.collected}/{categoryProgress.total}
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${categoryProgress.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge Collection */}
            <div className="flex-1 overflow-y-auto p-6">
              {Object.entries(techCategories).map(([category, techs]) => {
                const availableTechs = techs.filter(tech => allTechnologies.includes(tech));
                if (availableTechs.length === 0) return null;

                return (
                  <div key={category} className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name={getBadgeIcon(category)} size={20} className="text-primary" />
                      <h2 className="font-terminal text-lg font-bold text-foreground capitalize">
                        {category} Technologies
                      </h2>
                      <span className="font-code text-sm text-muted">
                        ({getCategoryProgress(category).collected}/{getCategoryProgress(category).total})
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {availableTechs.map((tech) => {
                        const isCollected = collectedBadges.has(tech);
                        const isNew = newBadge === tech;
                        
                        return (
                          <div
                            key={tech}
                            className={`relative p-3 border rounded-terminal transition-all duration-300 cursor-pointer ${
                              isCollected 
                                ? `${getBadgeColor(category)} terminal-glow` 
                                : 'bg-muted/10 border-muted/20 text-muted hover:border-muted/40'
                            } ${isNew ? 'animate-pulse' : ''}`}
                            onClick={() => collectBadge(tech)}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <Icon 
                                name={getBadgeIcon(category)} 
                                size={24} 
                                className={isCollected ? '' : 'opacity-50'} 
                              />
                              <span className="font-code text-xs text-center">
                                {tech}
                              </span>
                            </div>
                            
                            {isCollected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                                <Icon name="Check" size={12} className="text-background" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Achievement Milestones */}
              <div className="mt-8 bg-card border border-border rounded-terminal p-6">
                <h3 className="font-terminal text-lg font-bold text-foreground mb-4">
                  Achievement Milestones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { threshold: 10, title: 'Explorer', icon: 'Compass', description: 'Collect 10 badges' },
                    { threshold: 25, title: 'Specialist', icon: 'Target', description: 'Collect 25 badges' },
                    { threshold: 50, title: 'Master', icon: 'Crown', description: 'Collect 50 badges' }
                  ].map((milestone) => {
                    const isAchieved = collectedBadges.size >= milestone.threshold;
                    return (
                      <div
                        key={milestone.title}
                        className={`p-4 border rounded-terminal ${
                          isAchieved 
                            ? 'bg-warning/20 border-warning/30 text-warning' :'bg-muted/10 border-muted/20 text-muted'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={milestone.icon} size={24} />
                          <div>
                            <div className="font-terminal text-sm font-bold">
                              {milestone.title}
                            </div>
                            <div className="font-code text-xs">
                              {milestone.description}
                            </div>
                          </div>
                          {isAchieved && (
                            <Icon name="CheckCircle" size={16} className="text-success" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TechBadgeCollection;