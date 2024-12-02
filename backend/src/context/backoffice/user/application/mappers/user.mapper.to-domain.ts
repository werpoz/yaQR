import { User } from '../../domain/entities/user';
import { UserDto } from '../dtos/user.dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    if (!user) {
      return null;
    }
    return new UserDto(user.name, user.email.value);
  }
}
