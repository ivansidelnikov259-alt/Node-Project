import './ProgressBar.css';

function ProgressBar({ progress, label = '', color = '#4CAF50', height = 20, showPercentage = true }) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const getProgressStyle = () => {
  if (color === 'mint-gradient') {
    return {
      width: `${normalizedProgress}%`,
      background: 'var(--gradient-mint-blue)'
    };
  }
  return {
    width: `${normalizedProgress}%`,
    backgroundColor: color
  };
};

  return (
    <div className="progress-bar-container">
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}
      
      <div className="progress-bar-outer" style={{ height: `${height}px` }}>
        <div
          className="progress-bar-inner"
          style={getProgressStyle()}
        />
      </div>
    </div>
  );
}

export default ProgressBar;