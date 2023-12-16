import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function Registercourses() {
    let [enrollment, setEnrollment] = useState({
        courseName:" ",
      studentName: " ",
      
    });
    let [errorList, setErrorList] = useState([]);
    let navihate = useNavigate();
    let changeFormValue = (e) => {
        let newEnrollment = { ...enrollment };
        newEnrollment[e.target.name] = e.target.value;
        setEnrollment(newEnrollment);
    };
    let submitData = (e) => {
        console.log('sub');
        e.preventDefault();
        runValidate();
    };
    let validateForm = () => {
        const schema = Joi.object({
            studentName: Joi.string().required().min(2).max(50),
            courseName: Joi.string().required().min(2).max(50)
        });
        return schema.validate(enrollment, { abortEarly: false });
    };
    let runValidate = async () => {
        let validateResult = validateForm();
        if (validateResult.error != undefined) {
            setErrorList(validateResult.error.details);
            console.log('1error')
        }
        else {
            console.log('no error')
            try {
                console.log(enrollment);
                let { message } = await axios.post("http://localhost:8888/enrolled", enrollment);
                console.log(message);
            } catch (error) {
                console.log(error)
                setErrorList([{ message: "ops , an error on server" }])
            }
        }
    };

    return (
        <div className='header'>
            <div className="container">
                <div className="overlay">
                    <div className="register">
                        <h1 className="mainTitle">Enrolled</h1>
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
                                <label htmlFor="exampleInputPassword1" className="form-label">Student Name</label>
                                <input placeholder='Enter Student Name' type="text" className="form-control" id="exampleInputPassword1" name='studentName' onChange={changeFormValue} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Course Name</label>
                                <input placeholder='Enter Course Name' type="text" className="form-control" id="exampleInputPassword1" name='courseName' onChange={changeFormValue} />
                            </div>
                            
                            <div className="btnDiv">
                                <button type="submit" className="btn">Add</button>
                            </div>
                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Registercourses
