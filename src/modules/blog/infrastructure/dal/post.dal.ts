import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PostRead } from '../models/post.read-model';

@Injectable()
export class PostDal {
  constructor(
    @InjectRepository(PostRead)
    private readonly repository: EntityRepository<PostRead>,
  ) {}

  async getById(id: PostRead['id']) {
    return this.repository.findOne(id, {
      populate: ['likes'],
    });
  }
}
