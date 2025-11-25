import { useState } from 'react';
import Modal from './Modal';
import useApi from '../hooks/useApi';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  technologies, 
  onImportTechnologies 
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const { data, loading, error, refetch } = useApi(
    showImportModal ? '/api/technologies' : null
  );

  const handleExport = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      technologies: technologies
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportModal(true);
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.technologies && Array.isArray(importedData.technologies)) {
            onImportTechnologies(importedData.technologies);
            alert(`Успешно импортировано ${importedData.technologies.length} технологий`);
          } else {
            alert('Неверный формат файла: отсутствует массив technologies');
          }
        } catch (err) {
          alert('Ошибка при импорте файла: неверный формат JSON');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const handleApiImport = () => {
    setShowImportModal(true);
  };

  const importFromApi = () => {
    if (data && data.technologies) {
      onImportTechnologies(data.technologies);
      setShowImportModal(false);
    }
  };

  const getStats = () => {
    return {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length
    };
  };

  const stats = getStats();

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          ✅ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          🔄 Сбросить все статусы
        </button>
        <button onClick={handleExport} className="btn btn-info">
          📤 Экспорт данных
        </button>
        <label className="btn btn-secondary">
          📥 Импорт из файла
          <input
            type="file"
            accept=".json"
            onChange={handleFileImport}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={handleApiImport} className="btn btn-primary">
          🌐 Импорт из API
        </button>
      </div>

            {/* Статистика */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">Всего:  </span>
          <span className="stat-number">{stats.total}</span>
        </div>
        <div className="stat-item completed">
          <span className="stat-label">Выполнено:  </span>
          <span className="stat-number">{stats.completed}</span>
        </div>
        <div className="stat-item in-progress">
          <span className="stat-label">В процессе:  </span>
          <span className="stat-number">{stats.inProgress}</span>
        </div>
        <div className="stat-item not-started">
          <span className="stat-label">Не начато:  </span>
          <span className="stat-number">{stats.notStarted}</span>
        </div>
      </div>

      {/* Модальное окно экспорта */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="modal-content-export">
          <div className="export-success">✅</div>
          <h3>Данные успешно экспортированы!</h3>
          <p>Файл скачан автоматически.</p>
          <div className="export-stats">
            <p>Экспортировано технологий: <strong>{technologies.length}</strong></p>
            <p>Время экспорта: <strong>{new Date().toLocaleString()}</strong></p>
          </div>
          <button 
            onClick={() => setShowExportModal(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '15px' }}
          >
            Закрыть
          </button>
        </div>
      </Modal>

      {/* Модальное окно импорта из API */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Импорт технологий из API"
      >
        <div className="api-import-content">
          {loading && (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Загрузка технологий из API...</p>
            </div>
          )}
          
          {error && (
            <div className="error-section">
              <div className="error-icon">❌</div>
              <p>Ошибка при загрузке данных</p>
              <p className="error-details">{error}</p>
              <button onClick={refetch} className="btn btn-warning">
                Повторить попытку
              </button>
            </div>
          )}
          
          {data && !loading && (
            <div className="api-data-section">
              <div className="success-icon">✅</div>
              <h4>Найдено технологий: {data.technologies?.length || 0}</h4>
              <div className="technology-preview">
                {data.technologies?.slice(0, 3).map(tech => (
                  <div key={tech.id} className="preview-item">
                    <strong>{tech.title}</strong>
                    <span className="category-tag">{tech.category}</span>
                  </div>
                ))}
                {data.technologies?.length > 3 && (
                  <div className="preview-more">
                    и еще {data.technologies.length - 3} технологий...
                  </div>
                )}
              </div>
              <div className="import-actions">
                <button 
                  onClick={importFromApi}
                  className="btn btn-success"
                >
                  📥 Импортировать все ({data.technologies?.length})
                </button>
                <button 
                  onClick={() => setShowImportModal(false)}
                  className="btn btn-secondary"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;