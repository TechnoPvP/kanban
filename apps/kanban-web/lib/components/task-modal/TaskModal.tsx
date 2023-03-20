import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Overlay, TextInput, Select, Option } from '@kanban/client/ui';
import { SubtaskEntity, TaskEntity } from '../../../generated-types';
import { FC, useRef, useState } from 'react';
import {
  Control,
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { z } from 'zod';

export interface TaskModalProps {
  variant: 'update' | 'create';
  onClose: () => void;
  defaultValues?: TaskEntity;
  /**
   * Primary action would either be to create or update the task
   */
  onPrimaryAction: (params: {
    data: CreateTaskSchema & { id?: number };
  }) => Promise<any>;
}

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  subtasks: z
    .object({
      title: z.string(),
      is_completed: z.boolean(),
    })
    .array()
    .optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

const TaskModal: FC<TaskModalProps> = ({
  onPrimaryAction,
  defaultValues,
  variant,
  ...props
}) => {
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
    defaultValues: { title: defaultValues?.name ?? '', description: '' },
  });

  const handleSuccessfulSubmit: SubmitHandler<CreateTaskSchema> = async (
    data
  ) => {
    props.onClose();

    const response = await onPrimaryAction({
      data: { ...data, id: defaultValues?.id },
    });

    console.log(response);
  };

  const handleInvalidSubmit: SubmitErrorHandler<CreateTaskSchema> = (error) => {
    console.log(error);
  };

  const { current: isCreateModal } = useRef(variant === 'create');

  return (
    <>
      <Overlay onClick={props?.onClose} />

      <form
        className="modal"
        onSubmit={handleSubmit(handleSuccessfulSubmit, handleInvalidSubmit)}
      >
        <h1 className="modal__title">
          {isCreateModal ? 'Add new' : 'Update'} task
        </h1>

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
          <TaskModalSubtask
            control={control}
            showPlaceholderSubtasks={variant === 'create' ? true : false}
          />
        </div>

        <Select name="status">
            <Option value="To-do">To-Do</Option>
            <Option value="Working">Working</Option>
            <Option value="Done">Done</Option>
        </Select>

        <Button type="submit" size="small" variant="primary">
          {isCreateModal ? 'Create Task' : 'Save Changes'}
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

interface SubtasksWithAnyNumber {
  [key: `subtasks${number}.title`]: TaskEntity;
}
export interface TaskModalSubtaskProps {
  subtasks?: SubtaskEntity[];
  control: Control<CreateTaskSchema & SubtasksWithAnyNumber>;
  /**
   * @description
   * When there are no subtasks show two placeholder subtasks
   */
  showPlaceholderSubtasks?: boolean;
}

export type AnyNumber = `subtasks[1]title`;
const TaskModalSubtask: FC<TaskModalSubtaskProps> = ({
  subtasks: subtaskList,
  showPlaceholderSubtasks = true,
  control,
  ...props
}) => {
  const EMPTY_SUBTASKS: TaskModalSubtaskProps['subtasks'] = [
    { title: '', is_completed: false, id: NaN, task_id: NaN },
    { title: '', is_completed: false, id: NaN, task_id: NaN },
  ];

  const SUBTASK_PLACEHOLDERS = [
    'e.g.g Take a coffee break',
    'e.g. Drink coffee & smile',
  ];

  const DEFAULT_SUBTASK_PLACEHOLDERS = 'Add new subtask';

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'subtasks',
  });

  return (
    <>
      {fields.map((subtask, index) => {
        return (
          <div className="subtask" key={subtask.id}>
            <Controller
              name={`subtasks.${index}.title`}
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextInput
                  label={index === 0 ? 'Subtasks' : ''}
                  placeholder={
                    SUBTASK_PLACEHOLDERS[index] || DEFAULT_SUBTASK_PLACEHOLDERS
                  }
                  value={field.name ?? ''}
                  {...field}
                />
              )}
            />

            <button
              className="remove-action"
              onClick={() => {
                remove(index);
              }}
            >
              <span>X</span>
            </button>
          </div>
        );
      })}
      <Button
        size="small"
        variant="secondary"
        onClick={() => append({ title: '', is_completed: false })}
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
