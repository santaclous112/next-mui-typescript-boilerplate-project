"use client"

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useAppContext } from '../context/AddContext';
import { AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert'; 
import Snackbar from '@mui/material/Snackbar';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Santa Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const appContext = useAppContext();
  const router = useRouter();
  const handleClose = () => {
    appContext.setPasswordError(false);
    appContext.setFieldError(false);
    appContext.setIsEmailError(false);
    appContext.setExistEmailError(false);

  };

  // const validateEmail = (email:FormDataEntryValue | string) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email); 
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword')
    };

    // setIsValidEmail(newUser.email ? validateEmail(newUser.email) : false);
    
    if(!(newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.confirmPassword)) {
      console.log("here")
      appContext.setFieldError(true);
    } else if(newUser.password !== newUser.confirmPassword) {
      appContext.setPasswordError(true);
    } else {
      axios.post("http://localhost:5000/api/users/signup", newUser)
      .then(res => {
        if(res.data.message === "success") {
          router.push("/signin");
          appContext.setSignupSuccess(true);
        } else if(res.data.message === "emailerror") {
          appContext.setIsEmailError(true);
        } else {
          appContext.setExistEmailError(true);
        }
          
      })
      .catch(err => console.log(err))
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type = "email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2 !important' }}
            >
              Sign Up
            </Button>
            <Snackbar open={appContext.passwordError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>:
                "Password and Confirm Password is different!!!""
              </Alert>
            </Snackbar>
            <Snackbar open={appContext.isEmailError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>:
                "Your Email Form is incorrect!!!"
              </Alert>
            </Snackbar>
            <Snackbar open={appContext.fieldError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>:
                "You should fill all fields!!!"
              </Alert>
            </Snackbar>
            <Snackbar open={appContext.existEmailError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>:
                "Email already exists"
              </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}