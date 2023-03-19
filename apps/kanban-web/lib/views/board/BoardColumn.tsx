import React, { FC, PropsWithChildren } from 'react';

export interface BoardColumnProps extends PropsWithChildren {
  name: string;
  color: string;
  isDoneColumn: boolean;
  tasks?: number;
}

const BoardColumn: FC<BoardColumnProps> = ({
  name,
  color,
  isDoneColumn,
  tasks,
  ...props
}) => {
  return (
    <>
      <div className="column">
        <header className="header">
          <div className="header__color"></div>
          <div className="header__title">
            {name} ({tasks || 0})
          </div>
        </header>
      </div>

      <style jsx>{`
        .column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 12px;

          &__color {
            border-radius: 50%;
            background-color: ${color};
            width: 15px;
            height: 15px;
          }

          &__title {
            font-size: var(--text-sm);
            font-weight: var(--fw-bold);
            color: var(--color-md-gray);
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  );
};

export default BoardColumn;
