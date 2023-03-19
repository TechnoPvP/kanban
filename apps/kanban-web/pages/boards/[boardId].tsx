import {
  TaskEntity,
  useCreateTaskMutation,
  useRetrieveBoardQuery,
  useUpdateTaskMutation,
} from '../../generated-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BoardHeader from '../../lib/views/board/BoardHeader';
import { Button } from '@kanban/client/ui';
import EmptyBoard from '../../lib/views/board/EmptyBoard';
import BoardColumn from '../../lib/views/board/BoardColumn';
import Task from '../../lib/views/board/Task';
import TaskModal from '../../lib/components/task-modal/TaskModal';

/* TODO: Suggested features
  - Remember last board they were on (local storage)
*/

/* Note: Also have the ability to use server side rendering.  */
/* TODO: Handle errors */
const Board = () => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useRetrieveBoardQuery(
    { id: +router.query.boardId },
    { enabled: !!+router.query.boardId, onSuccess: () => console.log }
  );
  const { mutateAsync } = useCreateTaskMutation({});
  const updateTaskMutation = useUpdateTaskMutation({});

  const [isTaskModalOpen, setIsTaskModalOpen] = useState<
    false | 'create' | 'update'
  >(false);

  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState<
    false | TaskEntity
  >(false);

  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <BoardHeader
        name={data.board.name}
        actions={
          <>
            <Button
              variant="primary"
              disabled={!data?.board?.columns?.length}
              onClick={() => setIsTaskModalOpen('create')}
            >
              Add new task
            </Button>
          </>
        }
      />

      {isTaskModalOpen && typeof isTaskModalOpen === 'string' && (
        <TaskModal
          onClose={() => setIsTaskModalOpen(false)}
          variant={isTaskModalOpen}
          onPrimaryAction={({ data: task }) => {
            return mutateAsync({
              name: task.title,
              status: 'done',
              column_id: data.board.columns[0].id,
            });
          }}
        />
      )}

      {isUpdateTaskModalOpen && (
        <TaskModal
          defaultValues={isUpdateTaskModalOpen}
          variant="update"
          onClose={() => setIsUpdateTaskModalOpen(false)}
          onPrimaryAction={({ data: task }) => {
            return updateTaskMutation.mutateAsync({
              id: task.id,
              column_id: data.board.columns[0].id,
              name: task.title,
              status: 'done',
            });
          }}
        />
      )}

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
                tasks={column?.tasks?.length}
              >
                {column.tasks.map((task) => (
                  <Task
                    key={task.id}
                    title={task.name}
                    subtasksCount={0}
                    subtasksCompleted={10}
                    onClick={() =>
                      setIsUpdateTaskModalOpen({
                        column_id: task.column_id,
                        created_at: task.created_at,
                        id: task.id,
                        name: task.name,
                        status: task.status,
                        subtasks: [],
                      })
                    }
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
