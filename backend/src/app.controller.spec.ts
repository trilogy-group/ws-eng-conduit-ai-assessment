/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
