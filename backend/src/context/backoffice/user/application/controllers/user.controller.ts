import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateUserHandler } from '../command/handlers/create-user.handler';
import { UserDto } from '../dtos/user.dto';
import { CreateUserCommand } from '../command/create-user.command';
import { GetUserHandler } from '../queries/handlers/get-user.handler';
import { ApiQuery } from '@nestjs/swagger';
import { Operator } from 'src/context/shared/domain/criteria/FilterOperator';
import { GetUserQuery } from '../queries/get-user.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly getUserHandler: GetUserHandler,
  ) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    const command = new CreateUserCommand(userDto.name, userDto.email);
    return this.createUserHandler.execute(command);
  }

  @Get()
  @ApiQuery({
    name: 'orderBy',
    type: String,
    required: false,
    description: 'Campo por el cual ordenar los resultados',
  })
  @ApiQuery({
    name: 'orderType',
    type: String,
    required: false,
    description: 'Dirección de orden (asc o desc)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Número máximo de resultados a retornar',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Número de resultados a saltar (para paginación)',
  })
  @ApiQuery({
    name: 'filters[0][value]',
    type: String,
    required: false,
    example: 'Jhon',
  })
  @ApiQuery({
    name: 'filters[0][operator]',
    enum: Operator,
    required: false,
    example: 'CONTAINS',
  })
  @ApiQuery({
    name: 'filters[0][field]',
    type: String,
    required: false,
    example: 'name',
  })
  async getUsers(@Query() query: any) {
    const order: any = { field: query.orderBy, direction: query.orderType };
    const userQuery = new GetUserQuery(
      query.filters,
      query.orderby ? order : null,
      query.limit,
      query.offset < 0 ? query.offset - 1 : 0,
    );
    return this.getUserHandler.execute(userQuery);
  }
}
