import React, { useState } from 'react';
import { landingPageImage, Logo } from '../assets';
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';
import Loading from "../Components/Loading";
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const { loading, login } = useContext(MovieContext);
  const navigate = useNavigate();


  // state for credentials

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  // state for form errors
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: ""
  });

  // state for login error
  const [loginError, setLoginError] = useState(false);


  // handle input change
  function handleInputChange(e) {
    const { name, value } = e.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    // validate input
    const error = validateInput(name, value);
    console.log(error);

    // set error state
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));


  }


  // validate input function
  function validateInput(name, value) {
    let error = "";

    if (name === "username") {
      if (!value) {
        error = "Username is required";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }


    return error;
  }


  // handle confirm function
  function handleConfirm() {


    const response = login(credentials);

    if (!response) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setCredentials({ username: "", password: "" });
      setFormErrors({ username: "", password: "" });
      navigate("/home");

    }




  }


  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="relative w-full h-screen">
      <img
        src={landingPageImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 flex justify-center md:justify-center lg:justify-start px-4 md:px-6 lg:px-24 pt-6">
        <img
          src={Logo}
          alt="Logo"
          className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/12"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex justify-center lg:justify-end mt-10 px-4 md:px-12 lg:px-24">
        <div className="overlay-form p-6 rounded-md w-full sm:w-11/12 md:w-2/3 lg:w-1/3">
          <div className="mb-6 text-center font-bold text-white text-2xl">
            <p>Sign in</p>
          </div>


          { /* Error message for invalid credentials */
            loginError &&
            <div className="mt-4 mb-2 p-3 text-center bg-red-100 border border-red-400 text-red-700 rounded">
              Invalid username or password
            </div>
          }

          <div className="mb-4 ">
            <label className="block mb-1 text-sm font-medium text-white">
              Username: <span className="text-red-600 font-extrabold">*</span>
            </label>
            <input
              type="text"
              name='username'
              placeholder="Enter your username"
              // autoComplete='off'
              required
              value={credentials.username}
              onChange={handleInputChange}
              className={`overlay-form-field text-white border border-white rounded p-2 w-full ${formErrors.username ? 'border-red-500' : ''}`}
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Password: <span className="text-red-600 font-extrabold">*</span>
            </label>
            <input
              type="password"
              name='password'
              placeholder="Enter your password"
              // autoComplete='off'
              required
              value={credentials.password}
              onChange={handleInputChange}
              className={`overlay-form-field text-white border border-white rounded p-2 w-full ${formErrors.password ? 'border-red-500' : ''}`}

            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}

          </div>

          <div className='mt-3'>
            <label className="block mb-1 text-sm font-medium text-center justify-center text-white">
              sample credentials <br />
              <span className='cursor-pointer'
                onClick={() => {
                  setCredentials({ username: 'user', password: '12345' });
                  setFormErrors({ username: '', password: '' });
                }}>username : user , password : 12345 </span> <br />
             

            </label>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-[#8B0000] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-red-800 transition duration-300 mt-3"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
