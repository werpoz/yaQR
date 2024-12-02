import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/emai.vo';
import { UserDto } from '../dtos/user.dto';

export class UserDtoToDomainMapper {
  static toDomain(dto: UserDto): User {
    return new User(dto.name, new Email(dto.email));
  }
}
