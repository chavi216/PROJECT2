import './styles/Input.css';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label} {required && '*'}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`custom-input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;