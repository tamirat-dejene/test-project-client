import { Music } from "../definitions/defn";

const getMusics = async (): Promise<Music[]> => {
  const musics = await fetch("mockmusics.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  try {
    if (!musics.ok) throw new Error("Failed to fetch musics");
    return musics.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getMusics };
