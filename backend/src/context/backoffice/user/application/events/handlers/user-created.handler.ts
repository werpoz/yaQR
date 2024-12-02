// src/users/application/events/handlers/user-created.handler.ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(`Handling UserCreatedEvent for userId: ${event.name}`);
  }
}
