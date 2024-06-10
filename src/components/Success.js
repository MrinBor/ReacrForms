import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div>
      <h1>Form Submission Successful!</h1>
      <p>Here are the details you submitted:</p>
      <ul>
        {Object.keys(state).map((key) => (
          <li key={key}>{`${key}: ${state[key]}`}</li>
        ))}
      </ul>
      <Link to="/">Go back to the form</Link>
    </div>
  );
};

export default Success;
