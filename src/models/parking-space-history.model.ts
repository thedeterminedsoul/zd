import {belongsTo, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {ParkingSpace} from './parking-space.model';

@model()
export class ParkingSpaceHistory extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  actionPerformed: string;

  // foreign key of the user that is performing this action
  // admin user or may be some other user type.
  @property({
    type: 'number',
    required: true,
  })
  performedBy: number;

  @belongsTo(() => ParkingSpace)
  parkingSpaceId: number;

  // dump of parking space object to trace back the history
  @property({
    type: 'object',
    required: true,
  })
  parkingspace: ParkingSpace;


  constructor(data?: Partial<ParkingSpaceHistory>) {
    super(data);
  }
}

export interface ParkingSpaceHistoryRelations {
  // describe navigational properties here
}

export type ParkingSpaceHistoryWithRelations = ParkingSpaceHistory & ParkingSpaceHistoryRelations;
