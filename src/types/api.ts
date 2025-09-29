export interface Muscle {
  id: number;
  name: string;
  name_en?: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
}

export interface Exercise {
  id: number;
  name: string;
  description?: string;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  category: number;
  language: number;
  license: number;
  license_author: string;
  images: string[];
  comments: string[];
  variations: number[];
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface FormattedExercise {
  name: string;
  description: string;
  otherMuscles: number[];
}
