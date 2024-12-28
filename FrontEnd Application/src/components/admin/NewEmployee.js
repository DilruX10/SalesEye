import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newEmployee, clearErrors } from '../../actions/employeeActions'
import { NEW_EMPLOYEE_RESET } from '../../constants/employeeConstants'

const NewEmployee = ({ history }) => {//history--->previously type things on form

    //store various input values---->
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState(0);

    const alert = useAlert();//display alerts to the user
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newEmployee);

    useEffect(() => {// handle the changes in the component's state

        if (error) {//if there is an error
            alert.error(error);//display error
            dispatch(clearErrors())//clears the errors from the Redux store
        }

        if (success) {//if action is success
            history.push('/admin/employees');//push to admin-->employees
            alert.success('Employee added successfully');//success alert
            dispatch({ type: NEW_EMPLOYEE_RESET })//resets the newEmployee slice
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {//executed when the user submits the new employee form
        e.preventDefault();//prevents the default form submission behavior
        //because we want to handle the form submission ourselves with custom code.

        const formData = new FormData();//construct a set of key/value pairs representing form fields and their values.
        //hold a value entered by the user into the relevant form field
        formData.set('name', name);
        formData.set('nic', nic);
        formData.set('phoneNumber', phoneNumber);
        formData.set('email', email);
        formData.set('position', position);
        formData.set('salary', salary);

        dispatch(newEmployee(formData))
    }

    return (
        <Fragment>
            <MetaData title={'New Employee'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Employee</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nic_field">NIC</label>
                                    <input
                                        type="text"
                                        id="nic_field"
                                        className="form-control"
                                        value={nic}
                                        onChange={(e) => setNic(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber_field">Phone Number</label>
                                    <input
                                        type="number"
                                        id="phoneNumber_field"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="text"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="position_field">Position</label>
                                    <input
                                        type="text"
                                        id="position_field"
                                        className="form-control"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="salary_field">Salary</label>
                                    <input
                                        type="text"
                                        id="salary_field"
                                        className="form-control"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewEmployee