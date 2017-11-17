import React from 'react';
import './styles.css';

export default function Loader() {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
}
