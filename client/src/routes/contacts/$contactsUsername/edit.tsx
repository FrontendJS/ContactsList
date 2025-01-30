import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import DataLoader from '../../../components/core/dataLoader';
import { useGetData } from '../../../hooks/useFetchData';
import { User } from '../../../types/user';
import UserCardEditable from '../../../components/userCardEditable';

export const Route = createFileRoute('/contacts/$contactsUsername/edit')({
  component: EditContactComponent,
});

function EditContactComponent() {
  const { contactsUsername } = Route.useParams();
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
