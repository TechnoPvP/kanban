import {
  useCreateTaskMutation,
  useRetrieveBoardQuery,
} from '../../generated-types';
import { useRouter } from 'next/router';
import React from 'react';
import BoardHeader from '../../lib/views/board/BoardHeader';
import { Button } from '@kanban/client/ui';
import EmptyBoard from '../../lib/views/board/EmptyBoard';
import BoardColumn from '../../lib/views/board/BoardColumn';
import Task from '../../lib/views/board/Task';
import TaskModal from '../../lib/components/task-modal/TaskModal';

/* Note: Also have the ability to use server side rendering.  */
/* TODO: Handle errors */
const Board = () => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useRetrieveBoardQuery(
    { id: +router.query.boardId },
    { enabled: !!+router.query.boardId, onSuccess: () => console.log }
  );
  const { mutate, mutateAsync } = useCreateTaskMutation({});

  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <BoardHeader
        name={data.board.name}
        actions={
          <>
            <Button variant="primary" disabled={!data?.board?.columns?.length}>
              Add new task
            </Button>
          </>
        }
      />

      <TaskModal
        variant="create"
        onPrimaryAction={({ data }) => {
          return mutateAsync({ name: data.title, status: 'done' });
        }}
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
              >
                {column.tasks.map((task) => (
                  <Task
                    key={task.id}
                    title={task.name}
                    subtasksCount={0}
                    subtasksCompleted={10}
                  />
                ))}
              </BoardColumn>
            ))}
          </>
        )}
      </div>

      <style jsx>{`
        .columns {
          flex: 1 0 auto;
          width: 100%;
          display: flex;
          gap: 1rem;
          padding: 2rem;
        }
      `}</style>
    </>
  );
};

export default Board;
