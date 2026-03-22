export type TMovie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  movieLength: number | null;
  genres: Array<{ name: string }>;
};
