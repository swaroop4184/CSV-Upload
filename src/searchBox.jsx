import React from 'react';

const SearchBox = ({ searchString, setSearchString }) => {
  //Function to set SearchString State to the string in the search box everytime it is changed
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchString}
        onChange={handleChange}
        placeholder="Enter your search..."
      />
    </div>
  );
};

export default SearchBox;
