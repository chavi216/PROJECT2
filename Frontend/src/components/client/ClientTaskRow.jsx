import './styles/ClientTaskRow.css';

const ClientTaskRow = ({ task, onToggleComplete }) => {
  return (
    <div className={`task-row ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-checkbox-container">
        <input
          type="checkbox"
          checked={!!task.completed}
onChange={() => onToggleComplete(task.Task_ID, task.completed)}
          className="task-checkbox"
          id={`task-${task.Task_ID}`}
        />
      </div>
      <label htmlFor={`task-${task.Task_ID}`} className="task-info-container">
        <h4 className="task-title">{task.Title}</h4>
        <p className="task-body-text">{task.Body}</p>
      </label>
    </div>
  );
};

export default ClientTaskRow;