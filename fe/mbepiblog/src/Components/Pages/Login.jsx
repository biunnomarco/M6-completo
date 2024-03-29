import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../../App.css'
import { logIn } from "../../Store/loginSlice";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { GoAlertFill } from 'react-icons/go';
import { postAuthors } from "../../Store/authorSlice";



const Login = () => {

    const actualTheme = useSelector(state => state.theme.theme)
    const logStatus = useSelector(state => state.logIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginFormData, setLoginFormData] = useState({})
    const [register, setRegister] = useState(false)
    const [registerFormData, setRegisterFormData] = useState({})
    const [secondPassword, setSecondPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(logIn(loginFormData))
            .then(() => localStorage.getItem('userLoggedIn') ? navigate('/') : '')
    }

    const sendRegister = async (e) => {
        e.preventDefault();
        if (registerFormData.password === secondPassword) {
            dispatch(postAuthors(registerFormData))
                .then(() => dispatch(logIn({
                    email: registerFormData.email,
                    password: registerFormData.password
                })))
                .then(()=> localStorage.getItem('userLoggedIn') ? navigate('/') : '')
        } else { console.log("psw errate") }

    }

    return (
        <div className={actualTheme ? "" : "dark-secondary text-light"}>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '90.5vh' }}>
                <form style={{ width: '400px' }} onSubmit={onSubmit}>
                    <h3>Log-In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                password: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
                {logStatus.res && logStatus.res.statusCode === 404 && (
                    <Alert style={{ width: '400px' }} key="danger" variant="danger">
                        Wrong E-mail or Password
                    </Alert>
                )}
                {logStatus.res && logStatus.res.statusCode === 400 && (
                    <Alert style={{ width: '400px' }} key="danger" variant="danger">
                        Wrong E-mail or Password
                    </Alert>
                )}

                <div>
                    <p>Not a Member?</p>
                    <button onClick={() => setRegister(!register)} className="btn btn-primary">
                        Register
                    </button>
                </div>
                {register && (
                    <div style={{ width: '400px' }}>
                        <form onSubmit={sendRegister}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        name: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Surname"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        surname: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Date Of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter Your Date of Birth"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        birthdate: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        email: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    onChange={(e) => {
                                        setRegisterFormData({
                                            ...registerFormData,
                                            password: e.target.value
                                        })
                                    }}

                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repete Password"
                                    onChange={(e) => setSecondPassword(e.target.value)}
                                />
                                {registerFormData.password !== secondPassword && (
                                    <>
                                        <GoAlertFill />
                                        <span>Passwords doesen't match</span>
                                    </>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="string"
                                    className="form-control"
                                    placeholder="Avatar url"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        avatar: e.target.value
                                    })}
                                />
                            </div>
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-success">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                )}


            </div>
        </div>
    )
}

export default Login