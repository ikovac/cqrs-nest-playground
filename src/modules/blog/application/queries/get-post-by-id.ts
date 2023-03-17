import { wrap } from '@mikro-orm/core';
import {
  IQuery,
  IQueryHandler,
  IQueryResult,
  QueryHandler,
} from '@nestjs/cqrs';
import { PostDal } from 'modules/blog/infrastructure/dal/post.dal';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { pick } from 'radash';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

export class GetPostByIdQuery implements IQuery {
  constructor(public readonly id: number) {}
}

export class GetPostByIdResult implements IQueryResult {
  id: number;
  content: string;
  userId: number;
  likeCount: number;
}

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler
  implements IQueryHandler<GetPostByIdQuery, GetPostByIdResult>
{
  constructor(
    private readonly postDal: PostDal,
    @InjectPinoLogger(GetPostByIdHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute(query: GetPostByIdQuery): Promise<GetPostByIdResult> {
    this.logger.info({
      msg: 'Executing GetPostById Command',
      args: query,
    });
    const result = await this.postDal.getById(query.id);
    if (!result) throw new EntityNotFoundException('Post');
    return pick(wrap(result).toJSON(), [
      'id',
      'content',
      'userId',
      'likeCount',
    ]);
  }
}
