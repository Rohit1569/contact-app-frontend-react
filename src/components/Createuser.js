import React, { useState } from 'react'
import { CreateUser as Create } from '../services/create'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import ValidationError from '../error/ValidationError'
import { Next } from 'react-bootstrap/esm/PageItem'

const Createuser = ({ handleLogin }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)

    var matches = firstName.match(/\d+/g)
    var matches2 = lastName.match(/\d+/g)
    const handleCreate = async (e) => {
        try {
            e.preventDefault()
            if (firstName == "" || matches != null) {
                //  enqueueSnackbar('Please enter valid firstName', { variant: "error" })
                // return
                throw new ValidationError("Invalid first name")

            }
            if (lastName == "" || matches2 != null) {
                throw new ValidationError('Please enter valid lastName')
            }

            if (username == "") {

                throw new ValidationError('Please enter username')
            }
            if (password == "") {

                throw new ValidationError('Please enter valid password')
            }

            const res = await Create(firstName, lastName, username, password)
            enqueueSnackbar('Account Created', { variant: "success" })
            console.log(res)
        }
        catch (error) {

        }

    }
    const getFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const getLastname = (e) => {
        setLastName(e.target.value)
    }
    const getUsername = (e) => {
        setUsername(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <>
            <div className="card mx-auto mt-1" style={{ width: "20rem" }}>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label>Enter Your First Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="firstname" placeholder='' onChange={getFirstname} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Last Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" placeholder='' onChange={getLastname} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Username </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="username" placeholder='' onChange={getUsername} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Password </label>
                            <label for="inputPassword3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" onChange={getPassword} />
                            </div>
                        </div>


                        <button type="button" className="btn btn-primary" onClick={handleCreate} >CreateAccount</button>
                    </form>
                </div>
            </div></>
    )
}

export default Createuser