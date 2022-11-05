import React from 'react';
import notFoundPic from '../assets/notFoundPic.svg';

const NotFound = () => (
  <div className="d-flex m-5" style={{ alignItems: 'center', justifyContent: 'center' }}>
    <img src={notFoundPic} alt="notFound" />
  </div>
);

export default NotFound;
