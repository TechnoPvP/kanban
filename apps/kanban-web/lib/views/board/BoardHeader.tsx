import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

export interface BoardHeaderProps {
  name: string;
  actions?: ReactNode;
}

const BoardHeader: FC<BoardHeaderProps> = ({ name, actions, ...props }) => {
  return (
    <>
      <header>
        <h1 className="title">{name}</h1>

        <div className="actions">{actions}</div>
      </header>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          background-color: var(--color-white);

          .title {
            font-size: var(--text-xl);
          }
        }
      `}</style>
    </>
  );
};

export default BoardHeader;
