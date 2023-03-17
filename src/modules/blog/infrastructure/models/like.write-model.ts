import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { PostWrite } from './post.write-model';

@Entity({ tableName: 'like' })
export class LikeWrite {
  @PrimaryKey()
  userId: number;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne({
    entity: () => PostWrite,
    serializer: (it) => it.id,
    serializedName: 'postId',
    primary: true,
  })
  post!: PostWrite;

  [PrimaryKeyType]?: [string, number];

  constructor(userId: number, post: PostWrite) {
    this.userId = userId;
    this.post = post;
  }
}
