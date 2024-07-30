import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './raiting.controller';
import { RatingService } from './raiting.service';

describe('RaitingController', () => {
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [RatingService],
    }).compile();

    controller = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
