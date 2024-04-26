import React, { useState } from 'react';
import axios from 'axios'; // Or use the Fetch API

export const HelloWorld = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      try {
        const uploadResponse = await axios.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image uploaded successfully!'); // Handle response for UI feedback
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <input type="file" accept="image/png" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
      </div>
    );
}
