import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCityData } from '../../api/api';
import '../css/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const inputSearchRef = useRef(null);
  const isClicked = useRef(false);

  const handleLogOut = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('userProfile');
  };

  const userInfo = useSelector((state) => state.userInfo.userInformation);

  const handleSearchInputChange = (e) => {
    isClicked.current = false;
    setSearchTerm(e.target.value);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleListItemClick = (cityName, countryName) => {
    setResults([]);
    isClicked.current = true;
    setSearchTerm(`${cityName} (${countryName})`);
    inputSearchRef.current.focus();
  };

  const animateList = (listData) => {
    let currentIndex = 0;
    let listArray = [];
    while (currentIndex < listData.length) {
      ((index) => {
        setTimeout(() => {
          listArray.push({ item: listData[index], show: false });
          setResults([...listArray]);
          setTimeout(() => {
            listArray[index].show = true;
            setResults([...listArray]);
          }, 50);
        }, 100 * index);
      })(currentIndex);
      currentIndex++;
    }
  };

  useEffect(() => {
    if (isClicked.current) {
      isClicked.current = false;
      return;
    }

    if (!searchTerm) {
      setResults([]);
      return;
    }

    const debouncedFetchTimeout = setTimeout(async () => {
      const { data } = await fetchCityData(searchTerm);
      animateList(data);
    }, 1000);
    return () => clearTimeout(debouncedFetchTimeout);
  }, [searchTerm]);

  return (
    <div className='navbar_wrapper'>
      <nav className='navbar navbar-expand-lg '>
        <div className='container-fluid'>
          <div className='navbar-brand'> </div>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <div className='nav-link active' aria-current='page'>
                  Welcome
                </div>
              </li>
              <li className='nav-item'>
                <div className='nav-link'>
                  {userInfo?.email?.split('@')[0] ?? null}
                </div>
              </li>
              <li className='nav-item'>
                <Link
                  style={{ cursor: 'pointer' }}
                  className='nav-link active'
                  aria-current='page'
                  onClick={handleLogOut}
                  to='/'
                >
                  LogOut
                </Link>
              </li>
            </ul>
            <form
              className='d-flex navbar_form_wrapper'
              role='search'
              onClick={handleSearchFormSubmit}
            >
              <input
                ref={inputSearchRef}
                className='form-control me-2'
                type='search'
                placeholder='Enter city Name'
                aria-label='Search'
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button className='btn navbar_search_button' type='submit'>
                Search
              </button>
              {results && results.length > 0 && (
                <div className='navbar_list_form_wrapper'>
                  <ul className='list-group position-absolute w-100 mt-2'>
                    {results.map((result, index) => (
                      <li
                        key={index}
                        className={`list-group-item ${
                          result.show ? 'show' : ''
                        }`}
                        onClick={() =>
                          handleListItemClick(
                            result.item.name,
                            result.item.country
                          )
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        {result.item.name}
                        <span> ({result.item.country})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
