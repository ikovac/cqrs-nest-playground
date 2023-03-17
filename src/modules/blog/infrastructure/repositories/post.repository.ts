import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Post } from 'modules/blog/domain/entities/post.entity';
import { PostWrite } from '../models/post.write-model';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostWrite)
    private readonly repository: EntityRepository<PostWrite>,
  ) {}

  async getById(id: Post['id']) {
    const model = await this.repository.findOne(id);
    return new Post(model);
  }

  persistAndFlush(post: Post) {
    const model = post['writeModel'];
    return this.repository.persistAndFlush(model);
  }

  flush() {
    return this.repository.flush();
  }
}
