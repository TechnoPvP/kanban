import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, PropsWithChildren } from 'react';
import Sidebar from '../components/sidebar/Sidebar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootLayoutProps extends PropsWithChildren {}

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient({});

const RootLayout: FC<RootLayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <div className="layout">
            <Sidebar />

            <main>{children}</main>
          </div>
        </ApolloProvider>
      </QueryClientProvider>

      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: auto 1fr;
          height: 100%;
          width: 100%;
          border: 1px solid green;
          height: 100vh;
        }

        main {
          width: 100%;
          height: 100%;
          background-color: var(--color-light-gray);
        }
      `}</style>
    </>
  );
};

export default RootLayout;
