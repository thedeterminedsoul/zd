import {DefaultCrudRepository} from '@loopback/repository';
import {ParkingSpaceHistory, ParkingSpaceHistoryRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParkingSpaceHistoryRepository extends DefaultCrudRepository<
  ParkingSpaceHistory,
  typeof ParkingSpaceHistory.prototype.id,
  ParkingSpaceHistoryRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ParkingSpaceHistory, dataSource);
  }
}
