import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Login as userlogin } from '../services/Login'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import spinner from "../sharedComponents/Spinner/Spinner"
import Button from 'react-bootstrap/Button';
import Spinner from '../sharedComponents/Spinner/Spinner'
import ValidationError from '../error/ValidationError';
const Login = () => {
    const navigate = new useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    const [newPassword, setNewPassword] = useState()
    const handleClose = () => setShow(false);
    const [oldPassword, setOldPassword] = useState('')
    const handleShow = () => setShow(true);
    const validateUsername = (e) => {
        setUsername(e.target.value)
    }
    const validatePassword = (e) => {
        setPassword(e.target.value)
    }



    const handleLogin = async (e) => {
        try {
            setLoader((prev) => true)
            e.preventDefault()
            console.log("first")
            if (username.length === 0) {
                throw new ValidationError('invalid username')
            }
            if (password.length === 0) {
                throw new ValidationError('invalid password')

            }
            const res = await userlogin(username, password)
            console.log(res)
            localStorage.setItem("auth", res.headers.auth)
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("isAdmin", res.data.isAdmin)
            localStorage.setItem("id", res.data.id)
            if (!res?.data.id) {
                enqueueSnackbar('Login Failed', { variant: "error" })
                return
            }
            if (res.data.isAdmin == true) {
                navigate(`/allUsers/${res.data.username}`)
                enqueueSnackbar('Login Done', { variant: "success" })
                return
            }
            else {
                enqueueSnackbar('Login Done', { variant: "success" })
                navigate(`/contact`)


            }
        }
        catch (error) {

        }
        finally {
            setLoader((prev) => false)
        }
    }

    return (
        <>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Please enter old password </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" ></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="firstname" value={oldPassword} onChange={validateOldPassword} placeholder='' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Please enter new password </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" > </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" value={newPassword} onChange={validateNewPassword} placeholder='' />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={console.log("done")}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}


            <Spinner loading={loader} />
            <SnackbarProvider autoHideDuration={3000} />
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">username</label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="username" onChange={validateUsername} placeholder='' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" onChange={validatePassword} />
                            </div>
                        </div>


                        <button type="button" className="btn btn-primary" onClick={handleLogin}>Sign in</button>

                    </form>
                </div>
            </div></>
    )
}



export default Login