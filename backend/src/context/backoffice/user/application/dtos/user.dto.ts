import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  public readonly name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  public readonly email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
