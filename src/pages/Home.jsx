import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import './Home.css';

function Home({ progress, stats }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер технологий! 🚀</h1>
        <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
        
        <div className="progress-section">
          <ProgressBar
            progress={progress}
            label="Общий прогресс"
            color="mint-gradient"
            animated={true}
            height={25}
          />
        </div>
      </div>

      {/* Обновленная статистика */}
      <div className="stats-overview-modern">
        <div className="stat-item-modern">
          <div className="stat-content">
            <span className="stat-label-modern">Всего изучаемых технологий</span>
            <span className="stat-value-modern">{stats.total}</span>
          </div>
        </div>
        <div className="stat-item-modern">
          <div className="stat-content">
            <span className="stat-label-modern">Технологий изучено</span>
            <span className="stat-value-modern">{stats.completed}</span>
          </div>
        </div>
        <div className="stat-item-modern">
          <div className="stat-content">
            <span className="stat-label-modern">Технологии в процессе изучения</span>
            <span className="stat-value-modern">{stats.inProgress}</span>
          </div>
        </div>
        <div className="stat-item-modern">
          <div className="stat-content">
            <span className="stat-label-modern">Не начатые к изучению технологии</span>
            <span className="stat-value-modern">{stats.notStarted}</span>
          </div>
        </div>
      </div>

      {/* Обновленные ссылки с распределением */}
      <div className="quick-links-modern">
        <Link to="/technologies" className="quick-link-modern left">
          <span className="link-icon">💻</span>
          <span className="link-text">Все технологии</span>
        </Link>
        <Link to="/add-technology" className="quick-link-modern center">
          <span className="link-icon">➕</span>
          <span className="link-text">Добавить технологию</span>
        </Link>
        <Link to="/statistics" className="quick-link-modern right">
          <span className="link-icon">📈</span>
          <span className="link-text">Подробная статистика</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;