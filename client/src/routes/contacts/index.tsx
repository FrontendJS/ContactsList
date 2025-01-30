import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import UserCardEditable from '../../components/userCardEditable';

export const Route = createFileRoute('/contacts/')({
  component: AddContactComponent,
});

function AddContactComponent() {
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
