import { LikeWrite } from 'modules/blog/infrastructure/models/like.write-model';
import { PostWrite } from 'modules/blog/infrastructure/models/post.write-model';
import { PostContent } from '../value-objects/post-content';

export class Post {
  constructor(private model: PostWrite) {}

  static create(content: PostContent, authorId: number) {
    const model = new PostWrite();
    model.content = content.value;
    model.userId = authorId;
    return new Post(model);
  }

  get id() {
    return this.model.id;
  }

  edit(content: PostContent) {
    this.model.content = content.value;
  }

  like(userId: number) {
    if (this.hasLiked(userId)) return;
    const like = new LikeWrite(userId, this.model);
    this.model.likes.add(like);
  }

  unlike(userId: number) {
    const like = this.model.likes.getItems().find((it) => it.userId === userId);
    if (!like) return;
    this.model.likes.remove(like);
  }

  hasLiked(userId: number): boolean {
    return this.model.likes.getItems().some((it) => it.userId === userId);
  }
}
