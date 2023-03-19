import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3333/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BoardEntity = {
  __typename?: 'BoardEntity';
  columns: Array<ColumnEntity>;
  /** Created at date */
  created_at: Scalars['DateTime'];
  /** Board ID */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ColumnEntity = {
  __typename?: 'ColumnEntity';
  baord_id: Scalars['Int'];
  color?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  done_column?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  tasks: Array<TaskEntity>;
};

export type CreateBoardInput = {
  /** Board name */
  name: Scalars['String'];
};

export type CreateColumnInput = {
  color?: InputMaybe<Scalars['String']>;
  done_column?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
};

export type CreateTaskInput = {
  column_id: Scalars['Int'];
  created_at?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: BoardEntity;
  createColumn: ColumnEntity;
  createTask: TaskEntity;
  removeBoard: BoardEntity;
  removeColumn: ColumnEntity;
  removeTask: TaskEntity;
  updateBoard: BoardEntity;
  updateColumn: ColumnEntity;
  updateTask: TaskEntity;
};


export type MutationCreateBoardArgs = {
  createBoardInput: CreateBoardInput;
};


export type MutationCreateColumnArgs = {
  createColumnInput: CreateColumnInput;
};


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationRemoveBoardArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveColumnArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBoardArgs = {
  updateBoardInput: UpdateBoardInput;
};


export type MutationUpdateColumnArgs = {
  updateColumnInput: UpdateColumnInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  board: BoardEntity;
  boards: Array<BoardEntity>;
  column: ColumnEntity;
  columns: Array<ColumnEntity>;
  task: TaskEntity;
  tasks: Array<TaskEntity>;
};


export type QueryBoardArgs = {
  id: Scalars['Int'];
};


export type QueryColumnArgs = {
  id: Scalars['Int'];
};


export type QueryTaskArgs = {
  id: Scalars['Int'];
};

export type SubtaskEntity = {
  __typename?: 'SubtaskEntity';
  id: Scalars['Int'];
  is_completed: Scalars['Boolean'];
  task_id: Scalars['Int'];
  title: Scalars['String'];
};

export type TaskEntity = {
  __typename?: 'TaskEntity';
  column_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['String'];
  subtasks: Array<SubtaskEntity>;
};

export type UpdateBoardInput = {
  id: Scalars['Int'];
  /** Board name */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateColumnInput = {
  color?: InputMaybe<Scalars['String']>;
  done_column?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdateTaskInput = {
  column_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type AllBoardDataFragment = { __typename?: 'BoardEntity', id: string, name: string, created_at: any };

export type ListBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'BoardEntity', id: string, name: string }> };

export type RetrieveBoardQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RetrieveBoardQuery = { __typename?: 'Query', board: { __typename?: 'BoardEntity', id: string, name: string, created_at: any, columns: Array<{ __typename?: 'ColumnEntity', id: number, name: string, color?: string | null, order?: number | null, done_column?: boolean | null, created_at: any, tasks: Array<{ __typename?: 'TaskEntity', id: number, name: string, status: string, column_id: number, created_at: any }> }> } };

export type CreateTaskMutationVariables = Exact<{
  name: Scalars['String'];
  status: Scalars['String'];
  column_id: Scalars['Int'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskEntity', id: number, name: string, status: string, created_at: any } };

export type UpdateTaskMutationVariables = Exact<{
  column_id: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['String'];
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'TaskEntity', id: number, name: string, status: string, column_id: number, created_at: any, subtasks: Array<{ __typename?: 'SubtaskEntity', id: number, title: string, is_completed: boolean }> } };

export const AllBoardDataFragmentDoc = `
    fragment AllBoardData on BoardEntity {
  id
  name
  created_at
}
    `;
export const ListBoardsDocument = `
    query ListBoards {
  boards {
    id
    name
  }
}
    `;
export const useListBoardsQuery = <
      TData = ListBoardsQuery,
      TError = unknown
    >(
      variables?: ListBoardsQueryVariables,
      options?: UseQueryOptions<ListBoardsQuery, TError, TData>
    ) =>
    useQuery<ListBoardsQuery, TError, TData>(
      variables === undefined ? ['ListBoards'] : ['ListBoards', variables],
      fetcher<ListBoardsQuery, ListBoardsQueryVariables>(ListBoardsDocument, variables),
      options
    );
export const RetrieveBoardDocument = `
    query RetrieveBoard($id: Int!) {
  board(id: $id) {
    id
    name
    columns {
      id
      name
      color
      order
      done_column
      created_at
      tasks {
        id
        name
        status
        column_id
        status
        created_at
      }
    }
    created_at
  }
}
    `;
export const useRetrieveBoardQuery = <
      TData = RetrieveBoardQuery,
      TError = unknown
    >(
      variables: RetrieveBoardQueryVariables,
      options?: UseQueryOptions<RetrieveBoardQuery, TError, TData>
    ) =>
    useQuery<RetrieveBoardQuery, TError, TData>(
      ['RetrieveBoard', variables],
      fetcher<RetrieveBoardQuery, RetrieveBoardQueryVariables>(RetrieveBoardDocument, variables),
      options
    );
export const CreateTaskDocument = `
    mutation CreateTask($name: String!, $status: String!, $column_id: Int!) {
  createTask(
    createTaskInput: {name: $name, status: $status, column_id: $column_id}
  ) {
    id
    name
    status
    created_at
  }
}
    `;
export const useCreateTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>) =>
    useMutation<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>(
      ['CreateTask'],
      (variables?: CreateTaskMutationVariables) => fetcher<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, variables)(),
      options
    );
export const UpdateTaskDocument = `
    mutation UpdateTask($column_id: Int!, $id: Int!, $name: String!, $status: String!) {
  updateTask(
    updateTaskInput: {column_id: $column_id, id: $id, name: $name, status: $status}
  ) {
    id
    name
    status
    column_id
    subtasks {
      id
      title
      is_completed
    }
    created_at
  }
}
    `;
export const useUpdateTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTaskMutation, TError, UpdateTaskMutationVariables, TContext>) =>
    useMutation<UpdateTaskMutation, TError, UpdateTaskMutationVariables, TContext>(
      ['UpdateTask'],
      (variables?: UpdateTaskMutationVariables) => fetcher<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, variables)(),
      options
    );