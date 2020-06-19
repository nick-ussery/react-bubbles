import React, { useState } from "react";
import axios from 'axios'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'

const initialValues = {
  username: 'Lambda School',
  password: 'i<3Lambd4'
}


const Login = () => {
  const history= useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [values, setValues] = useState(initialValues)

  const changeHandler = e =>{
    // console.log(e.target)
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  
  const onSubmit= e =>{
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', values)
    .then(res=>{
      console.log(res)
      window.localStorage.setItem('token', res.data.payload)
      history.push('/protected')
    })
    .catch(err=>{console.log(err)})
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input type={'text'} placeholder={'username'} name={'username'} onChange={changeHandler} value={values.username} />

        <label>Password</label>
        <input type={'password'} placeholder={'password'} name={'password'} onChange={changeHandler} value={values.password} />
        <button name="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
