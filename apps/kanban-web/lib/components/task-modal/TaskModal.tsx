import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Overlay, TextInput } from '@kanban/client/ui';
import { FC, useState } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

export interface TaskModalProps {
  variant: 'update' | 'create';
  onClose: () => void;
  /**
   * Primary action would either be to create or update the task
   */
  onPrimaryAction: (params: { data: CreateTaskSchema }) => Promise<any>;
}

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

const TaskModal: FC<TaskModalProps> = ({ onPrimaryAction, ...props }) => {
  const {
    handleSubmit,
    control,
    getValues,
    register,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { title: '', description: '' },
  });

  const handleSuccessfulSubmit: SubmitHandler<CreateTaskSchema> = async (
    data
  ) => {
    props.onClose();

    const response = await onPrimaryAction({ data });
  };

  const handleInvalidSubmit: SubmitErrorHandler<CreateTaskSchema> = (error) => {
    console.log(error);
  };

  return (
    <>
      <Overlay onClick={props?.onClose} />

      <form
        className="modal"
        onSubmit={handleSubmit(handleSuccessfulSubmit, handleInvalidSubmit)}
      >
        <h1 className="modal__title">Add new subtask</h1>

        <Controller
          name="title"
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              label="Title"
              placeholder="e.g. Take coffee break"
              error={errors?.title?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextInput
              label="Description"
              placeholder="e.g. Take coffee break"
              error={errors?.description?.message}
              {...field}
            />
          )}
        />

        <div className="subtasks">
          <TaskModalSubtask />
        </div>

        <Button type="submit" size="small" variant="primary">
          Create Task
        </Button>
      </form>

      <style jsx>{`
        .modal {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: fixed;
          z-index: 20;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 480px;
          height: 500px;
          overflow-y: auto;
          background-color: var(--color-white);
          border-radius: 6px;
          padding: 32px;

          &__title {
            background-color: var(--color-white);
            width: 100%;
            font-size: var(--text-lg);
            position: sticky;
            top: -15px;
            color: var(--color-black);
          }
        }

        .subtasks {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default TaskModal;

export interface TaskModalSubtaskProps {
  subtasks?: { value: string }[];
}

const TaskModalSubtask: FC<TaskModalSubtaskProps> = ({
  subtasks: subtaskList,
  ...props
}) => {
  const EMPTY_SUBTASKS: TaskModalSubtaskProps['subtasks'] = [
    { value: '' },
    { value: '' },
  ];

  const SUBTASK_PLACEHOLDERS = [
    'e.g.g Take a coffee break',
    'e.g. Drink coffee & smile',
  ];

  const DEFAULT_SUBTASK_PLACEHOLDERS = 'Add new subtask';

  const [subtasks, setSubtasks] = useState(subtaskList || EMPTY_SUBTASKS);

  return (
    <>
      {subtasks.map((subtask, i) => (
        <div className="subtask" key={crypto.randomUUID()}>
          <TextInput
            name="subtask"
            label={i === 0 ? 'Subtasks' : ''}
            placeholder={
              SUBTASK_PLACEHOLDERS[i] || DEFAULT_SUBTASK_PLACEHOLDERS
            }
          />

          <button
            className="remove-action"
            onClick={() => {
              setSubtasks((subtasks) =>
                subtasks.filter((subtask, subtaskIndex) => subtaskIndex !== i)
              );
            }}
          >
            <span>X</span>
          </button>
        </div>
      ))}
      <Button
        size="small"
        variant="secondary"
        onClick={() =>
          setSubtasks((subtasks) => [...subtasks, { value: 'Enter a subtask' }])
        }
      >
        Add New Subtask
      </Button>

      <style jsx>
        {`
          .subtask {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .remove-action {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: background-color 0.15s ease-out;
            background-color: transparent;
            cursor: pointer;
            appearance: none;
            border: none;
            padding: 0;
            outline: none;

            &:hover {
              background-color: rgba(0, 0, 0, 0.0419);
            }
          }
        `}
      </style>
    </>
  );
};
