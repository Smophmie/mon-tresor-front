import React from 'react';
import HomepageConnectedUser from "../components/HomepageForConnectedUser";

const Homepage = ({ isAuthenticated }) => {
  return (
    <div>
      <h1>Hello !</h1>
      {isAuthenticated && <HomepageConnectedUser />}
    </div>
  );
};

export default Homepage;
