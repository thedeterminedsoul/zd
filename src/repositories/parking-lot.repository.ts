import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ParkingLot, ParkingLotRelations} from '../models';

export class ParkingLotRepository extends DefaultTransactionalRepository<
  ParkingLot,
  typeof ParkingLot.prototype.id,
  ParkingLotRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ParkingLot, dataSource);
  }
}
