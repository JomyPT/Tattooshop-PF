import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Carregando..." }) {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
}
