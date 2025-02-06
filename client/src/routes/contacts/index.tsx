import * as React from 'react';
import { createRoute } from '@tanstack/react-router';
import UserCardEditable from '@/components/userCardEditable';
import { Route as RootRoute } from '@/routes/__root';

export const Route = createRoute({
  path: '/contacts',
  component: AddContactComponent,
  getParentRoute: () => RootRoute,
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
