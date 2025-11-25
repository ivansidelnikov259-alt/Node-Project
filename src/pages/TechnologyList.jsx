import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import SearchBox from '../components/SearchBox';
import QuickActions from '../components/QuickActions';

function TechnologyList({ 
  technologies, 
  updateStatus, 
  updateNotes, 
  markAllCompleted, 
  resetAll,
  onImportTechnologies,
  onDeleteTechnology
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);

  useEffect(() => {
    const filtered = technologies.filter(tech =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTechnologies(filtered);
  }, [technologies, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>💻 Все технологии</h1>
        <p>Управляйте вашим прогрессом в изучении технологий</p>
      </div>

      <div className="controls-section">
        <SearchBox onSearch={handleSearch} />
        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          technologies={technologies}
          onImportTechnologies={onImportTechnologies}
        />
      </div>

      <div className="technologies-section">
        <div className="technologies-grid">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
              onDelete={onDeleteTechnology}
            />
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <div className="empty-state">
            <p>Технологии не найдены</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="btn btn-primary"
              >
                Очистить поиск
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyList;