# Companies table

This repository contains an application that fetches a list of companies and each of their incomes from a separate endpoint.

It is a fully functional table that has custom functions. It was done using React hooks. The application consists of a Main component that keeps most of the logic and handles API fetching.

# Functionalities
 - Sorting by each column in ascending or descending order is available - default sort by ID. 
 - Filter input which filters by values in all columns, that uses a 400ms debounce (useDebounceCallback hook). Changing filter value always redirects user to first page. Button that clears the input value is available
 - Pagination: 
   - always shows lowest and highest possible number. 
   - shows previous and next page buttons if according pages are available
   - shows two lower, one lower, one higher and two higher pages if they are available
- The table is responsive - has a horizontal scrollbar for devices with very small screens
 
# Tests

 - Unit tests were done using react-testing-library. Lines covered - 96.69%