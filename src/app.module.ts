import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { MaterialsModule } from './materials/materials.module';
import { CardSetsModule } from './card-sets/card-sets.module';
import { CardsModule } from './cards/cards.module';
import { CountriesModule } from './countries/countries.module';
import { ImagesModule } from './images/images.module';
import { CommunitiesModule } from './communities/communities.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, CoursesModule, LessonsModule, MaterialsModule, CardSetsModule, CardsModule, CountriesModule, ImagesModule, CommunitiesModule, SubscribersModule, CommentsModule, PostsModule, LikesModule, ChatCompletionApiModule],
})
export class AppModule { }
