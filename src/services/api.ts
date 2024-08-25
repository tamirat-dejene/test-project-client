import { Music } from "../definitions/defn";

const fetchMusics = async ({
  searchQuery,
  sortBy,
}: {
  searchQuery?: string;
  sortBy?: string;
}): Promise<Music[]> => {
  try {
    const response = await fetch(
      `https://test-project-server-tamiu.vercel.app/musics?q=${
        searchQuery || ""
      }&o=${sortBy || ""}`,
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

  // try {
  const response = await fetch(
    "https://test-project-server-tamiu.vercel.app/musics",
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
  // } catch (error) {
  //   // console.error("Error creating music:", error);
  //   throw error;
  // }
};

const deleteMusic = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://test-project-server-tamiu.vercel.app/musics/${id}`,
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

  // try {
  const response = await fetch(
    `https://test-project-server-tamiu.vercel.app/musics/${id}`,
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
  // console.log(data);
  return data;
  // } catch (error) {
  // console.error("Error updating music:", error);
  //   throw error;
  // }
};

export { fetchMusics, createMusic, deleteMusic, updateMusic };
