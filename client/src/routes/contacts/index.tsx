import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import UserCardEditable from '../../components/userCardEditable';

export const Route = createFileRoute('/contacts/')({
  component: EditContactComponent,
});

function EditContactComponent() {
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
