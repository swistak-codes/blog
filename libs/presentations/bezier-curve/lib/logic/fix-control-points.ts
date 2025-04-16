import { Node } from 'reactflow';
import { sortBy } from 'lodash';

export const fixControlPoints = (points: Node[]) =>
  sortBy(points, (x) => x.data.order).map((x, i) => ({
    ...x,
    data: { order: i },
  }));
