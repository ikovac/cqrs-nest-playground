import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from '../application/commands/create-post';
import { LikePostCommand } from '../application/commands/like-post';
import { EntityNotFoundException } from '../application/exceptions/entity-not-found.exception';
import {
  GetPostByIdQuery,
  GetPostByIdResult,
} from '../application/queries/get-post-by-id';

@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.commandBus.execute<CreatePostCommand, number>(
      new CreatePostCommand(body.content, 1),
    );
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.queryBus.execute<
        GetPostByIdQuery,
        GetPostByIdResult
      >(new GetPostByIdQuery(id));
      return post;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundException(error.message, { cause: error });
      }
      throw error;
    }
  }

  @Post(':id/likes')
  async like(@Param('id', ParseIntPipe) id: number) {
    await this.commandBus.execute(new LikePostCommand(id, 1));
  }
}
