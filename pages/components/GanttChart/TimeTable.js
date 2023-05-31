import { useState } from 'react';
import { monthDiff } from '../../helpers/dateFunctions';

export default function TimeTable() {
  // for dynamic css styling
  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(30px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const ganttTimePeriodSpan = {
    margin: 'auto',
  };

  const ganttTimePeriodCell = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDuration = {
    position: 'absolute',
    height: 'calc(var(--cell-height) - 1px)',
    zIndex: '1',
    background:
      'linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
    cursor: 'move',
  };

  // creating rows
  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );
  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let weekRows = [];
  let weekRow = [];
  let taskRows = [];
  let taskRow = [];

  return (
    <div
      id="gantt-grid-container__time"
      style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
    >
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: '0.5px',
        }}
      >
        {taskRows}
      </div>
      <style jsx>{`
        #gantt-grid-container__time {
          display: grid;
          overflow-x: auto;
          outline: 0.5px solid var(--color-outline);
        }

        .taskDuration {
          position: absolute;
          height: calc(var(--cell-height) / 3);
          top: calc(var(--cell-height) / 3);
          z-index: 1;
          background: linear-gradient(
            90deg,
            var(--color-primary-light) 0%,
            var(--color-primary-dark) 100%
          );
          border-radius: 2px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
          cursor: move;
        }

        .taskDuration:focus {
          outline: 1px solid black;
        }

        .dragging {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
