import React, { FC } from 'react';

export interface TaskProps {
  title: string;
  description?: string;
  subtasksCount: number;
  subtasksCompleted: number;
  onClick?: () => void
}

const Task: FC<TaskProps> = ({
  title,
  description,
  subtasksCount,
  subtasksCompleted,
  ...props
}) => {
  return (
    <>
      <div className="task" onClick={props?.onClick}>
        <h1 className="task__title">{title}</h1>
        {description && <p>{description}</p>}

        <span className="task__subtask">
          {subtasksCount} of {subtasksCompleted} completed
        </span>
      </div>

      <style jsx>{`
        .task {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: var(--color-white);
          box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
          padding: 23px 16px;
          border-radius: 8px;
          max-width: 280px;

          &__title {
            font-size: var(--text-md);
            color: var(--color-black);
            font-weight: var(--fw-bold);
          }

          &__subtask {
            color: var(--color-md-gray);
          }
        }
      `}</style>
    </>
  );
};

export default Task;
