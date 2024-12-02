import { ApiProperty } from '@nestjs/swagger';

export class CriteriaDto {
  @ApiProperty({
    description: 'Lista de filtros aplicados',
    type: [String],
    required: false,
  })
  filters?: string;

  @ApiProperty({
    description: 'Campo por el cual ordenar',
    type: String,
    required: false,
  })
  orderBy?: string;

  @ApiProperty({
    description: 'Dirección del orden (asc o desc)',
    type: String,
    required: false,
  })
  orderType?: string;

  @ApiProperty({
    description: 'Límite de resultados',
    type: Number,
    required: false,
  })
  limit?: number;

  @ApiProperty({
    description: 'Desplazamiento de los resultados',
    type: Number,
    required: false,
  })
  offset?: number;
}
