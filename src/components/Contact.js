import Modal from 'react-bootstrap/Modal';
import { GetAllContacts as GetContacts } from '../services/getAllContacts'
import React, { useEffect, useState } from 'react'
import Table from '../sharedComponents/Table';
import { useNavigate } from 'react-router-dom'
import Navbar from '../sharedComponents/Navbar';
import Createuser from './Createuser';
import Button from 'react-bootstrap/Button';
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { useForm } from 'react-hook-form'
import CreateContact from './CreateContact';
import { UpdateContact } from '../services/updateContact';
import { deleteContact } from '../services/deleteContact';
import ValidationError from '../error/ValidationError';


const Contact = () => {
    const navigate = new useNavigate()
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [limit, setLimit] = useState(4)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [page, setPage] = useState(1)
    const [id, setId] = useState()
    const [updateTable, setUpdateTable] = useState(false);
    const [loader, setLoader] = useState(false)
    const [reset, setReset] = useState(false)

    const getFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const getLastname = (e) => {
        setLastName(e.target.value)
    }

    useEffect(() => {
        handleLogin()
    }, [updateTable])


    const handleLogin = async (e) => {
        let id = localStorage.getItem("id")
        const params = {
            firstName,
            lastName,
            limit: limit,
            page: page
        }
        const res = await GetContacts(id, params)
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);
        console.log("res>>>>>>>>>>>>", res)
    }

    const handleFilterbtn = async () => {
        setPage((prev) => 1)
        handleLogin()
    }



    const handleUpdate = async (d) => {
        console.log("handleuopdate")
        setFirstName(d.firstName)
        setLastName(d.lastName)
        setId(d.id)
        setShow((prev) => true)

    }
    const updataUserButton = async () => {
        try {

            if (firstName.length == 0) {
                throw new ValidationError("invalid first name")
            }
            if (lastName.length == 0) {
                throw new ValidationError('invalid last name')
            }
            const res = await UpdateContact(firstName, lastName, id)
            console.log(res)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev)
                enqueueSnackbar('contact updated Successfully', { variant: "success" })
            }
            handleClose()
        } // enqueueSnackbar('Please try again', { variant: "error" })
        catch (error) {

        }
        finally {
            setLoader((prev) => false)
        }

    }

    const handleDelete = async (d) => {
        try {
            setLoader((prev) => true)
            const res = await deleteContact(d.id)
            console.log(d.id, "iddididdiddd");
            if (res.status == 200) {
                setUpdateTable((prev) => !prev);
                enqueueSnackbar('Contact Deleted Successfully', { variant: "success" })
            }
        }
        catch (error) {
            enqueueSnackbar('Please try again', { variant: "error" })
        }
        finally {
            setLoader((prev) => false)
        }
    }


    useEffect(() => {
        handleFilterbtn();
    }, [reset])

    const resetButton = () => {
        setFirstName(prev => "")
        setLastName(prev => "")
        setReset((prev) => !prev)
    }


    const infoFunction = async (d) => {
        localStorage.setItem("contactid", d.id)
        navigate(`/allcontactdetail/`)
    }


    useEffect(() => {
        enqueueSnackbar('Login Done', { variant: "success" })
        handleLogin()
    }, [limit, page])
    return (

        <>
            <SnackbarProvider autoHideDuration={3000} />
            <Navbar />
            <CreateContact />          <Button variant="primary" onClick={handleShow}>
            </Button>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form action='#' style={{ padding: 1, margin: 15 }}>

                    <input type="text" placeholder=' firstName' style={{ margin: 15 }} onChange={getFirstname} />
                    <input type="text" placeholder='lastName' style={{ margin: 15 }} onChange={getLastname} />
                    <button onClick={handleLogin} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Submit</button>
                    {/* <button style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button> */}
                    {/* <button onClick={handleReset} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button> */}
                    <button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Enter Your First Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" ></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="firstname" value={firstName} onChange={getFirstname} placeholder='' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Last Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" > </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" value={lastName} onChange={getLastname} placeholder='' />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updataUserButton}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <label htmlFor="count">{count}</label>
            <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} updateUser={true} deleteUser={true} updateFunction={handleUpdate} deleteFunction={handleDelete} viewButton={true} setShow={setShow} getfirstName={getFirstname} infoFunction={infoFunction} />
        </>

    )
}

export default Contact