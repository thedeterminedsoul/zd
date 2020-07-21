import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class ParkingLot extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: false,
  })
  pricePerHour: number;


  // for owner identification as of now it's always going to be 1
  @property({
    type: 'number',
    required: true,
  })
  ownerId: number;


  constructor(data?: Partial<ParkingLot>) {
    super(data);
  }
}

export interface ParkingLotRelations {
  // describe navigational properties here
}

export type ParkingLotWithRelations = ParkingLot & ParkingLotRelations;
