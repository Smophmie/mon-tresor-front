import React from 'react';
import HomepageConnectedUser from "../components/HomepageForConnectedUser";

const Homepage = ({ isAuthenticated }) => {
  return (
    <div>
      <h1>Hello !</h1>
      <div style={{margin:'60px'}}>
        {isAuthenticated && <HomepageConnectedUser />}
        </div>
    </div>
  );
};

export default Homepage;
