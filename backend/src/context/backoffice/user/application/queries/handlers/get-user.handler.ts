import { Inject, Injectable } from '@nestjs/common';
import { GetUserQuery } from '../../queries/get-user.query';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';

@Injectable()
export class GetUserHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserQuery) {
    return await this.userRepository.matching(query.toCriteria());
  }
}
