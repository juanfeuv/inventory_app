import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Meteor } from 'meteor/meteor';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Breadcrumb from '../Breadcrumb';
import callMethod from '../../utils/callMethod';
import UserInfo from '../../contexts/UserInfo';

const DEFAULT_USER_DATA = { user: null };

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Meteor.logout((err) => {
      console.error(err);
      if (err) {
        toast.error(err.message || err.reason || '');

        return;
      }

      navigate('/login');
    });
  };

  useEffect(() => {
    callMethod('getUserInfo')
      .then(({ res }) => setUserData({ user: res?.user }));

    return () => {
      setUserData(DEFAULT_USER_DATA);
    };
  }, []);

  return (
    <>
      <UserInfo.Provider value={userData}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-describedby="menu-button"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello <b>{_.capitalize(userData?.user?.username)}</b>!
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <br />
        <Breadcrumb />
        <Outlet />
      </UserInfo.Provider>
    </>
  );
}
