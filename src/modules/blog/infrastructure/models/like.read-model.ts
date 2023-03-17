import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { PostRead } from './post.read-model';

@Entity({ tableName: 'like' })
export class LikeRead {
  @PrimaryKey()
  readonly userId: number;

  @Property()
  readonly createdAt: Date = new Date();

  @ManyToOne({
    entity: () => PostRead,
    primary: true,
    hidden: true,
  })
  post!: PostRead;

  [PrimaryKeyType]?: [string, number];
}
