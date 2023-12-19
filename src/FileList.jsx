import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FileList({refreshFileListFlag, data, setData}) {
  //List of CSV files at backend uploaded by the user
  const [files, setFiles] = useState([]);
  //Function to get the list of files from the backend
  async function getFileNames() {
    try {
      const response = await axios.get("http://localhost:3001/listCSVFiles");
        setFiles(response.data.csvFiles);
        console.log(response.data.csvFiles);
    } catch (error) {
      console.error('Error fetching file names:', error);
    }
  }
//Function to get Data of the selected file from the backend
  async function getData(e)
  {
    const reqBody = {fileName: e.target.value};
    try{
      const response = await axios.post("http://localhost:3001/getCsvData", reqBody);
      setData(response.data.data);
      console.log(response.data.data);
    }
    catch(err){
      console.error('Error getting Data of CSV', err);
    }
  }
//using useEffect to get files everytime a new file is uploaded 
  useEffect(() => {
    getFileNames();
  }, [refreshFileListFlag]);

  return (
    <div>
      <table>
        <tbody>
          {files.map((fileName) => (
            <tr key={fileName}>
              <td><button className="butt" onClick={getData} value={fileName}>{fileName}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default FileList;
