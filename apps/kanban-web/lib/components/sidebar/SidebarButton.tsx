import classNames from 'classnames';
import React, { FC } from 'react';

export interface SidebarBoardProps {
  name: string;
  active?: boolean;
  paddingLeft?: string | number;
  maxNameLength?: number;
  color?: 'gray' | 'purple';
}

const SidebarBoard: FC<SidebarBoardProps> = ({
  name,
  active = false,
  paddingLeft = '32px',
  maxNameLength = 30,
  color = 'gray',
  ...props
}) => {
  const sliceName =
    name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;

  return (
    <>
      <button
        style={{ paddingLeft }}
        className={classNames(
          'board',
          active && 'board--active',
          `color--${color}`
        )}
      >
        {sliceName}
      </button>

      <style jsx>{`
        .board {
          font-size: var(--text-md);
          min-height: 48px;
          display: flex;
          align-items: center;
          border-radius: 0 100px 100px 0;
          cursor: pointer;
          appearance: none;
          background-color: transparent;
          outline: none;
          border: none;
          width: 100%;
          transition: background-color 0.15s linear;
          font-weight: var(--fw-bold);

          &:not(&--active):hover {
            background-color: var(--color-light-gray);
          }
        }

        .color {
          &--gray {
            color: var(--color-md-gray);
          }

          &--purple {
            color: var(--color-purple);
          }
        }

        .board--active {
          background-color: var(--color-purple);
          color: var(--color-white);
        }
      `}</style>
    </>
  );
};

export default SidebarBoard;
