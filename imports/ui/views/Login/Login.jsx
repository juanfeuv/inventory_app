import { Meteor } from 'meteor/meteor';

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './style.css';

import { validate } from './helper';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const perfomLogin = async () => {
    const { error } = validate(form);

    if (error) {
      console.error(error);
      toast.error(error.message);

      return;
    }

    Meteor.loginWithPassword(form?.username, form?.password, (err) => {
      if (err) {
        console.error(err);
        toast.error(err.message || err.reason || '');

        return;
      }

      navigate('/');
    });
  };

  return (
    <div className='back'>
      <div className="login">
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img
              src="/user.png"
              alt="user_login"
              loading="lazy"
              width="60%"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="standard"
              type="text"
              fullWidth
              required
              name="username"
              value={form?.username}
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="standard"
              type="password"
              fullWidth
              required
              name="password"
              value={form?.password}
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={perfomLogin}
            >
              LOG IN
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;