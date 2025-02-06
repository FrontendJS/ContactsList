import * as React from 'react';
import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from '@/routes/__root';

export const Route = createRoute({
  path: '/',
  component: HomeComponent,
  getParentRoute: () => RootRoute,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
