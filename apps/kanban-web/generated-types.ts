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
};

export type BoardEntity = {
  __typename?: 'BoardEntity';
  /** Board ID */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateBoardInput = {
  /** Board name */
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: BoardEntity;
  removeBoard: BoardEntity;
  updateBoard: BoardEntity;
};


export type MutationCreateBoardArgs = {
  createBoardInput: CreateBoardInput;
};


export type MutationRemoveBoardArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBoardArgs = {
  updateBoardInput: UpdateBoardInput;
};

export type Query = {
  __typename?: 'Query';
  board: BoardEntity;
  boards: Array<BoardEntity>;
};


export type QueryBoardArgs = {
  id: Scalars['Int'];
};

export type UpdateBoardInput = {
  id: Scalars['Int'];
  /** Board name */
  name?: InputMaybe<Scalars['String']>;
};

export type AllBoardDataFragment = { __typename?: 'BoardEntity', id: string, name: string };

export type ListBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'BoardEntity', id: string, name: string }> };

export const AllBoardDataFragmentDoc = `
    fragment AllBoardData on BoardEntity {
  id
  name
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