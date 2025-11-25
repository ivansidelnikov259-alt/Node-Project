import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 4,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  // Гарантируем, что technologies всегда массив
  const safeTechnologies = Array.isArray(technologies) ? technologies : initialTechnologies;

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return current.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      );
    });
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return current.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      );
    });
  };

  const addTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      status: 'not-started',
      notes: ''
    };
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return [...current, newTech];
    });
  };

  const markAllCompleted = () => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return current.map(tech => ({ ...tech, status: 'completed' }));
    });
  };

  const resetAll = () => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return current.map(tech => ({ ...tech, status: 'not-started' }));
    });
  };

  const importTechnologies = (newTechnologies) => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      const existingIds = new Set(current.map(tech => tech.id));
      const technologiesToAdd = newTechnologies.filter(tech => !existingIds.has(tech.id));
      return [...current, ...technologiesToAdd];
    });
  };

  const deleteTechnology = (techId) => {
    setTechnologies(prev => {
      const current = Array.isArray(prev) ? prev : initialTechnologies;
      return current.filter(tech => tech.id !== techId);
    });
  };

  const calculateProgress = () => {
    const techArray = Array.isArray(technologies) ? technologies : initialTechnologies;
    if (techArray.length === 0) return 0;
    const completed = techArray.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / techArray.length) * 100);
  };

  return {
    technologies: safeTechnologies,
    updateStatus,
    updateNotes,
    addTechnology,
    markAllCompleted,
    resetAll,
    importTechnologies,
    deleteTechnology,
    progress: calculateProgress()
  };
}

export default useTechnologies;