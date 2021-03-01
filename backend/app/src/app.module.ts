import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@192.168.5.102/blog?authSource=admin', { useNewUrlParser: true}),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
