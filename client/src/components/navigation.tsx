import * as React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useGetData } from '../hooks/useFetchData';
import DataLoader from './core/dataLoader';
import { User } from '../types/user';
import SearchBar from './searchBar';
import { useQueryClient } from '@tanstack/react-query';

const Navigation: React.FC = () => {
  const endpoint = '/api/items';
  const [searchTerm, setSearchTerm] = React.useState('');
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetData<User[]>(endpoint, { name: searchTerm });
  const location = useLocation();

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [endpoint],
    });
  }, [location]);

  return (
    <nav className="w-72 p-4 bg-white border-r h-screen">
      <div className="h-full overflow-y-auto">
        <div className="flex space-x-2">
          <SearchBar value={searchTerm} onSearchChange={setSearchTerm} />
          <Link
            to="/contacts"
            activeProps={{
              className: 'font-bold text-blue-500',
            }}
          >
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add
            </button>
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          <DataLoader isLoading={isLoading} isError={isError} error={error} isEmpty={!data?.length}>
            {data?.map((user: User) => (
              <li key={user.id}>
                <Link
                  to="/contacts/$contactsUsername"
                  params={{ contactsUsername: user.username }}
                  activeProps={{
                    className: 'font-bold text-blue-500',
                  }}
                >
                  {user.firstname} {user.lastname}
                </Link>
              </li>
            ))}
          </DataLoader>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
