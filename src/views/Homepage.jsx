import React from 'react';
import HomepageConnectedUser from "../components/HomepageForConnectedUser";
import HomepageForNonConnectedUser from '../components/HompageForNonConnectedUser';

const Homepage = ({ isAuthenticated }) => {
  return (
    <div style={{margin:'60px'}}>
      {isAuthenticated && <HomepageConnectedUser />}
      {!isAuthenticated && <HomepageForNonConnectedUser />}
    </div>
  );
};

export default Homepage;
