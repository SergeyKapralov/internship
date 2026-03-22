export type TMovie = {
  name: string;
  alternativeName: string | null;
  description: string | null;
  shortDescription: string | null;
  year: number;
  rating: { kp: number };
  poster: { url: string | null };
  genres: Array<{ name: string }>;
  persons: Array<{ name: string; profession: string | null }>;
};
