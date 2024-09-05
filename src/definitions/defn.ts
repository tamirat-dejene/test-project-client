type Music = {
  id?: number;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  duration: string;
  url: string;
};

type User = {
  id?: number;
  username?: string;
  email: string;
  password: string;
};

type Mode = "create" | "edit";

interface AuthResponse {
  accessToken: string | null;
  user: User;
}

interface FetchMusicOptions {
  authToken: string | null;
  searchQuery?: string;
  sortOption?: string;
}


export type { User, Music, Mode, AuthResponse, FetchMusicOptions };
