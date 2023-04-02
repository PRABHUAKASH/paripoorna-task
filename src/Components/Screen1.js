import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationLink,
  MDBPaginationItem,
} from 'mdb-react-ui-kit';
import { Form } from 'react-router-dom';
import { Select } from '@mui/material';

const Screen1 = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(5);
  const [sortFilterValue, setSortFilterValue] = useState('');
  const [operation, setOperation] = useState('');

  const sortOptions = ['name', 'email', 'phone', 'address', 'status'];

  useEffect(() => {
    loadUserData(0, 5, 0);
  }, []);

  const loadUserData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case 'search':
        setOperation(optType);
        setSortValue('');
        return await axios
          .get(
            `http://localhost:8800/users?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case 'sort':
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:8800/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case 'filter':
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:8800/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:8800/users?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };
  console.log('data', data);

  const handleReset = () => {
    setOperation('');
    setValue('');
    setSortFilterValue('');
    setSortValue('');
    loadUserData(0, 5, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUserData(0, 5, 0, 'search');
    // return await axios
    //   .get(`http://localhost:8800/users?q=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //     setValue('');
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUserData(0, 5, 0, 'sort', value);
    // return await axios
    //   .get(`http://localhost:8800/users?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };
  const handleFilter = async (value) => {
    loadUserData(0, 5, 0, 'filter', value);
    // setSortValue(value);
    // return await axios
    //   .get(`http://localhost:8800/users?status=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if (data.length < 5 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadUserData(5, 10, 1, operation, sortFilterValue)}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage - 1) * 5,
                  currentPage * 5,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage + 1) * 5,
                  (currentPage + 2) * 5,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage - 1) * 5,
                  currentPage * 5,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <MDBContainer>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
          Reset
        </MDBBtn>
      </form>
      <div style={{ marginTop: '100px' }}>
        <h2>Screen One</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <th colSpan={8} className="text-center mb-0">
                      No Data Found
                    </th>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row"> {index + 1}</th>
                      <th>{item.name}</th>
                      <th>{item.email}</th>
                      <th>{item.phone}</th>
                      <th>{item.address}</th>
                      <th>{item.status}</th>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '250px',
            alignContent: 'center',
          }}
        >
          {renderPagination()}
        </div>
      </div>
      {data.length > 0 && (
        <MDBRow>
          <MDBCol size="8">
            <h5>Sort By:</h5>
            <select
              style={{ width: '50%', borderRadius: '2px', height: '35px' }}
              onChange={handleSort}
              value={sortValue}
            >
              <option>Please Select Value</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size="4">
            <h5>Filter By Status:</h5>
            <MDBBtnGroup>
              <MDBBtn color="success" onClick={() => handleFilter('Active')}>
                Active
              </MDBBtn>
              <MDBBtn
                color="danger"
                style={{ marginLeft: '2px' }}
                onClick={() => handleFilter('Inactive')}
              >
                Inactive
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default Screen1;
