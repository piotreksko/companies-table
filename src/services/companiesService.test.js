import axios from 'axios';
import { getCompanies, getIncomesById } from './companiesService';
import urls from '../common/urls';

jest.mock('axios');

describe('companiesService', () => {
  it('should get companies', () => {
    getCompanies();
    expect(axios.get).toHaveBeenCalledWith(urls.COMPANIES);
  });

  it('should get incomes', () => {
    const id = '123';
    getIncomesById(id);
    expect(axios.get).toHaveBeenCalledWith(urls.INCOMES + id);
  });
});
