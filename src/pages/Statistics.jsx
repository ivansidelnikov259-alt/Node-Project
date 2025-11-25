import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import './Statistics.css';

function Statistics({ technologies, progress }) {
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const categoryStats = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {});

  const getCategoryDisplayName = (category) => {
    const names = {
      'frontend': 'Frontend',
      'backend': 'Backend', 
      'database': 'Базы данных',
      'devops': 'DevOps',
      'mobile': 'Мобильная разработка',
      'other': 'Другое'
    };
    return names[category] || category;
  };

  return (
    <div className="statistics-page-modern">
      <div className="page-header-modern">
  <h1 className="page-title">📈 Статистика</h1>
  <p className="page-subtitle">Подробная аналитика вашего прогресса</p>
</div>

      <div className="stats-grid-modern">
        <div className="stat-card-modern main-progress">
          <h3>Общий прогресс изучения</h3>
          <ProgressBar
            progress={progress}
            height={30}
            showPercentage={true}
            color="mint-gradient"
          />
          <div className="progress-text-modern">
            <span>Изучено {stats.completed} из {stats.total} технологий</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <h3>📊 Распределение по статусам</h3>
          <div className="status-stats-modern">
            <div className="status-item-modern">
              <span className="status-label">Всего изучаемых технологий:</span>
              <span className="status-value">{stats.total}</span>
            </div>
            <div className="status-item-modern">
              <span className="status-label">Технологий изучено:</span>
              <span className="status-value completed">{stats.completed}</span>
            </div>
            <div className="status-item-modern">
              <span className="status-label">Технологии в процессе изучения:</span>
              <span className="status-value in-progress">{stats.inProgress}</span>
            </div>
            <div className="status-item-modern">
              <span className="status-label">Не начатые к изучению технологии:</span>
              <span className="status-value not-started">{stats.notStarted}</span>
            </div>
          </div>
        </div>

        <div className="stat-card-modern">
          <h3>🏷️ Распределение по категориям</h3>
          <div className="category-stats-modern">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="category-item-modern">
                <span className="category-name">{getCategoryDisplayName(category)}:</span>
                <span className="category-count">{count} технологи{getTechnologyWord(count)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card-modern">
          <h3>🎯 Рекомендации</h3>
          <div className="recommendations-modern">
            {stats.notStarted > 0 && (
              <p className="recommendation-item">🚀 Начните изучение {stats.notStarted} технологий</p>
            )}
            {stats.inProgress > 0 && (
              <p className="recommendation-item">📚 Продолжайте работу над {stats.inProgress} технологиями</p>
            )}
            {stats.completed === stats.total && stats.total > 0 && (
              <p className="recommendation-item success">🎉 Поздравляем! Вы изучили все технологии!</p>
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions-stats-modern">
        <Link to="/technologies" className="action-link-stats">
          💻 Перейти к технологиям
        </Link>
        <Link to="/add-technology" className="action-link-stats">
          ➕ Добавить технологию
        </Link>
      </div>
    </div>
  );
}

// Вспомогательная функция для склонения слова "технология"
function getTechnologyWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'я';
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'и';
  return 'й';
}

export default Statistics;