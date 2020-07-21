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
import {ParkingSpace} from '../models';
import {ParkingSpaceRepository} from '../repositories';

export class ParkingSpaceController {
  constructor(
    @repository(ParkingSpaceRepository)
    public parkingSpaceRepository : ParkingSpaceRepository,
  ) {}

  @post('/parking-spaces', {
    responses: {
      '200': {
        description: 'ParkingSpace model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkingSpace)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingSpace, {
            title: 'NewParkingSpace',
            exclude: ['id'],
          }),
        },
      },
    })
    parkingSpace: Omit<ParkingSpace, 'id'>,
  ): Promise<ParkingSpace> {
    return this.parkingSpaceRepository.create(parkingSpace);
  }

  @get('/parking-spaces/count', {
    responses: {
      '200': {
        description: 'ParkingSpace model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ParkingSpace) where?: Where<ParkingSpace>,
  ): Promise<Count> {
    return this.parkingSpaceRepository.count(where);
  }

  @get('/parking-spaces', {
    responses: {
      '200': {
        description: 'Array of ParkingSpace model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParkingSpace, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParkingSpace) filter?: Filter<ParkingSpace>,
  ): Promise<ParkingSpace[]> {
    return this.parkingSpaceRepository.find(filter);
  }

  @patch('/parking-spaces', {
    responses: {
      '200': {
        description: 'ParkingSpace PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingSpace, {partial: true}),
        },
      },
    })
    parkingSpace: ParkingSpace,
    @param.where(ParkingSpace) where?: Where<ParkingSpace>,
  ): Promise<Count> {
    return this.parkingSpaceRepository.updateAll(parkingSpace, where);
  }

  @get('/parking-spaces/{id}', {
    responses: {
      '200': {
        description: 'ParkingSpace model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingSpace, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParkingSpace, {exclude: 'where'}) filter?: FilterExcludingWhere<ParkingSpace>
  ): Promise<ParkingSpace> {
    return this.parkingSpaceRepository.findById(id, filter);
  }

  @patch('/parking-spaces/{id}', {
    responses: {
      '204': {
        description: 'ParkingSpace PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingSpace, {partial: true}),
        },
      },
    })
    parkingSpace: ParkingSpace,
  ): Promise<void> {
    await this.parkingSpaceRepository.updateById(id, parkingSpace);
  }

  @put('/parking-spaces/{id}', {
    responses: {
      '204': {
        description: 'ParkingSpace PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parkingSpace: ParkingSpace,
  ): Promise<void> {
    await this.parkingSpaceRepository.replaceById(id, parkingSpace);
  }

  @del('/parking-spaces/{id}', {
    responses: {
      '204': {
        description: 'ParkingSpace DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parkingSpaceRepository.deleteById(id);
  }
}
