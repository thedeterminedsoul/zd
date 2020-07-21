import {belongsTo, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Customer} from './customer.model';
import {ParkingSpace} from './parking-space.model';

@model()
export class Ticket extends BaseModel {
  @property({
    type: 'string',
  })
  notes?: string;

  @belongsTo(() => ParkingSpace)
  parkingSpaceId: number;

  @belongsTo(() => Customer)
  customerId: number;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = Ticket & TicketRelations;
