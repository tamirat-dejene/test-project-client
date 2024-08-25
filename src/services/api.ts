import { Music } from "../definitions/defn";

const fetchMusics = async ({ searchQuery, sortBy }: { 
  searchQuery?: string; 
  sortBy?: string;
}): Promise<Music[]> => {
  const musics = await fetch(
    `https://test-project-server-tamiu.vercel.app/musics?q=${searchQuery || ''}&o=${sortBy || ''}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
      },
    }
  );
  try {
    console.log(musics);
    if (!musics.ok) throw new Error("Failed to fetch musics");
    return musics.json();
  } catch (error) {
    console.error(error);
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


  try {
    const response = await fetch("https://test-project-server-tamiu.vercel.app/musics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
      },
      body: JSON.stringify(music),
    });
    if (!response.ok) throw new Error("Failed to create music");
    return response.json();
  } catch (error) {
    console.error(error);
    return music;
  }
};

const deleteMusic = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`https://test-project-server-tamiu.vercel.app/musics/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete music");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const updateMusic = async (id: number, updatedMusic: Music): Promise<Music> => {
  const music = {
    title: updatedMusic.title,
    artist: updatedMusic.artist,
    album: updatedMusic.album,
    genre: updatedMusic.genre,
    duration: updatedMusic.duration,
    url: updatedMusic.url,
  };

  try {
    const response = await fetch(`https://test-project-server-tamiu.vercel.app/musics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
      },
      body: JSON.stringify(music),
    });
    if (!response.ok) throw new Error("Failed to update music");
    return response.json();
  } catch (error) {
    console.error(error);
    return music;
  }
};

export { fetchMusics, createMusic, deleteMusic, updateMusic };
  
  
