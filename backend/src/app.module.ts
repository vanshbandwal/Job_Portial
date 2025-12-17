import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://vanshbandwal93:root@cluster0.xwdl6bl.mongodb.net/Job_portail?retryWrites=true&w=majority&appName=Cluster0'),ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
