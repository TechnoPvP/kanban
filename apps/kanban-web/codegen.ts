import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3333/graphql',
  documents: ['./lib/**/*.graphql'],
  generates: {
    './generated-types.ts': {
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        widthHooks: true,
        withMutationFn: true,
        fetcher: {
          endpoint: 'http://localhost:3333/graphql',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

// import { CodegenConfig } from '@graphql-codegen/cli'

// const config: CodegenConfig = {
//   schema: 'http://localhost:3333/graphql',
//   documents: ['./lib/**/*.graphql'],
//   // documents: ['/**/*.tsx'],
//   ignoreNoDocuments: true, // for better experience with the watcher
//   generates: {
//     './generated-graph/gql/': {
//       preset: 'client'
//     }
//   }
// }

// export default config
