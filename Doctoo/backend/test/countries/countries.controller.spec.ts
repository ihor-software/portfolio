import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from 'src/countries/countries.controller';
import { CountriesService } from 'src/countries/countries.service';
import { countries, countriesServiceMock } from './countries.mock';

describe('CountriesController', () => {
  let controller: CountriesController;
  let serviceMock: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            ...countriesServiceMock,
          },
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    serviceMock = module.get<CountriesService>(CountriesService);
  });

  it('should call CountriesService and return result', async () => {
    const result = await controller.findAll();
    expect(serviceMock.findAll).toBeCalled();
    expect(result).toEqual(countries);
  });
});
