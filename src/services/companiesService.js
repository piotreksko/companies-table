import axios from 'axios';
import urls from '../common/urls';

export const getCompanies = () => axios.get(urls.COMPANIES);

export const getIncomesById = (id) => axios.get(urls.INCOMES + id);
