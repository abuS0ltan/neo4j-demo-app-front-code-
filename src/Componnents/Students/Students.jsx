import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function Students() {
    let [student, setStudent] = useState({
        name: " ",
    });
    let [errorList, setErrorList] = useState([]);
    let navihate = useNavigate();
    let [studentsList, setStudentsList] = useState([]);
    let changeFormValue = (e) => {
        let newStudent = { ...student };
        newStudent[e.target.name] = e.target.value;
        setStudent(newStudent);
    };
    let submitData = (e) => {
        console.log('sub');
        e.preventDefault();
        runValidate();
    };
    let validateForm = () => {
        const schema = Joi.object({
            name: Joi.string().required().min(2).max(50),
        });
        return schema.validate(student, { abortEarly: false });
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
                let { message } = await axios.post("http://localhost:8888/student/add", student);
                console.log(message);
                getStudentsList();
            } catch (error) {
                console.log(error)
                setErrorList([{ message: "ops , an error on server" }])
            }
        }
    };
    useEffect(() => {
        getStudentsList();
    },[])
    let getStudentsList = async () => {
        try {
            let { data } = await axios.get("http://localhost:8888/student/get");
            setStudentsList(data);
            console.log(data)
        } catch (error) {
            console.log(error)
            setErrorList([{ message: "ops , an error on server" }])
        }

    }
    return (
        <div className='header'>
            <div className="container">
                <div className="overlay">
                    <div className="register">
                        <h1 className="mainTitle">Add Student</h1>
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
                                <input placeholder='Enter Student Name' type="text" className="form-control" id="exampleInputPassword1" name='name' onChange={changeFormValue} />
                            </div>
                            <div className="btnDiv">
                                <button type="submit" className="btn">Add</button>
                            </div>
                        </form>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student Name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentsList.map((ele, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index++}</th>
                                                <td>{ele.name}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Students