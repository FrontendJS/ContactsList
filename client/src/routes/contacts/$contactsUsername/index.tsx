import * as React from 'react';
import { createRoute } from '@tanstack/react-router';
import UserCard from '@/components/userCard';
import DataLoader from '@/components/core/dataLoader';
import { useGetData } from '@/hooks/useFetchData';
import { User } from '@/types/user';
import { Route as RootRoute } from '@/routes/__root';

export const Route = createRoute({
  path: '/contacts/$contactsUsername/',
  component: ContactComponent,
  getParentRoute: () => RootRoute,
});

function ContactComponent() {
  const { contactsUsername } = Route.useParams();
  const endpoint = `/api/contact/${contactsUsername}`;
  const { data, isLoading, isError, error } = useGetData<User>(endpoint);

  return (
    <div>
      <DataLoader isLoading={isLoading} isError={isError} error={error} isEmpty={false}>
        <UserCard
          userId={data?.id || 0}
          profilePicture={data?.picture?.large}
          firstname={data?.firstname || ''}
          lastname={data?.lastname || ''}
          username={data?.username || ''}
          email={data?.email || ''}
        />
      </DataLoader>
    </div>
  );
}
