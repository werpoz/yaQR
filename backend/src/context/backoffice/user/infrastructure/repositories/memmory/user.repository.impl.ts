import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Criteria } from 'src/context/shared/domain/criteria/Criteria';
import { Operator } from 'src/context/shared/domain/criteria/FilterOperator';

@Injectable()
export class UserRepositoryInMemmory implements UserRepository {
  private users: User[] = [];

  async matching(criteria: Criteria): Promise<{ data: User[]; meta: any }> {
    let result = [...this.users];

    criteria.filters.filters.forEach((filter) => {
      const { field, operator, value } = filter;

      result = result.filter((user) => {
        const userFieldValue = user[field.value as keyof User];

        switch (operator.value) {
          case Operator.CONTAINS:
            return (userFieldValue as string).includes(value.value);
          case Operator.EQUAL:
            return userFieldValue === value.value;
          case Operator.NOT_EQUAL:
            return userFieldValue !== value.value;
          default:
            return true;
        }
      });
    });

    if (criteria.order.hasOrder()) {
      const orderBy = criteria.order.orderBy.value as keyof User;
      const orderType = criteria.order.orderType.value;
      result = result.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return orderType === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return orderType === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    const total = result.length;

    const pageSize = Number(criteria.limit) || total;

    const pageCount = Math.ceil(total / pageSize);

    const page = Math.floor((criteria.offset || 0) / pageSize) + 1;

    if (criteria.offset !== undefined) {
      const offset = Math.max(criteria.offset, 0);
      result = result.slice(offset, offset + pageSize);
    }

    return {
      data: result,
      meta: {
        total,
        pageCount,
        page,
        pageSize,
      },
    };
  }

  async searchAll(): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<void> {
    const existingUser = this.users.find((u) => u.name === user.name);
    if (existingUser) {
      Object.assign(existingUser, user);
    } else {
      this.users.push(user);
    }
  }
}
