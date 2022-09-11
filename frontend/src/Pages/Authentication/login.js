import React, { useState } from 'react';
import {
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff, Person } from '@mui/icons-material';
import styles from './login.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form>
      <div className={styles.loginBox}>
        <div className={styles.loginBox__icon}>
          <Person sx={{ height: '3rem', width: 'auto', color: '#787878' }} />
        </div>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
                                      )}
          />
        </FormControl>
        <div className={styles.loginBox__controls}>
          <Button variant="contained" size="small" type="submit">
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}
