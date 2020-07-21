import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {Invoice} from '../models';
import {InvoiceRepository, TicketRepository} from '../repositories';

export class InvoiceController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
    @inject('repositories.ticket.repository') public ticketRpo: TicketRepository,
  ) {}

  @post('/invoices', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoice',
            exclude: ['id', 'priceToBePaid'],
          }),
        },
      },
    })
    invoice: Omit<Invoice, 'id'>,
  ): Promise<Invoice> {
    // const ticketForInvoice: Ticket = await this.ticketRpo.findById(invoice.tikcetId);
    const priceToBePaidCalc = 50; // some calculation
    invoice.priceToBePaid = priceToBePaidCalc;
    return this.invoiceRepository.create(invoice);
  }

  @get('/invoices/count', {
    responses: {
      '200': {
        description: 'Invoice model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Invoice) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.invoiceRepository.count(where);
  }

  @get('/invoices', {
    responses: {
      '200': {
        description: 'Array of Invoice model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Invoice, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Invoice) filter?: Filter<Invoice>,
  ): Promise<Invoice[]> {
    return this.invoiceRepository.find(filter);
  }

  @patch('/invoices', {
    responses: {
      '200': {
        description: 'Invoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Invoice,
    @param.where(Invoice) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.invoiceRepository.updateAll(invoice, where);
  }

  @get('/invoices/{id}', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Invoice, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Invoice, {exclude: 'where'}) filter?: FilterExcludingWhere<Invoice>
  ): Promise<Invoice> {
    return this.invoiceRepository.findById(id, filter);
  }

  @patch('/invoices/{id}', {
    responses: {
      '204': {
        description: 'Invoice PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Invoice,
  ): Promise<void> {
    await this.invoiceRepository.updateById(id, invoice);
  }

  @put('/invoices/{id}', {
    responses: {
      '204': {
        description: 'Invoice PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() invoice: Invoice,
  ): Promise<void> {
    await this.invoiceRepository.replaceById(id, invoice);
  }

  @del('/invoices/{id}', {
    responses: {
      '204': {
        description: 'Invoice DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.invoiceRepository.deleteById(id);
  }
}
