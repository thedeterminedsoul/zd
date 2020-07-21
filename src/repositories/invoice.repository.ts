import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Invoice, InvoiceRelations} from '../models';

export class InvoiceRepository extends DefaultTransactionalRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Invoice, dataSource);
  }
}
