import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Space} from 'antd';

const Navbar = ({auth, logOut }) => {
    return (<div style={{padding: '20px', borderBottom: '1px solid #ccc'}}>
        <Space size="large">
            <Link to="/">Home</Link>
            {auth && <Link to="/RecipeList">Recipes</Link>}
            {auth && <Button type="primary" onClick={logOut }>
                Logout
            </Button>}

            {!auth && <Link to="/login">Login</Link>}
            {!auth &&    <Link to="/register">Register</Link>}


        </Space>
    </div>)
        ;
};

export default Navbar;
