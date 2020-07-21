import {belongsTo, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {ParkingLot} from './parking-lot.model';

// status : 0 -> empty
// 1 -> occupied
// 2 -> under maintenance
// 3 -> out of service


@model()
export class ParkingSpace extends BaseModel {
  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @belongsTo(() => ParkingLot)
  parkingLotId: number;


  constructor(data?: Partial<ParkingSpace>) {
    super(data);
  }
}

export interface ParkingSpaceRelations {
  // describe navigational properties here
}

export type ParkingSpaceWithRelations = ParkingSpace & ParkingSpaceRelations;
