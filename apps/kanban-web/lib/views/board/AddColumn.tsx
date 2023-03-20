import React, { FC } from 'react';

export interface AddColumnProps {
  onAddColumn: () => void;
}

const AddColumn: FC<AddColumnProps> = ({ onAddColumn, ...props }) => {
  return (
    <>
      <button className="add-column" onClick={onAddColumn}>
        <h1 className="add-column-text">Add column</h1>
      </button>

      <style jsx>{`
        .add-column {
          appearance: none;
          border: none;
          outline: none;
          background-color: transparent;
          cursor: pointer;
          flex: 1 0 auto;
          width: 200px;
          background: linear-gradient(
            180deg,
            #e9effa 0%,
            rgba(233, 239, 250, 0.5) 100%
          );
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;

          .add-column-text {
            font-size: var(--text-xl);
            color: var(--color-md-gray);
          }
        }
      `}</style>
    </>
  );
};

export default AddColumn;
