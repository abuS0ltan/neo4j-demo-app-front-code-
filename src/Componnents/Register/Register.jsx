import React, { useState } from 'react';
import './register.css';
import Joi from 'joi';
import { Navigate,useNavigate } from 'react-router-dom';
function Register() {
    let [user, setUser] = useState({
        name: " ",
        username: " ",
        password: " "
    });
    let [errorList, setErrorList] = useState([]);
    let navihate=useNavigate();
    let changeFormValue = (e) => {
        let newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    };
    let submitData = (e) => {
        console.log('sub');
        e.preventDefault();
        runValidate();
    };
    let validateForm = () => {
        const schema = Joi.object({
            name: Joi.string().required().min(2).max(50),
            username: Joi.string().required().max(20),
            password: Joi.string().required().min(8).max(16)
        });
        return schema.validate(user, { abortEarly: false });
    };
    let runValidate = () => {
        let validateResult = validateForm();
        if (validateResult.error != undefined) {
            setErrorList(validateResult.error.details);
            console.log('1error')
        }
        else{
            console.log('no error')

            navihate('/login');
        }
    };
    return (
        <div className='header'>
            <div className="container">
                <div className="overlay">
                    <div className="register">
                        <h1 className="mainTitle">Register</h1>
                        <div className="alertDiv mx-1">

                            {
                                errorList.map((ele, index) => {
                                    return (
                                        <div className="alert alert-danger" role="alert" key={index}>
                                            {ele.message}
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <form className='inputform' onSubmit={submitData}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                                <input placeholder='Enter your name' type="text" className="form-control" id="exampleInputPassword1" name='name' onChange={changeFormValue} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
                                <input placeholder='Enter your username' type="text" className="form-control" id="exampleInputPassword1" name='username' onChange={changeFormValue} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input placeholder='Enter your password' type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={changeFormValue} />
                            </div>
                            <div className="btnDiv">
                                <button type="submit" className="btn">Sign up</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register