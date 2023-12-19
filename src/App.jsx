import { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import FileList from './FileList';
import DataTable from './DataTable';
import SearchBox from './searchBox';

function App() {
//Flag to refresh File list every time a file is uploaded
  const [refreshFileListFlag, setRefreshFileListFlag] = useState(false);
//CSV Data received from the backend
  const [data, setData] = useState([]);
//String contained in the search bar
  const [searchString, setSearchString] = useState('');
//Order in which to sort the data upon pressing the sort button
  const [sortOrder, setSortOrder] = useState('dsc');

//Filtering data based on search string
  var filteredData = data.filter((obj)=>{
    const string = searchString.toLowerCase();
    var check = false;
    for(const key in obj)
    {
      if(obj[key].toLowerCase().includes(string)) check = true;
    }
    return check;
  })

//handling proper sorting of floats in Data
  const handleStringFloats = (str) =>{
    const numericValue = parseFloat(str);
    if (!isNaN(numericValue)) {
      return numericValue;
    } 
    else {
      return str;
    }
  }

//Function to sort the data according to the sort order
  const handleSort = ()=>{
    const sortAttr = Object.keys(filteredData[0])[0];
    const sortedData = [...data].sort((a, b)=>{
      const first = parseFloat(a[sortAttr]);
      const second = parseFloat(b[sortAttr]);
      if(!isNaN(first) && !isNaN(second))
      {
        return sortOrder === 'asc' ? first-second : second-first;
      }
      const comparison = a[sortAttr].localeCompare(b[sortAttr]);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    console.log(sortedData);
    setData(sortedData);
    setSortOrder(sortOrder==='asc'?'dsc':'asc');
  }

  return (
    <div>
      <FileUpload 
      refreshFileListFlag={refreshFileListFlag} 
      setRefreshFileListFlag={setRefreshFileListFlag}
      />
      <FileList 
      refreshFileListFlag={refreshFileListFlag}
      data={data}
      setData={setData}
      />
      <SearchBox
      searchString={searchString}
      setSearchString={setSearchString}
      />
      <button onClick={handleSort}>Sort {sortOrder === 'dsc' ? 'Descending' : 'Ascending'}</button>
      {/* Rendering Data if Data is available (a file is selected), Otherwise rendering "Select File" */}
      {data.length!==0?
      <DataTable
      data={filteredData}
      />:<>Select File</>}
    </div>
  )
}

export default App
