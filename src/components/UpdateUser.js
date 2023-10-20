import React, { useState } from 'react'
import { CreateUser as Create } from '../services/create'
const Createuser = ({ handleLogin }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleCreate = async (e) => {

        e.preventDefault()
        // alert(username, password)
        if (username.length < 2) {
            alert("Invalid username")
            return
        }
        if (password.length == "") {
            alert("invalid password")
            return
        }
        alert(username, password)
        const res = await Create(firstName, lastName, username, password)
        console.log(res)
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
                            <label>Enter Newr First Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="firstname" placeholder='' onChange={getFirstname} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter New Last Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" placeholder='' onChange={getLastname} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter New Username </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="username" placeholder='' onChange={getUsername} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter New Password </label>
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