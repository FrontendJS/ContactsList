import React from 'react';

type Fallback = {
  loading?: JSX.Element;
  error?: (message: string) => JSX.Element;
  empty?: JSX.Element;
};

type DataLoaderProps = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isEmpty: boolean;
  fallback?: Fallback;
  children: React.ReactNode;
};

const DataLoader: React.FC<DataLoaderProps> = ({
  isLoading,
  isError,
  error,
  isEmpty,
  fallback,
  children,
}) => {
  if (isLoading) {
    return fallback?.loading || <p>Loading...</p>;
  }

  if (isError) {
    return (
      fallback?.error?.(error?.message || 'Something went wrong') || (
        <p>Error: {error?.message || 'Something went wrong'}</p>
      )
    );
  }

  if (isEmpty) {
    return fallback?.empty || <p>No data available</p>;
  }

  return <>{children}</>;
};

export default DataLoader;
