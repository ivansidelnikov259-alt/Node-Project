import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from './hooks/useTechnologies';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    addTechnology, 
    markAllCompleted, 
    resetAll, 
    importTechnologies,
    deleteTechnology,
    progress 
  } = useTechnologies();
  
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (technologies && technologies.length >= 0) {
      const newStats = {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length,
        notStarted: technologies.filter(t => t.status === 'not-started').length
      };
      setStats(newStats);
      setIsLoading(false);
    }
  }, [technologies]);

  // Получаем имя репозитория из URL для GitHub Pages
  const getBasename = () => {
    const url = window.location.href;
    if (url.includes('github.io')) {
      const repoName = url.split('/')[3]; // Получаем имя репозитория
      return repoName ? `/${repoName}` : '';
    }
    return '';
  };

  if (isLoading) {
    return (
      <Router basename={getBasename()}>
        <div className="App">
          <Navigation />
          <div style={{ 
            padding: '40px', 
            textAlign: 'center',
            fontSize: '18px',
            color: '#666'
          }}>
            Загрузка данных...
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router basename={getBasename()}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                progress={progress}
                stats={stats}
              />
            } 
          />
          <Route 
            path="/technologies" 
            element={
              <TechnologyList
                technologies={technologies}
                updateStatus={updateStatus}
                updateNotes={updateNotes}
                markAllCompleted={markAllCompleted}
                resetAll={resetAll}
                onImportTechnologies={importTechnologies}
                onDeleteTechnology={deleteTechnology}
              />
            } 
          />
          <Route 
            path="/technology/:id" 
            element={
              <TechnologyDetail
                technologies={technologies}
                updateStatus={updateStatus}
                updateNotes={updateNotes}
                onDeleteTechnology={deleteTechnology}
              />
            } 
          />
          <Route 
            path="/add-technology" 
            element={
              <AddTechnology
                addTechnology={addTechnology}
              />
            } 
          />
          <Route 
            path="/statistics" 
            element={
              <Statistics
                technologies={technologies}
                progress={progress}
              />
            } 
          />
          {/* Добавляем fallback route для GitHub Pages */}
          <Route path="*" element={
            <Home 
              progress={progress}
              stats={stats}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;