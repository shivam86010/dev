import React, { useState } from 'react';
import Icon from '../../../Components/AppIcon';
import Button from '../../../Components/Ui/Button';
import Input from '../../../Components/Ui/Input';

const ProjectFilters = ({ projects, onFilterChange, activeFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique values for filters
  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies))];
  const allStatuses = [...new Set(projects.map(p => p.status))];
  const allCategories = [...new Set(projects.map(p => p.category))];

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = activeFilters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...activeFilters,
      [filterType]: newFilters
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      ...activeFilters,
      search: value
    });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => {
      if (Array.isArray(filters)) {
        return count + filters.length;
      }
      return filters ? count + 1 : count;
    }, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success border-success/30 bg-success/10';
      case 'in-progress': return 'text-warning border-warning/30 bg-warning/10';
      case 'planning': return 'text-accent border-accent/30 bg-accent/10';
      default: return 'text-muted border-muted/30 bg-muted/10';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search projects by name, description, or technology..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconSize={16}
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconSize={16}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterType, filters]) => {
            if (filterType === 'search' && filters) {
              return (
                <div
                  key="search"
                  className="flex items-center space-x-1 px-3 py-1 bg-primary/20 border border-primary/30 rounded-terminal text-xs font-code"
                >
                  <Icon name="Search" size={12} />
                  <span>"{filters}"</span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleSearchChange({ target: { value: '' } })}
                    iconName="X"
                    iconSize={10}
                    className="ml-1 p-0 h-4 w-4"
                  />
                </div>
              );
            }
            
            if (Array.isArray(filters)) {
              return filters.map(filter => (
                <div
                  key={`${filterType}-${filter}`}
                  className="flex items-center space-x-1 px-3 py-1 bg-accent/20 border border-accent/30 rounded-terminal text-xs font-code"
                >
                  <span className="capitalize">{filterType}: {filter}</span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleFilterToggle(filterType, filter)}
                    iconName="X"
                    iconSize={10}
                    className="ml-1 p-0 h-4 w-4"
                  />
                </div>
              ));
            }
            
            return null;
          })}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-card border border-border rounded-terminal p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="font-terminal text-sm font-bold text-foreground mb-3">
              Project Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map(status => (
                <Button
                  key={status}
                  variant={activeFilters.status?.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle('status', status)}
                  className={`capitalize ${getStatusColor(status)}`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          {allCategories.length > 1 && (
            <div>
              <h3 className="font-terminal text-sm font-bold text-foreground mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <Button
                    key={category}
                    variant={activeFilters.category?.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterToggle('category', category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Technology Filter */}
          <div>
            <h3 className="font-terminal text-sm font-bold text-foreground mb-3">
              Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {allTechnologies.sort().map(tech => (
                <Button
                  key={tech}
                  variant={activeFilters.technologies?.includes(tech) ? "default" : "outline"}
                  size="xs"
                  onClick={() => handleFilterToggle('technologies', tech)}
                  className="text-xs justify-start"
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="font-terminal text-sm font-bold text-foreground mb-3">
              Sort By
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'name', label: 'Name' },
                { value: 'date', label: 'Last Updated' },
                { value: 'stars', label: 'Stars' },
                { value: 'commits', label: 'Commits' }
              ].map(option => (
                <Button
                  key={option.value}
                  variant={activeFilters.sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFilterChange({
                    ...activeFilters,
                    sortBy: option.value
                  })}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;