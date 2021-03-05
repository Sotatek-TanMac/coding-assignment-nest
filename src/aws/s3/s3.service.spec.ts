import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { AWS_BUCKET } from '../../config/app.config';
import { getDate } from '../../commons/utils';

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Upload file', async () => {
    const buffer = Buffer.from('s3 file test content', 'utf8');
    const fileName = 'file_test.txt';

    const results = await service.upload({
      ContentType: 'text/plain',
      FileName: fileName,
      Body: buffer,
      Metadata: {
        auth: 'sotatek',
        version: '1.0.0',
      },
    });

    expect(results).toBeDefined();
    expect(results.Bucket).toBe(AWS_BUCKET);
    expect(results.Key).toBe(`${getDate()}/${fileName}`);
  });
});
