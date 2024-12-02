import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../create-user.command';
import { Email } from '../../../domain/value-objects/emai.vo';
import { User } from '../../../domain/entities/user';
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../events/user-created.event';
import { UserMapper } from '../../mappers/user.mapper.to-domain';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = new User(command.name, new Email(command.email));

    await this.userRepository.save(user);

    this.eventBus.publish(new UserCreatedEvent(user.name, user.email.value));
    return UserMapper.toDto(user);
  }
}
