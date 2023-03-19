import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: BoardEntity;
  createColumn: ColumnEntity;
  removeBoard: BoardEntity;
  removeColumn: ColumnEntity;
  updateBoard: BoardEntity;
  updateColumn: ColumnEntity;
};


export type MutationCreateBoardArgs = {
  createBoardInput: CreateBoardInput;
};


export type MutationCreateColumnArgs = {
  createColumnInput: CreateColumnInput;
};


export type MutationRemoveBoardArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveColumnArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBoardArgs = {
  updateBoardInput: UpdateBoardInput;
};


export type MutationUpdateColumnArgs = {
  updateColumnInput: UpdateColumnInput;
};

export type Query = {
  __typename?: 'Query';
  board: BoardEntity;
  boards: Array<BoardEntity>;
  column: ColumnEntity;
  columns: Array<ColumnEntity>;
};


export type QueryBoardArgs = {
  id: Scalars['Int'];
};


export type QueryColumnArgs = {
  id: Scalars['Int'];
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

export type AllBoardDataFragment = { __typename?: 'BoardEntity', id: string, name: string, created_at: any };

export type ListBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'BoardEntity', id: string, name: string }> };

export type RetrieveBoardQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RetrieveBoardQuery = { __typename?: 'Query', board: { __typename?: 'BoardEntity', id: string, name: string, created_at: any, columns: Array<{ __typename?: 'ColumnEntity', id: number, name: string, color?: string | null, order?: number | null, done_column?: boolean | null, created_at: any }> } };

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