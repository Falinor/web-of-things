import { success, notFound } from '../../services/response';
import Access from './model';

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Access.find(query, select, cursor)
    .then(success(res))
    .catch(next);
