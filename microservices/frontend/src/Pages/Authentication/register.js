import React, { useState } from 'react';
import {
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import styles from './register.module.scss';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form>
      <div className={styles.registerBox}>
        <div>
          <PersonAdd sx={{ height: '3rem', width: 'auto', color: '#787878' }} />
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
          <InputLabel htmlFor="standard-adornment-uid">University Id</InputLabel>
          <Input
            id="standard-adornment-uid"
            type="text"
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
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
        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
          <Input
            id="standard-adornment-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
                  )}
          />
        </FormControl>
        <div className={styles.registerBox__controls}>
          <Button variant="contained" size="small" type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
}
