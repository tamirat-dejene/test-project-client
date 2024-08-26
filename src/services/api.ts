import { Music } from "../definitions/defn";

const fetchMusics = async ({
  searchQuery,
  sortOption,
}: {
  searchQuery?: string;
  sortOption?: string;
}): Promise<Music[]> => {
  try {
    const response = await fetch(
      `https://test-project-server-tdejene.vercel.app/musics?q=${
        searchQuery || ""
      }&o=${sortOption || ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch musics");
    }

    const musics = await response.json();
    // console.log("Musics fetched:", musics);
    return musics;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching musics:", error);
    return [];
  }
};

const createMusic = async (newMusic: Music): Promise<Music> => {
  const music = {
    title: newMusic.title,
    artist: newMusic.artist,
    album: newMusic.album,
    genre: newMusic.genre,
    duration: newMusic.duration,
    url: newMusic.url,
  };
  const response = await fetch(
    "https://test-project-server-tdejene.vercel.app/musics",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
      },
      body: JSON.stringify(music),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create music");
  }

  const data = await response.json();
  return data;
};

const deleteMusic = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://test-project-server-tdejene.vercel.app/musics/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

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

const updateMusic = async (id: number, updatedMusic: Music): Promise<Music> => {
  const music = {
    id: id,
    title: updatedMusic.title,
    artist: updatedMusic.artist,
    album: updatedMusic.album,
    genre: updatedMusic.genre,
    duration: updatedMusic.duration,
    url: updatedMusic.url,
  };

  const response = await fetch(
    `https://test-project-server-tdejene.vercel.app/musics/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
      },
      body: JSON.stringify(music),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update music");
  }

  const data = await response.json();
  return data;
};

export { fetchMusics, createMusic, deleteMusic, updateMusic };
