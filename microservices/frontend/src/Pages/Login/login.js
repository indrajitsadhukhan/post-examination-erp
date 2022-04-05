import React, { useState } from 'react';
import {
    Paper,
    Grid,
    FormControl,
    InputAdornment,
    IconButton,
    Input,
    InputLabel,
    Button
} from "@mui/material";
import styles from './login.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
                >

                <Grid item xs={3}>
                    <Paper elevation={6}>
                        <div className={styles.loginBox}>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                                <Input
                                    id="standard-adornment-email"
                                    type='text'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div className={styles.loginBox__controls}>
                                <Button variant="contained" size="small" type='submit'>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Paper>          
                </Grid>
            </Grid> 
        </form>
    );
};
