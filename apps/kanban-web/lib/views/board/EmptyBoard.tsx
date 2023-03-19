import { Button } from '@kanban/client/ui';
import React, { FC } from 'react';

export interface EmptyBoardProps {
  emptyMessage?: string;
  onClick?: () => void;
}

const EmptyBoard: FC<EmptyBoardProps> = ({
  emptyMessage,
  onClick,
  ...props
}) => {
  return (
    <>
      <div className="empty">
        <h2>{emptyMessage}</h2>
        <Button onClick={onClick}>Add new Column</Button>
      </div>

      <style jsx>{``}</style>
    </>
  );
};

export default EmptyBoard;
