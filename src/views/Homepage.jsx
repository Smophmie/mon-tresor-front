import React from 'react';
import HomepageConnectedUser from "../components/HomepageForConnectedUser";

const Homepage = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <>
            <h1>Hello !</h1>
            {isAuthenticated && <HomepageConnectedUser />}
        </>
    );
};

export default Homepage;
