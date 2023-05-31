import { useEffect, useRef } from 'react';

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  function onChange(e, i) {
    const { value } = e.target;
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  }
  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });
  return (
    <div id="gantt-grid-container__tasks">
      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
            <input
              ref={(el) => {
                inputRef.current[i] = el;
              }}
              style={{ height: 10 }}
              onChange={(e) => onChange(e, i)}
              data-task-id={tsk?.id}
              value={tsk?.name}
            />
            <button onClick={handleDelete} type="button" data-task-id={tsk?.id}>
              x
            </button>
          </div>
        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          padding-top: 120px;
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
