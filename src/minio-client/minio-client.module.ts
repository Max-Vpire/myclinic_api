import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { minioconfig } from './config'
@Module({
  imports: [
    MinioModule.register({
      endPoint: minioconfig.MINIO_ENDPOINT,
      port: minioconfig.MINIO_PORT,
      useSSL: false,
      accessKey: minioconfig.MINIO_ACCESSKEY,
      secretKey: minioconfig.MINIO_SECRETKEY,
    })
  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}
