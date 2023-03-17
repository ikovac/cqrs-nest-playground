import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostController } from './api/post.controller';
import { PostWrite } from './infrastructure/models/post.write-model';
import { PostRead } from './infrastructure/models/post.read-model';
import { PostRepository } from './infrastructure/repositories/post.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './application/commands/create-post';
import { LikePostHandler } from './application/commands/like-post';
import { PostDal } from './infrastructure/dal/post.dal';
import { GetPostByIdHandler } from './application/queries/get-post-by-id';

const commands = [CreatePostHandler, LikePostHandler];
const queries = [GetPostByIdHandler];

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature([PostWrite, PostRead])],
  controllers: [PostController],
  providers: [PostRepository, PostDal, ...commands, ...queries],
})
export class BlogModule {}
