import Modal from 'react-bootstrap/Modal';
import { GetAllUsers as GetUsers } from '../services/users'
import React, { useEffect, useState } from 'react'
import Table from '../sharedComponents/Table';
import { useParams } from 'react-router-dom';
import { authorize } from '../services/authorize';
import Navbar from '../sharedComponents/Navbar';
import { CreateUser } from '../services/create';
import Createuser from './Createuser';
import Button from 'react-bootstrap/Button';
import { UpdateUser } from '../services/updateUser';
import { deleteUser } from '../services/deleteUser';
import { enqueueSnackbar, SnackbarProvider } from 'notistack'

import Spinner from '../sharedComponents/Spinner/Spinner';

const GetAllUsers = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [isLogin, setIsLogin] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [id, setId] = useState()
    const [password, setPassword] = useState()
    const [updateTable, setUpdateTable] = useState(false)
    const [loader, setLoader] = useState(false)
    const [searchQuery, setSearchQuery] = useState();
    const [filterFirstName, setFilterFirstName] = useState()
    const [filterLastName, setFilterLastName] = useState()
    const [filterUsername, setFilterUsername] = useState()
    const [userId, setUserId] = useState()
    const [reset, setReset] = useState(false)

    const getFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const getLastname = (e) => {
        setLastName(e.target.value)
    }
    const getUsername = (e) => {
        setUsername(e.target.value)
    }
    const getId = (e) => {
        setId(e.target.value)
    }

    const getFilterFirstname = (e) => {
        setFilterFirstName(e.target.value)
    }
    const getFilterLastname = (e) => {
        setFilterLastName(e.target.value)
    }
    const getFilterUsername = (e) => {
        setFilterUsername(e.target.value)
    }


    useEffect(() => {
        handleLogin()
    }, [updateTable])


    const handleLogin = async (e) => {
        console.log("first")
        console.log();
        const params = {
            firstName,
            username,
            lastName,
            userId,
            limit: limit,
            page: page
        }
        console.log(params);
        const res = await GetUsers(params)
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);
        console.log("res>>>>>>>>>>>>", res)
        console.log(res.data, "dddddddddddddddddddddddddds");
    }


    const handleFilterbtn = async () => {
        if (!firstName && !lastName && username) {
            enqueueSnackbar("please enter data")
            return
        }

        setPage((prev) => 1)
        handleLogin()

    }

    const handleUpdate = async (d) => {
        console.log("handleuopdate")
        setFirstName(d.firstName)
        setLastName(d.lastName)
        setUsername(d.username)
        setId(d.id)
        setShow((prev) => true)

    }
    const updataUserButton = async () => {
        try {
            if (firstName.length == 0) {
                enqueueSnackbar('invalid firstName', { variant: "error" })
                return
            }
            if (lastName.length == 0) {
                enqueueSnackbar('invalid lastName', { variant: "error" })
                return
            }

            const res = await UpdateUser(firstName, lastName, username, id)
            console.log(res)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev)
                enqueueSnackbar('User Updated Successfully', { variant: "success" })
            }
            handleClose()
        }
        catch {
            enqueueSnackbar('User Not Updated', { variant: "error" })
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


    const handleDelete = async (d) => {
        try {
            const res = await deleteUser(d.id)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev);
                enqueueSnackbar('User Deleted Successfully', { variant: "success" })
            }
            console.log(res)
        }
        catch (error) {
            enqueueSnackbar('Please try again', { variant: "error" })
        }
        finally {
            setLoader((prev) => false)
        }
    }
    const authicateUser = async () => {
        const res = await authorize()
        setIsLogin((prev) => res.data)
    }


    useEffect(() => { authicateUser() }, []);

    useEffect(() => {
        if (isLogin)
            enqueueSnackbar('Login Done', { variant: "success" })
        handleLogin()
    }, [limit, page, isLogin])

    if (!isLogin) {
        return (
            <h1><a href='/'>please login</a></h1>
        )
    }
    return (

        <>
            <Spinner />
            {/* <button type="button" className="btn btn-primary">get</button> */}
            <SnackbarProvider autoHideDuration={3000} />
            <Navbar />
            <Createuser handleLogin={handleLogin} />
            <Button variant="primary" onClick={handleShow}>

            </Button>


            <form action='#' style={{ padding: 1 }}>

                <input type="text" placeholder=' firstName' style={{ margin: 15 }} onChange={getFirstname} />
                <input type="text" placeholder='lastName' style={{ margin: 15 }} onChange={getLastname} />
                <input type="text" placeholder='username' style={{ margin: 15 }} onChange={getUsername} />
                <select name="" id="admin" style={{ margin: 15 }}>
                    <option value="1">admin</option>
                    <option value="2">user</option>
                </select>
                <button onClick={handleFilterbtn} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Submit</button>
                <button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Reset</button>

            </form>







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
                        <div className="row mb-3">
                            <label>Enter Your Username </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="username" value={username} onChange={getUsername} placeholder='' />
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
            <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} updateUser={true} deleteUser={true} updateFunction={handleUpdate} deleteFunction={handleDelete} setShow={setShow} getfirstName={getFirstname} />
        </>

    )
}

export default GetAllUsers