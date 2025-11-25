import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const handleStatusClick = () => {
    const statuses = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statuses.indexOf(technology.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    onStatusChange(technology.id, statuses[nextIndex]);
  };

  const handleNotesChange = (e) => {
    onNotesChange(technology.id, e.target.value);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Удалить технологию "${technology.title}"?`)) {
      onDelete(technology.id);
    }
  };

  return (
    <div 
      className={`technology-card status-${technology.status}`}
      onClick={handleStatusClick}
    >
      <div className="card-header">
        <h3>{technology.title}</h3>
        <div className="header-actions">
          <span className={`status-badge ${technology.status}`}>
            {technology.status === 'not-started' && '⭕'}
            {technology.status === 'in-progress' && '🔄'}
            {technology.status === 'completed' && '✅'}
          </span>
          <button 
            className="delete-btn"
            onClick={handleDeleteClick}
            title="Удалить технологию"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <p className="description">{technology.description}</p>
      
      <div className="notes-section">
        <textarea
          value={technology.notes || ''}
          onChange={handleNotesChange}
          placeholder="Добавьте заметки..."
          rows="3"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <div className="card-footer">
        <span className="category">{technology.category}</span>
        {technology.notes && (
          <span className="notes-indicator">📝</span>
        )}
      </div>
    </div>
  );
}

export default TechnologyCard;