import * as _ from 'lodash/fp';
import { format } from 'date-fns/fp';

export const getDatePathForDate = (date: string) =>
  _.flowRight(
    (x) => '/archive/' + x,
    format('yyyy/MM'),
    (x) => new Date(x)
  )(date);
