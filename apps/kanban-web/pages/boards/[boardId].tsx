import { useRetrieveBoardQuery } from '../../generated-types';
import { useRouter } from 'next/router';
import React from 'react';
import BoardHeader from '../../lib/views/board/BoardHeader';
import { Button } from '@kanban/client/ui';
import EmptyBoard from '../../lib/views/board/EmptyBoard';
import BoardColumn from '../../lib/views/board/BoardColumn';

/* Note: Also have the ability to use server side rendering.  */
/* TODO: Handle errors */
const Board = () => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useRetrieveBoardQuery(
    { id: +router.query.boardId },
    { enabled: !!+router.query.boardId, onSuccess: () => console.log }
  );

  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <BoardHeader
        name={data.board.name}
        actions={
          <>
            <Button variant="primary" disabled={true}>
              Add new task
            </Button>
          </>
        }
      />

      <div className="columns">
        {!data.board.columns.length ? (
          <EmptyBoard />
        ) : (
          <>
            {data.board.columns.map((column) => (
              <BoardColumn
                isDoneColumn={column.done_column}
                name={column.name}
                color={column.color}
                key={column.id}
              />
            ))}
          </>
        )}
      </div>

      <style jsx>{`
        .columns {
          padding: 2rem;
        }
      `}</style>
    </>
  );
};

export default Board;
