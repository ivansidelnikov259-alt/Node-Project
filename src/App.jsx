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

  useEffect(() => {
    const newStats = {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length
    };
    setStats(newStats);
  }, [technologies]);

  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;