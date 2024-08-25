type Music = {
  id?: number;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  duration: string;
  url: string;
};

type Mode = "create" | "edit";


export type { Music, Mode };
