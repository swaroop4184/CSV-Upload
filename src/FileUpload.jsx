import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({refreshFileListFlag, setRefreshFileListFlag}) => {
  //State to store the file to be uploaded
  const [file, setFile] = useState(null);
//Changing file state when file is uploaded
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
//Function to upload CSV file to backend 
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setRefreshFileListFlag(!refreshFileListFlag)
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
