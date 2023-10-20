import Navbar from 'react-bootstrap/Navbar'
import { logout } from '../services/logout'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Reset } from '../services/resetPassword';
import { enqueueSnackbar, SnackbarProvider } from 'notistack'

const NavbarAll = () => {
    const navigate = new useNavigate()
    const [show, setShow] = useState(false);
    const [newPassword, setNewPassword] = useState()
    const handleClose = () => setShow(false);
    const [oldPassword, setOldPassword] = useState('')
    const handleShow = () => setShow(true);


    const handleResetPassword = async () => {
        try {
            if (oldPassword.length == 0) {
                enqueueSnackbar(' invalid password', { variant: "error" })
                return
            }
            if (newPassword.length == 0) {
                enqueueSnackbar(' invalid password', { variant: "error" })
                return
            }

            let username = localStorage.getItem("username")
            const res = await Reset(username, oldPassword, newPassword)
            enqueueSnackbar(' updated Successfully', { variant: "success" })
            handleClose()
            return
            // if (res.data === "updated password") {
            //     enqueueSnackbar('password updated', { variant: "success" });
            //     handleClose();
            // }
        }
        catch (error) {
            enqueueSnackbar(' Try again', { variant: "error" })
            console.log(error, "errrrrrrrrrrrrrrrrrrrrr");
        }


    }
    // const handleResetPassword = async (e) => {
    //     try {
    //         let username = localStorage.getItem("username")
    //         enqueueSnackbar(' updated Successfully', { variant: "success" })
    //         const res = await Reset(username, oldPassword, newPassword)
    //         console.log(res, "passssssssssssssssssssssss");

    //     }
    //     catch (error) {
    //         enqueueSnackbar(' Try again', { variant: "error" })
    //     }

    // }

    const handleLogout = async (e) => {
        e.preventDefault()
        let res = await logout()
        localStorage.clear()
        navigate(`/`)
    }

    const validateOldPassword = (e) => {
        setOldPassword(e.target.value)
    }

    const validateNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    return (
        <Navbar bg="dark" className="navbar bg-body-tertiary justify-content-between">
            <SnackbarProvider autoHideDuration={3000} />
            <label>hello! {localStorage.getItem("username")}</label>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Please enter old password </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" ></label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" value={oldPassword} onChange={validateOldPassword} placeholder='' />
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
                    <Button variant="primary" onClick={handleResetPassword}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="primary" style={{ margin: 15 }} onClick={handleShow}>
                Reset password</Button>
            <button type="button" onClick={handleLogout}>logout</button>

        </Navbar>
    )
}

export default NavbarAll