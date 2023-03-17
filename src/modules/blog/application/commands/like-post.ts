import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from 'modules/blog/infrastructure/repositories/post.repository';

export class LikePostCommand {
  constructor(public readonly postId: number, public readonly userId: number) {}
}

@CommandHandler(LikePostCommand)
export class LikePostHandler implements ICommandHandler<LikePostCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(command: LikePostCommand): Promise<void> {
    const { postId, userId } = command;
    const post = await this.postRepository.getById(postId);
    post.like(userId);
    await this.postRepository.flush();
  }
}
