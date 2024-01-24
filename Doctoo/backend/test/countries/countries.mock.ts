export const countries = [
  {
    name: 'Afghanistan',
    phone_code: '+93',
    code: 'AF',
  },
  {
    name: 'Aland Islands',
    phone_code: '+358',
    code: 'AX',
  },
  {
    name: 'Albania',
    phone_code: '+355',
    code: 'AL',
  },
];

export const countryRepositoryMock = {
  findAll: jest.fn(() => Promise.resolve(countries)),
};

export const countriesServiceMock = {
  findAll: jest.fn(() => Promise.resolve(countries)),
};
