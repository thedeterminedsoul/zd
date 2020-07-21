import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ParkingSpace, ParkingSpaceRelations} from '../models';

export class ParkingSpaceRepository extends DefaultTransactionalRepository<
  ParkingSpace,
  typeof ParkingSpace.prototype.id,
  ParkingSpaceRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ParkingSpace, dataSource);
  }
}
