import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ParkingLot} from '../models';
import {ParkingLotRepository} from '../repositories';

export class ParkingLotController {
  constructor(
    @repository(ParkingLotRepository)
    public parkingLotRepository : ParkingLotRepository,
  ) {}

  @post('/parking-lots', {
    responses: {
      '200': {
        description: 'ParkingLot model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkingLot)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLot, {
            title: 'NewParkingLot',
            exclude: ['id'],
          }),
        },
      },
    })
    parkingLot: Omit<ParkingLot, 'id'>,
  ): Promise<ParkingLot> {
    return this.parkingLotRepository.create(parkingLot);
  }

  @get('/parking-lots/count', {
    responses: {
      '200': {
        description: 'ParkingLot model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ParkingLot) where?: Where<ParkingLot>,
  ): Promise<Count> {
    return this.parkingLotRepository.count(where);
  }

  @get('/parking-lots', {
    responses: {
      '200': {
        description: 'Array of ParkingLot model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParkingLot, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParkingLot) filter?: Filter<ParkingLot>,
  ): Promise<ParkingLot[]> {
    return this.parkingLotRepository.find(filter);
  }

  @patch('/parking-lots', {
    responses: {
      '200': {
        description: 'ParkingLot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLot, {partial: true}),
        },
      },
    })
    parkingLot: ParkingLot,
    @param.where(ParkingLot) where?: Where<ParkingLot>,
  ): Promise<Count> {
    return this.parkingLotRepository.updateAll(parkingLot, where);
  }

  @get('/parking-lots/{id}', {
    responses: {
      '200': {
        description: 'ParkingLot model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingLot, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParkingLot, {exclude: 'where'}) filter?: FilterExcludingWhere<ParkingLot>
  ): Promise<ParkingLot> {
    return this.parkingLotRepository.findById(id, filter);
  }

  @patch('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLot PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLot, {partial: true}),
        },
      },
    })
    parkingLot: ParkingLot,
  ): Promise<void> {
    await this.parkingLotRepository.updateById(id, parkingLot);
  }

  @put('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLot PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parkingLot: ParkingLot,
  ): Promise<void> {
    await this.parkingLotRepository.replaceById(id, parkingLot);
  }

  @del('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLot DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parkingLotRepository.deleteById(id);
  }
}
