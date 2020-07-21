import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Customer extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleNumber: string;

  // other optional properties like email location something else may be.
  // ...

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
