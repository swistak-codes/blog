import React, { LazyExoticComponent } from 'react';

export enum Tabs {
  Maze,
  Grid,
  Map,
}

const Maze = React.lazy(() => import('../maze/maze'));
const Grid = React.lazy(() => import('../grid/grid'));
const Map = React.lazy(() => import('../map/map'));

export const tabComponentMap: Record<
  Tabs,
  LazyExoticComponent<() => JSX.Element>
> = {
  [Tabs.Maze]: Maze,
  [Tabs.Grid]: Grid,
  [Tabs.Map]: Map,
};

export const tabsList = [
  { name: 'Labirynt', tab: Tabs.Maze },
  { name: 'Siatka gry', tab: Tabs.Grid },
  { name: 'Mapa', tab: Tabs.Map },
];
