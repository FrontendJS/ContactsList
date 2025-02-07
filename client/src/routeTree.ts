import { Route as rootRoute } from '@/routes/__root';
import { Route as Index } from '@/routes/index';
import { Route as ContactsIndex } from '@/routes/contacts/index';
import { Route as ContactsByUsernameIndex } from '@/routes/contacts/$contactsUsername/index';
import { Route as ContactsByUsernameEdit } from '@/routes/contacts/$contactsUsername/edit';

export const routeTree = rootRoute.addChildren([
  Index,
  ContactsIndex.addChildren([ContactsByUsernameIndex, ContactsByUsernameEdit]),
]);
