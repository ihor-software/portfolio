import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from 'src/countries/countries.service';
import { getModelToken } from '@nestjs/sequelize';
import { Country } from 'src/countries/entities/country.entity';
import { countries, countryRepositoryMock } from './countries.mock';

describe('CountriesService', () => {
  let service: CountriesService;
  let repositoryMock: typeof Country;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getModelToken(Country),
          useValue: {
            ...countryRepositoryMock,
          },
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    repositoryMock = module.get<typeof Country>(getModelToken(Country));
  });

  it('should read and return counries from db', async () => {
    const result = await service.findAll();
    expect(repositoryMock.findAll).toBeCalled();
    expect(result).toEqual(countries);
  });
});
