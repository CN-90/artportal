import React from 'react';
import './ArtOfDay.scss';

const ArtOfDay = () => {
  return (
    <div className="artOfDay">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/La_Tour.jpg/800px-La_Tour.jpg"
        alt=""
      />
      <h2 className="artOfDay__name">Joseph the Carpenter (1642) </h2>
      <h2 className="artOfDay__artist">Georges de La Tour</h2>
    </div>
  );
};

export default ArtOfDay;
