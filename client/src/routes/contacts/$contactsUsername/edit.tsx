import * as React from 'react';
import { createRoute } from '@tanstack/react-router';
import DataLoader from '@/components/core/dataLoader';
import { useGetData } from '@/hooks/useFetchData';
import { User } from '@/types/user';
import UserCardEditable from '@/components/userCardEditable';
import { Route as RootRoute } from '@/routes/__root';

export const Route = createRoute({
  path: '/contacts/$contactsUsername/edit',
  component: EditContactComponent,
  getParentRoute: () => RootRoute,
});

function EditContactComponent() {
  const routeParams = Route.useParams();
  const contactsUsername = routeParams.contactsUsername || '';
  const endpoint = `/api/contact/${contactsUsername}`;
  const { data, isLoading, isError, error } = useGetData<User>(endpoint);

  if (!contactsUsername) {
    return (
      <div>
        <UserCardEditable
          userId={0}
          profilePicture={''}
          firstname={''}
          lastname={''}
          username={''}
          email={''}
        />
      </div>
    );
  }

  return (
    <div>
      <DataLoader isLoading={isLoading} isError={isError} error={error} isEmpty={false}>
        <UserCardEditable
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
