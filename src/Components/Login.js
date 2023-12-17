import React, { useState } from 'react';

export const Login = () => {

    const [login_username, setLoginUserName] = useState();
    const [login_password, setLoginPassword] = useState();
    const [registration_username, setRegistrationUserName] = useState();
    const [registration_password, setRegistrationPassword] = useState();
    const [registration_confirm_username, setRegistrationConfirmPassword] = useState();
    const [showed, setShowed] = useState(false);

    function setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        window.location.href = '/Dashboard';
    }

    function setLoginData(newData) {
        let data = getLoginData();
        if (!data) data = [];
        data.push(newData);
        sessionStorage.setItem('data', JSON.stringify(data));
      }
      
      function getLoginData() {
        return JSON.parse(sessionStorage.getItem('data'));
      }

    const handleLoginSubmit = async e => {
        e.preventDefault();
        let data = getLoginData();
        if (data && data.filter(function (e) {
            return e.username === login_username &&
                   e.password === login_password;
          }).length > 0) {
            setToken("Logged In!");
        } else {
            alert("Please fill in valid credentials!")
        }
    }

    const handleRegistrationSubmit = async e => {
        e.preventDefault();
        if (!registration_username || !registration_password || !registration_confirm_username) {
            alert('Please fill in all fields!');
        } else if (registration_password !== registration_confirm_username) {
            alert('Please make sure both passwords are equal!');
        } else {
            setLoginData({
                "username": registration_username,
                "password": registration_password
            });
            alert('Create new account!');
            setShowed(false)
        }
    }

  return(
    <div className="login-registration-wrapper">
        <div style={showed ? { display: "none" } : { display: "block" }} className="login-wrapper">
            <h1>Log In</h1>
            <br></br>
            <form onSubmit={handleLoginSubmit}>
                <label>
                    <br></br>
                    <p>Username</p>
                    <input type="text" onChange={e => setLoginUserName(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <br></br>
                    <p>Password</p>
                    <input type="password" onChange={e => setLoginPassword(e.target.value)} />
                </label>
                <br></br>
                <br></br>
                <button type='button' onClick={(e) => setShowed(true)}>Not registered?</button>
                
                <div>
                    <br></br>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>

        <div style={showed ? { display: "block" } : { display: "none" }} className="registration-wrapper">
            <h1>Registration</h1>
            <form onSubmit={handleRegistrationSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setRegistrationUserName(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setRegistrationPassword(e.target.value)}/>
                </label>
                <br></br>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" onChange={e => setRegistrationConfirmPassword(e.target.value)}/>
                </label>
                <br></br>
                <br></br>
                <button type='button' onClick={(e) => setShowed(false)}>Already an account?</button>
                <br></br>
                <br></br>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }