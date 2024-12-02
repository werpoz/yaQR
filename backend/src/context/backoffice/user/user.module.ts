import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './application/controllers/user.controller';
import { CreateUserHandler } from './application/command/handlers/create-user.handler';
import { UserRepositoryInMemmory } from './infrastructure/repositories/memmory/user.repository.impl';
import { GetUserHandler } from './application/queries/handlers/get-user.handler';
import { UserCreatedEventHandler } from './application/events/handlers/user-created.handler';
import { USER_REPOSITORY } from './domain/repositories/user.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    GetUserHandler,
    UserCreatedEventHandler,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryInMemmory,
    },
  ],
})
export class UserModule {}
