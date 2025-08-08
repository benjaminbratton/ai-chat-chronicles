import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Test Page</h1>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <button onClick={() => alert('Button works!')}>
        Test Button
      </button>
    </div>
  );
};

export default SimpleTest;
