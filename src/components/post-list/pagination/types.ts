export type Props = {
  currentPage: number;
  allPages: number;
  basePath: string;
};

export type PrevPageProps = Omit<Props, 'allPages'>;

export type LinkToPageProps = {
  page: number;
  basePath: string;
};
