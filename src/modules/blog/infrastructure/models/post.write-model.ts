import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'shared/base.entity';
import { LikeWrite } from './like.write-model';

@Entity({ tableName: 'post' })
export class PostWrite extends BaseEntity {
  @Property()
  content: string;

  @Property()
  userId: number;

  @OneToMany({
    entity: () => LikeWrite,
    mappedBy: 'post',
    orphanRemoval: true,
    eager: true,
  })
  likes = new Collection<LikeWrite>(this);
}
