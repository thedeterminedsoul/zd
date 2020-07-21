import {belongsTo, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Ticket} from './ticket.model';

@model()
export class Invoice extends BaseModel {

  @property({
    type: 'number',
    required: true,
  })
  priceToBePaid: number;

  @belongsTo(() => Ticket)
  tikcetId: number;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }

}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
