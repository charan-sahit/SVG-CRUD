import React, {useState} from 'react'
import axios from 'axios'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = (event) => {
        // navigate to /dashboard
        localStorage.setItem('email', email)
        navigate("/")
    }
  return (
    <div>
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField

                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>

        </Grid>
    </div>
  )
}

export default Login