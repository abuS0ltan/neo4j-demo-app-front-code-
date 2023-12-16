import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function Courses() {
    let [courses, setCourses] = useState({
        name: " ",
    });
    let [errorList, setErrorList] = useState([]);
    let navihate = useNavigate();
    let [coursesList, setCoursesList] = useState([]);
    let changeFormValue = (e) => {
        let newCourses = { ...courses };
        newCourses[e.target.name] = e.target.value;
        setCourses(newCourses);
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
        return schema.validate(courses, { abortEarly: false });
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
                let { message } = await axios.post("http://localhost:8888/course/add", courses);
                console.log(message);
                getCoursesList();
            } catch (error) {
                console.log(error)
                setErrorList([{ message: "ops , an error on server" }])
            }
        }
    };
    useEffect(() => {
        getCoursesList();
    },[])
    let getCoursesList = async () => {
        try {
            let { data } = await axios.get("http://localhost:8888/course/get");
            setCoursesList(data);
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
                        <h1 className="mainTitle">Courses</h1>
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
                                <label htmlFor="exampleInputPassword1" className="form-label">Course Name</label>
                                <input placeholder='Enter Course Name' type="text" className="form-control" id="exampleInputPassword1" name='name' onChange={changeFormValue} />
                            </div>
                            <div className="btnDiv">
                                <button type="submit" className="btn">Add</button>
                            </div>
                        </form>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">course Name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coursesList.map((ele, index) => {
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

export default Courses