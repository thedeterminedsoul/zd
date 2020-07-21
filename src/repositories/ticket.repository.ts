import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ticket, TicketRelations} from '../models';

export class TicketRepository extends DefaultTransactionalRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Ticket, dataSource);
  }
}
