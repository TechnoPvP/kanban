import React, { FC, useEffect } from 'react';
import Logo from '../icons/Logo';
import SidebarBoard from './SidebarButton';
import { useListBoardsQuery } from '../../../generated-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({ ...props }) => {
  const { isLoading, isSuccess, data } = useListBoardsQuery();

  return (
    <>
      <nav className="sidebar">
        <div className="logo">
          <Logo />
        </div>

        <div className="boards">
          <h4 className="boards__title">
            All Boards ({data?.boards?.length || '...'})
          </h4>

          {isSuccess &&
            data.boards.map((board) => (
              <SidebarBoard name={board.name} key={board.id} />
            ))}
          <SidebarBoard name="Create Board" color="purple" />
        </div>
      </nav>

      <style jsx>{`
        .sidebar {
          width: 300px;
          padding-right: 23px;
        }

        .logo {
          padding: 32px;
        }

        .boards {
          &__title {
            padding-left: 32px;
            padding-bottom: 5px;
            font-size: var(--text-body-md);
            text-transform: uppercase;
            color: var(--color-md-gray);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
