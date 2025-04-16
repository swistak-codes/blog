export type LinkTree = {
  name: string;
  slug?: string;
  children: LinkTree[];
  count?: number;
};
