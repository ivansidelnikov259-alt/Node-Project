import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology({ addTechnology }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    addTechnology(formData);
    navigate('/technologies');
  };

  return (
    <div className="add-technology-page-modern">
      <div className="page-header-modern">
  <h1 className="page-title">➕ Добавить технологию</h1>
  <p className="page-subtitle">Добавьте новую технологию для отслеживания прогресса</p>
</div>

      <form onSubmit={handleSubmit} className="technology-form-modern">
        <div className="form-group-modern">
          <label htmlFor="title" className="form-label-modern">
            Название технологии <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React, Node.js, MongoDB..."
            className="form-input-modern"
            required
          />
        </div>

        <div className="form-group-modern">
          <label htmlFor="description" className="form-label-modern">
            Описание <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите что нужно изучить, ключевые концепции, инструменты..."
            rows="5"
            className="form-textarea-modern"
            required
          />
        </div>

        <div className="form-group-modern">
          <label htmlFor="category" className="form-label-modern">
            Категория
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select-modern"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Базы данных</option>
            <option value="devops">DevOps</option>
            <option value="mobile">Мобильная разработка</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-actions-modern">
          <button type="button" onClick={() => navigate('/technologies')} className="btn-secondary-modern">
            Отмена
          </button>
          <button type="submit" className="btn-primary-modern">
            🚀 Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;