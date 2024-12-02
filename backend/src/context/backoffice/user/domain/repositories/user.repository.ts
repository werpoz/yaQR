import { Criteria } from 'src/context/shared/domain/criteria/Criteria';
import { User } from '../entities/user';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  matching(criteria: Criteria): Promise<{ data: User[]; meta: any }>;
  searchAll(): Promise<Array<User>>;
  save(user: User): Promise<void>;
}
