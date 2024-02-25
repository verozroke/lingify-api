import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary
import { LikePostDto } from './dto/like-post.dto';
import { CommentPostDto } from './dto/comment-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, { imageUrl, ...postPayload }: CreatePostDto) {

    const post = await this.prisma.post.create({
      data: postPayload,
      include: {
        likes: true,
        comments: true,
        image: true,
        owner: true,
        community: true,
      }
    });

    if (imageUrl) {
      const image = await this.prisma.image.create({
        data: {
          url: imageUrl,
          postId: post.id
        }
      })
      return res.send(JSON.stringify({
        ...post,
        image,
      }));
    }

    return res.send(JSON.stringify(post))
  }

  async findAll(req: Request, res: Response) {
    const posts = await this.prisma.post.findMany();
    return res.send(JSON.stringify(posts));
  }

  async findOne(req: Request, res: Response, id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return res.send(JSON.stringify(post));
  }

  async update(req: Request, res: Response, id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto
    });

    return res.send(JSON.stringify(post));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.post.delete({
      where: { id }
    });

    return res.send({ message: 'Post successfully deleted' });
  }

  async like(req: Request, res: Response, { postId, userId }: LikePostDto) {
    const isLiked = await this.prisma.like.findFirst({
      where: {
        postId,
        userId
      }
    })

    if (isLiked) {
      const like = await this.prisma.like.deleteMany({
        where: {
          postId,
          userId
        }
      })
      return res.send({ message: 'Unlike', like })
    }

    const like = await this.prisma.like.create({
      data: { postId, userId }
    })

    return res.send({ message: 'Like', like })

  }

  async comment(req: Request, res: Response, { postId, userId, text }: CommentPostDto) {
    const comment = await this.prisma.comment.create({
      data: {
        postId,
        ownerId: userId,
        text,
      },
      include: {
        owner: {
          include: {
            avatar: true
          }
        }
      },
    })

    return res.send(comment)
  }
}
