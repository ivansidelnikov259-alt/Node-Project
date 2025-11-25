import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TechnologyDetail({ technologies, updateStatus, updateNotes, onDeleteTechnology }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(id));
    if (tech) {
      setTechnology(tech);
      setLocalNotes(tech.notes || '');
    }
  }, [id, technologies]);

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(id), newStatus);
    setTechnology(prev => ({ ...prev, status: newStatus }));
  };

  const handleNotesChange = (e) => {
    setLocalNotes(e.target.value);
  };

  const saveNotes = () => {
    updateNotes(parseInt(id), localNotes);
    alert('Заметки сохранены!');
  };

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить технологию "${technology.title}"?`)) {
      onDeleteTechnology(parseInt(id));
      navigate('/technologies');
    }
  };

  if (!technology) {
    return (
      <div className="technology-detail-page">
        <div className="not-found">
          <h2>Технология не найдена</h2>
          <p>Технология с ID {id} не существует.</p>
          <button onClick={() => navigate('/technologies')} className="btn btn-primary">
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="technology-detail-page">
      <div className="page-header">
        <div className="header-actions">
          <button onClick={() => navigate('/technologies')} className="back-button">
            ← Назад
          </button>
          <button onClick={handleDelete} className="btn btn-danger delete-tech-btn">
            🗑️ Удалить технологию
          </button>
        </div>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-content">
        <div className="main-info">
          <div className="info-card">
            <h3>📝 Описание</h3>
            <p>{technology.description}</p>
          </div>

          <div className="info-card">
            <h3>🏷️ Категория</h3>
            <span className="category-badge">{technology.category}</span>
          </div>

          <div className="info-card">
            <h3>📊 Статус изучения</h3>
            <div className="status-buttons">
              <button
                onClick={() => handleStatusChange('not-started')}
                className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
              >
                ⭕ Не начато
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
              >
                🔄 В процессе
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
              >
                ✅ Завершено
              </button>
            </div>
          </div>
        </div>

        <div className="notes-section">
          <div className="info-card">
            <h3>📝 Мои заметки</h3>
            <textarea
              value={localNotes}
              onChange={handleNotesChange}
              placeholder="Записывайте сюда важные моменты, ссылки, команды..."
              rows="8"
            />
            <button onClick={saveNotes} className="btn btn-primary save-notes-btn">
              💾 Сохранить заметки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;