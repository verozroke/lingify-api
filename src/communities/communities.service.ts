import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Adjust the import path as necessary
import { SubCommunityDto } from "./dto/sub-community.dto";

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async create(req: Request, res: Response, dto: CreateCommunityDto) {
    const {
      name,
      language,
      ownerId,
      description,
      countryName,
      bannerUrl,
      avatarUrl,
    } = dto;

    const country = await this.prisma.country.findFirst({
      where: {
        name: countryName,
      },
    });

    const avatar = await this.prisma.image.create({
      data: {
        url: avatarUrl,
      },
    });

    const banner = await this.prisma.image.create({
      data: {
        url: bannerUrl,
      },
    });

    const community = await this.prisma.community.create({
      data: {
        name,
        language,
        avatarId: avatar.id,
        bannerId: banner.id,
        ownerId,
        description,
        countryId: country.id,
      },
    });

    return res.send(JSON.stringify(community));
  }

  async findAll(req: Request, res: Response) {
    const communities = await this.prisma.community.findMany({
      include: {
        banner: true,
        avatar: true,
        country: true,
        posts: true,
        owner: true,
        subscribers: true,
      },
    });

    if (!communities) {
      return res.send([]);
    }

    return res.send(JSON.stringify(communities));
  }

  async findOne(req: Request, res: Response, id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
      include: {
        banner: true,
        avatar: true,
        country: true,
        posts: {
          include: {
            likes: true,
            comments: {
              include: {
                owner: {
                  include: {
                    avatar: true,
                  },
                },
              },
            },
            image: true,
            owner: {
              include: {
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        owner: true,
        subscribers: true,
      },
    });

    if (!community) {
      throw new BadRequestException("Community not found");
    }

    return res.send(JSON.stringify(community));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCommunityDto: UpdateCommunityDto
  ) {
    const community = await this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });

    return res.send(JSON.stringify(community));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.community.delete({
      where: { id },
    });

    return res.send({ message: "Community successfully deleted" });
  }

  async subscribe(
    req: Request,
    res: Response,
    { communityId, userId }: SubCommunityDto
  ) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new BadRequestException("No user found for id " + userId);
    }

    const community = await this.prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      throw new BadRequestException(
        "Community not found for id " + communityId
      );
    }

    await this.prisma.subscriber.create({
      data: {
        communityId,
        userId,
      },
    });

    return res.send("Subscription");
  }

  async unsubscribe(
    req: Request,
    res: Response,
    { communityId, userId }: SubCommunityDto
  ) {
    await this.prisma.subscriber.deleteMany({
      where: {
        AND: [{ communityId }, { userId }],
      },
    });

    return res.send("Unsubscription");
  }

  async search(q: string, req: Request, res: Response) {
    const searchedCommunities = await this.prisma.community.findMany({
      where: {
        name: {
          mode: "insensitive",
          contains: q,
        },
      },
      include: {
        avatar: true,
        country: true,
        owner: true,
        subscribers: true,
      },
    });
    return res.send(searchedCommunities);
  }
}
