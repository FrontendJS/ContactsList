import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCardProps } from '../types/user';
import { useMutateData } from '../hooks/useFetchData';
import { HttpMethod } from '../types/http';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  firstname: z.string().min(4, 'First name is required'),
  lastname: z.string().min(4, 'Last name is required'),
  email: z.string().email('Please enter a valid email address').min(6, 'Email is required'),
});

type FormData = z.infer<typeof schema>;

const UserCardEditable: React.FC<UserCardProps> = ({
  userId,
  profilePicture,
  firstname,
  lastname,
  username,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
    },
  });
  const endpoint = userId === 0 ? '/api/items' : `/api/items/${userId}`;
  const method: HttpMethod = userId === 0 ? 'POST' : 'PUT';
  const mutation = useMutateData<UserCardProps>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const changedData: Partial<FormData> = {};
    const defaultValues = {
      firstname,
      lastname,
      email,
    };

    for (const key in data) {
      if (data[key as keyof FormData] !== defaultValues[key as keyof FormData]) {
        changedData[key as keyof FormData] = data[key as keyof FormData];
      }
    }

    mutation.mutate(
      { endpoint, method, params: changedData },
      {
        onSuccess: () => {
          router.navigate({ to: `/contacts/${username}` });
        },
        onError: error => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center p-4 border rounded-lg shadow-md  max-w-xl">
        <img
          src={profilePicture}
          alt={`${username}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="ml-4 flex-1">
          <p className="text-lg">
            <label htmlFor="firstname">First Name:</label>
            <input className="border" id="firstname" {...register('firstname')} />
            {errors.firstname && <p>{errors.firstname.message}</p>}
          </p>
          <p className="text-lg">
            <label htmlFor="lastname">Last Name:</label>
            <input className="border" id="lastname" {...register('lastname')} />
            {errors.lastname && <p>{errors.lastname.message}</p>}
          </p>
          <p className="text-sm text-blue-500">@{username}</p>
          <p className="text-sm text-gray-600 ">
            <label htmlFor="email">Email:</label>
            <input className="border" id="email" type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
          </p>
          <div className="flex p4 gap-2 flex-row-reverse">
            <button
              type="submit"
              // onClick={onEdit}
              className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserCardEditable;
