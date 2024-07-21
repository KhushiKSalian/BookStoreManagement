import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const submit = async () => {
    try {
      if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
        alert("All fields are required")
      } else {
        const response = await axios.post("http://localhost:3000/api/v1/sign-up", values);
       alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 md:w-2/6 ls:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Username
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              Email
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
              placeholder='email'
              name='email'
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              Password
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              Address
            </label>
            <input type='text' className='w-full mt-2 bg-zinc-900 text-white p-2 outline-none'
              placeholder=''
              name='address'
              required
              value={values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded'
              onClick={submit}>
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account? &nbsp;
            <Link to="/login" className='text-blue-500'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
