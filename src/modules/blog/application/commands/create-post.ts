import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Post } from 'modules/blog/domain/entities/post.entity';
import { PostContent } from 'modules/blog/domain/value-objects/post-content';
import { PostRepository } from 'modules/blog/infrastructure/repositories/post.repository';

export class CreatePostCommand {
  constructor(
    public readonly content: string,
    public readonly userId: number,
  ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(command: CreatePostCommand): Promise<Post['id']> {
    const { content, userId } = command;
    const postContent = new PostContent(content);
    const post = Post.create(postContent, userId);
    await this.postRepository.persistAndFlush(post);
    return post.id;
  }
}
