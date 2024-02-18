import React, { useEffect, useState } from 'react';
import { useAuth } from '../../firebaseconfig';
import LayoutPage from '../../pages/LayoutPage';

import { TextField, Button, Checkbox, FormControlLabel, Link, Paper, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged  } from "firebase/auth";


import { getFirestore, doc, setDoc } from 'firebase/firestore';


const auth = getAuth(); // Initialize Firebase Auth
const db = getFirestore(); // Initialize Firestore
const dbRealtime = getDatabase();
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const BASE_URL = process.env.REACT_APP_API_URL
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the dashboard
        history.push('./');
        // Optionally, save the user's info to local storage
        localStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        // User is signed out, remove the user's info from local storage
        localStorage.removeItem('userInfo');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [history]);

const handleGoogleSignIn = async () => {
  setLoading(true);
  setError('');
  try {
   const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    await signInWithPopup(auth, provider);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user)
    // Define user data you want to save
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // You can add more fields as needed
    };

    // Save the user data in Firestore
    await setDoc(doc(db, "users", user.uid), userData);
    await set(ref(dbRealtime, "users/" + user.uid), userData);
    console.log("User data saved to Realtime and firestore Database");
  } catch (error) {
    console.error('Error signing in with Google:', error);
    setError('Failed to sign in with Google or retrieve user data.');
  } finally {
    setLoading(false);
  }
};

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`${BASE_URL}/api/user/login`, { email, password }, config);
      
      console.log('Login successful:', data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      history.push('./');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <LayoutPage>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box  style={{ padding: 24, maxWidth: 800, width: '90%', margin: 'auto', backgroundColor:'rgba(255,255,255,0.4)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign in
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link href="#" variant="body2" style={{ display: 'block', textAlign: 'right' }}>
            Forgot password?
          </Link>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16, marginBottom: 8 , textTransform:'capitalize',fontSize:'20px'}}
            onClick={submitHandler}
            disabled={loading}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16, marginBottom: 8,textTransform:'capitalize',fontSize:'20px' }}
            onClick={() => history.push('/signup')}
            disabled={loading}
            
            
          >
            Registration
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginBottom: 8,textTransform:'capitalize',fontSize:'20px' }}
            startIcon={<GoogleIcon sx={{fontSize:'30px'}} />}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </LayoutPage>
  );
};

export default Login;
