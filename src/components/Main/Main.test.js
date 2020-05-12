import React from 'react';
import {
  render, waitFor, waitForElement, fireEvent,
} from '@testing-library/react';
import Main from './Main';
import * as companiesService from '../../services/companiesService';

const getWrapper = () => render(<Main />);

const companies = [
  {
    id: 42, name: 'ErnserGroup', city: 'North Shirtleyfurt',
  },
  {
    id: 82, name: 'Boehm - Crist', city: 'Weimannhaven',
  },
  {
    id: 39, name: 'Robel, Nicolas and McKenzie', city: 'Port Heidifurt',
  },
];

const incomes = [
  {
    id: 42,
    incomes: [{ value: '8569.78', date: '2019-06-20T12:36:50.587Z' },
      { value: '7464.26', date: '2019-12-15T10:05:55.620Z' },
      { value: '5371.69', date: '2019-02-09T07:08:33.924Z' }],
  },
  {
    id: 82,
    incomes: [{ value: '8569.78', date: '2019-06-20T12:36:50.587Z' },
      { value: '9464.26', date: '2019-12-15T10:05:55.620Z' },
      { value: '8371.69', date: '2019-02-09T07:08:33.924Z' }],
  },
  {
    id: 39,
    incomes: [{ value: '2569.78', date: '2019-06-20T12:36:50.587Z' },
      { value: '2464.26', date: '2019-12-15T10:05:55.620Z' },
      { value: '5371.69', date: '2019-02-09T07:08:33.924Z' }],
  },
];

describe('Main', () => {
  const companiesPromise = Promise.resolve({ data: companies });
  companiesService.getCompanies = jest.fn().mockReturnValue(companiesPromise);

  const incomesPromise = (id) => {
    const income = incomes.find((inc) => inc.id === id);
    return Promise.resolve({ data: income });
  };
  companiesService.getIncomesById = (id) => jest.fn().mockReturnValue(incomesPromise(id))();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render and fetch companies on init and display them', async () => {
    const { getByText, getAllByRole } = await getWrapper();

    expect(companiesService.getCompanies).toHaveBeenCalled();
    await waitForElement(() => getByText(companies[0].name));

    expect(getByText(companies[0].name));
    expect(getAllByRole('row').length).toEqual(4);
  });

  it('should show filtered companies', async () => {
    const { getByText, getAllByRole, getByPlaceholderText } = await getWrapper();

    expect(companiesService.getCompanies).toHaveBeenCalled();
    await waitForElement(() => getByText(companies[0].name));

    const value = 'Boehm';
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value } });

    await waitFor(() => expect(() => getByText(companies[0].name)).toThrow());

    expect(getByText(companies[1].name));
    expect(getAllByRole('row').length).toEqual(2);
  });
});
