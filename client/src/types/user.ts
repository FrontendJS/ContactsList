export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  picture: Picture;
};

export type UserCardProps = {
  userId: number;
  profilePicture?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
};

export type searchParams = {
  name?: string;
};
