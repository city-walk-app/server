import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'

@Injectable()
export class LocationService {
  constructor() {}
}
