import { Criteria } from 'src/context/shared/domain/criteria/Criteria';
import { Filter } from 'src/context/shared/domain/criteria/Filter';
import { FilterField } from 'src/context/shared/domain/criteria/FilterField';
import { FilterOperator } from 'src/context/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/context/shared/domain/criteria/Filters';
import { FilterValue } from 'src/context/shared/domain/criteria/FilterValue';
import { Order } from 'src/context/shared/domain/criteria/Order';
import { OrderBy } from 'src/context/shared/domain/criteria/OrderBy';
import { OrderType } from 'src/context/shared/domain/criteria/OrderType';

export class GetUserQuery {
  readonly filters: Array<{ field: string; operator: string; value: any }>;
  readonly order?: { field: string; direction: 'asc' | 'desc' };
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filters: Array<{ field: string; operator: string; value: any }>,
    order?: { field: string; direction: 'asc' | 'desc' },
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters || [];
    this.order = order || null;
    this.limit = limit;
    this.offset = offset;
  }

  /**
   * Convierte los datos del query en una instancia de Criteria.
   */
  toCriteria(): Criteria {
    const filters = new Filters(
      this.filters.map((f) => {
        return new Filter(
          new FilterField(f.field),
          FilterOperator.fromValue(f.operator),
          new FilterValue(f.value),
        );
      }),
    );

    const order = this.order
      ? new Order(
          new OrderBy(this.order.field),
          OrderType.fromValue(this.order.direction),
        )
      : Order.none();

    return new Criteria(filters, order, this.limit, this.offset);
  }
}
