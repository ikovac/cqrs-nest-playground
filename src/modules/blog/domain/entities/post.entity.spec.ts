import { Test } from '@nestjs/testing';
import { PostContent } from '../value-objects/post-content';
import { Post } from './post.entity';
import { PostWrite } from 'modules/blog/infrastructure/models/post.write-model';
import { LikeWrite } from 'modules/blog/infrastructure/models/like.write-model';
import { DatabaseModule } from 'database.module';

describe('Post Entity', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule.forUnitTest([PostWrite, LikeWrite])],
    }).compile();
  });

  it('like should like the post', () => {
    const content = new PostContent('Lorem ipsum');
    const post = Post.create(content, 1);
    post.like(1);
    expect(post.hasLiked(1)).toBe(true);
  });

  it('unlike should unlike the post', () => {
    const content = new PostContent('Lorem ipsum');
    const post = Post.create(content, 1);
    post.like(1);
    post.unlike(1);
    expect(post.hasLiked(1)).toBe(false);
  });
});
