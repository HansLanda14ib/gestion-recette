import React from 'react';
import Navbar from './Navbar'; // Update the import to match your file name

const Layout = ({ children, auth, logOut }) => {
    const handleLogout = () => {
        logOut();
        // Navigate to the desired location after logout
    };

    return (
        <div>
            <Navbar auth={auth} handleLogout={handleLogout} /> {/* Pass auth and handleLogout as props */}
            <div style={{ padding: '20px' }}>{children}</div>
        </div>
    );
};

export default Layout;
