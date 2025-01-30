import React, { useState } from 'react';
import { UserCardProps } from '../types/user';
import { HttpMethod } from '../types/http';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import Modal from './core/modal';
import Agreement from './core/agreement';
import { useMutateData } from '../hooks/useFetchData';
import { useQueryClient } from '@tanstack/react-query';

const UserCard: React.FC<UserCardProps> = ({
  userId,
  profilePicture,
  firstname,
  lastname,
  username,
  email,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const method: HttpMethod = 'DELETE';
  const mutation = useMutateData<UserCardProps>();
  const endpoint = `/api/items/${userId}`;
  const router = useRouter();

  const deleteContact = () => {
    mutation.mutate(
      { endpoint, method, params: {} },
      {
        onSuccess: () => {
          router.navigate({ to: '/' });
        },
        onError: (error: { message: unknown }) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="flex items-center p-4 bg-white border rounded-lg shadow-md max-w-md">
      <Modal isOpen={isOpen}>
        <Agreement
          title={`consent to delete ${firstname} ${lastname}`}
          description={'Are you sure?'}
          agree={deleteContact}
          cancel={closeModal}
        />
      </Modal>

      <img
        src={profilePicture}
        alt={`${username}'s profile`}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="ml-4 flex-1">
        <h2 className="text-lg font-bold text-gray-800">
          <p>
            {firstname} {lastname}
          </p>
        </h2>
        <p className="text-sm text-blue-500">@{username}</p>
        <p className="text-sm text-gray-600 ">{email}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to="/contacts/$contactsUsername/edit"
          params={{ contactsUsername: username }}
          activeProps={{
            className: 'font-bold text-blue-500',
          }}
        >
          <button
            // onClick={onEdit}
            className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md"
          >
            Edit
          </button>
        </Link>

        <button
          onClick={openModal}
          className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
