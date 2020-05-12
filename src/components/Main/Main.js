import React, { useEffect, useState } from 'react';
import { getCompanies, getIncomesById } from '../../services/companiesService';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';
import { ROWS_PER_PAGE, ORDER_OPTIONS, COLUMNS_HEADERS } from '../../common/constant';
import SearchField from '../SearchField/SearchField';
import './Main.scss';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [companiesToDisplay, setCompaniesToDisplay] = useState([]);
  const [sort, setSort] = useState({ by: 'id', order: ORDER_OPTIONS.ASCENDING });
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data: fetchedCompanies } = await getCompanies();
      const incomesToFetch = fetchedCompanies.map(({ id }) => getIncomesById(id));
      const fetchedIncomes = await Promise.all(incomesToFetch);

      const getCalculatedIncomes = (companyId) => {
        const companyIncomes = fetchedIncomes.find(({ data: { id } }) => id === companyId).data.incomes;
        const totalIncome = companyIncomes.reduce((total, next) => {
          const sum = total + parseFloat(next.value);
          return parseFloat(sum).toFixed(2);
        }, 0);
        const averageIncome = (totalIncome / companyIncomes.length).toFixed(2);
        return { totalIncome, averageIncome };
      };

      const companiesWithIncomes = fetchedCompanies.map((company) => ({ ...company, ...getCalculatedIncomes(company.id) }));
      setCompanies(companiesWithIncomes);
      setIsLoading(false);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const getPaginatedCompanies = (sortedCompanies) => {
      const companiesToSkip = (currentPage - 1) * ROWS_PER_PAGE;
      const paginated = sortedCompanies.slice(
        companiesToSkip,
        companiesToSkip + ROWS_PER_PAGE,
      );
      return paginated;
    };

    const getSortedCompanies = (filtered) => filtered.sort((a, b) => {
      const isAscending = sort.order === ORDER_OPTIONS.ASCENDING;

      const getValuesToCompare = () => {
        if (sort.by === COLUMNS_HEADERS.ID) {
          return ({ value1: a.id, value2: b.id });
        }
        if (sort.by === COLUMNS_HEADERS.AVERAGE_INCOME || sort.by === COLUMNS_HEADERS.TOTAL_INCOME) {
          return ({ value1: parseFloat(a[sort.by]), value2: parseFloat(b[sort.by]) });
        }
        return ({ value1: a[sort.by], value2: b[sort.by] });
      };

      const { value1, value2 } = getValuesToCompare();
      const sortNumbers = typeof value1 === 'number';

      if (sortNumbers) {
        return isAscending ? value1 - value2 : value2 - value1;
      }
      return isAscending ? value1.localeCompare(value2) : value2.localeCompare(value1);
    });

    const getFilteredCompanies = () => (filterValue ? companies.filter((company) => Object.values(company).some((value) => {
      const res = String(value).toLowerCase().includes(filterValue.toLowerCase());
      return res;
    })) : companies);

    const filtered = getFilteredCompanies();
    const sorted = getSortedCompanies(filtered);
    const paginated = getPaginatedCompanies(sorted);

    setFilteredCompanies(filtered);
    setCompaniesToDisplay(paginated);
  }, [companies, filterValue, sort, currentPage]);

  return (
    <div className="wrapper">
      <h1>Companies</h1>
      {isLoading && 'Loading ...'}
      {!isLoading
      && (
      <div className="container">
        <SearchField setFilterValue={setFilterValue} setCurrentPage={setCurrentPage} />
        <Table companies={companiesToDisplay} sort={sort} setSort={setSort} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          entriesNumber={filteredCompanies.length}
        />
      </div>
      )}

    </div>
  );
};

export default Main;
