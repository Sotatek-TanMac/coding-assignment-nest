import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } from '../../config/app.config';
import { IFileDownload, IFileUpload, IFileUploadRes } from './s3.dto';
import { getDate, getMimeType } from '../../commons/utils';
import { extname } from 'path';

@Injectable()
export class S3Service {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
  }

  // TODO: To be implemented.
  // TODO: Unit test is needed in src/aws/s3/s3.service.spec.ts.
  async upload(file: IFileUpload) : Promise<IFileUploadRes> {
    const filePath = `${getDate()}/${file.FileName}`;

    return new Promise((resolve, reject) => {
      this.s3.upload({
        ...file,
        Bucket: AWS_BUCKET,
        Key: filePath,
        ContentType: file.ContentType || getMimeType(extname(file.FileName)),
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // TODO: To be implemented.
  // NOTE: Unit test is NOT needed.
  // NOTE: This is actually a hint for you to code right with NestJS.
  //   If you're sure you have done so with the upload function,
  //   you don't need to implement this one.
  async download(file: IFileDownload) : Promise<S3.GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.getObject({
        ...file,
        Bucket: AWS_BUCKET,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
