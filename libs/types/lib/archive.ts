export type Archive = {
  year: string;
  month: number;
  monthName: string;
  slug: string;
};

export type GroupedArchive = Record<string, Archive[]>;
