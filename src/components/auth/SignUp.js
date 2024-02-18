import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import LayoutPage from '../../pages/LayoutPage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const BASE_URL = process.env.REACT_APP_API_URL
  const submitHandler = async () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();

      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare user data to send to your backend for saving in the database
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        phoneNumber,
      };

      // Send user data to backend to save in the database
      const response = await axios.post(`${BASE_URL}/api/user/registration`, userData);
      console.log('User registered:', response.data);

      localStorage.setItem('userInfo', JSON.stringify(userData));
      setLoading(false);
      history.push('/signin');
    } catch (error) {
      console.error('Error creating account', error);
      setLoading(false);
    }
  };

  return (
    <LayoutPage>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box style={{ padding: 24, maxWidth: 800, width: '90%', margin: 'auto', backgroundColor: 'rgba(255,255,255,0.4)' }}>
          <TextField
            fullWidth
            required
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            id="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            id="phoneNumber"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: 15 }} onClick={submitHandler} disabled={loading}>
            Signup
          </Button>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
            <Link href="/signin">Already have and account Sign in?</Link>
          </Typography>
        </Box>
      </Box>
    </LayoutPage>
  );
};

export default SignUp;
