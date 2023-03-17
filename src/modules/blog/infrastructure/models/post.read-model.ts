import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'shared/base.entity';
import { LikeRead } from './like.read-model';

@Entity({ tableName: 'post' })
export class PostRead extends BaseEntity {
  @Property()
  readonly content: string;

  @Property()
  readonly userId: number;

  @OneToMany({
    entity: () => LikeRead,
    mappedBy: 'post',
  })
  readonly likes = new Collection<LikeRead>(this);

  @Property({ persist: false })
  get likeCount() {
    if (!this.likes.isInitialized()) return;
    return this.likes.count();
  }
}
