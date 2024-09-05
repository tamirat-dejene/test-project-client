import {
  AuthResponse,
  FetchMusicOptions,
  Music,
  User,
} from "../definitions/defn";

const api_url = process.env.VITE_API_URL_LOCAL;

const refreshSession = async (): Promise<AuthResponse> => {
  const response = await fetch(`${api_url}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to refresh session");
  }
  const accessToken =
    response.headers.get("Authorization")?.split(" ")[1] || null;
  const user = await response.json();
  return { user, accessToken };
};

const loginUser = async (user: User): Promise<AuthResponse> => {
  const response = await fetch(`${api_url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login user");
  }

  const accessToken =
    response.headers.get("Authorization")?.split(" ")[1] || null;
  user = await response.json();
  return { user, accessToken };
};

const logoutUser = async (): Promise<boolean> => {
  const response = await fetch(`${api_url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to logout user");
  }

  return response.ok;
};

const registerUser = async (user: User): Promise<User> => {
  const reposnse = await fetch(`${api_url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!reposnse.ok) {
    const errorData = await reposnse.json();
    throw new Error(errorData.message || "Failed to register user");
  }

  const data = await reposnse.json();
  return data;
};

const fetchMusics = async ({
  authToken,
  searchQuery,
  sortOption,
}: FetchMusicOptions): Promise<Music[]> => {
  try {
    const response = await fetch(
      `${api_url}/musics?q=${searchQuery || ""}&o=${sortOption || ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch musics");
    }

    const musics = await response.json();
    return musics;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching musics:", error);
    return [];
  }
};

const createMusic = async (
  newMusic: Music,
  authToken: string | null
): Promise<Music> => {
  const music = {
    title: newMusic.title,
    artist: newMusic.artist,
    album: newMusic.album,
    genre: newMusic.genre,
    duration: newMusic.duration,
    url: newMusic.url,
  };

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${api_url}/musics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(music),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create music");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error creating music:", error);
    throw error;
  }
};

const deleteMusic = async (
  id: number,
  authToken: string | null
): Promise<boolean> => {
  try {
    const response = await fetch(`${api_url}/musics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete music");
    }

    return true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error deleting music:", error);
    return false;
  }
};

const updateMusic = async (
  id: number,
  updatedMusic: Music,
  authToken: string | null
): Promise<Music> => {
  const music = {
    id: id,
    title: updatedMusic.title,
    artist: updatedMusic.artist,
    album: updatedMusic.album,
    genre: updatedMusic.genre,
    duration: updatedMusic.duration,
    url: updatedMusic.url,
  };

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${api_url}/musics/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(music),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update music");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error updating music:", error);
    throw error;
  }
};

export {
  fetchMusics,
  createMusic,
  deleteMusic,
  updateMusic,
  loginUser,
  logoutUser,
  registerUser,
  refreshSession,
};
