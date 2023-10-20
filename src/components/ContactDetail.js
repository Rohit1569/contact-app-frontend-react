import React, { useEffect, useState } from 'react'
import NavbarComponent from '../sharedComponents/Navbar'
import CreateContactDetails from '../components/CreateContactDetails'
import { useParams } from "react-router-dom";
import Table from '../sharedComponents/Table'
import { authorize as authorize } from "../services/authorize";
import { AllContactDetails as AllContactDetails } from '../services/getAllContactDetails';
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { Updatecontactdetaials as Updatecontactdetaials } from '../services/updateContactDetails';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteContactDeatils as DeleteContactDeatils } from '../services/deleteContactDetails';


const GetAllContactDetails = () => {


    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(1);
    const [page, setPage] = useState(2);
    const [typeOfContactDetail, setTypeOfContactDetail] = useState()
    const [valueOfContactDetail, setValueOfContactDetail] = useState();
    let { contactId } = useParams();
    const [id, setId] = useState();
    const [verify, setVerify] = useState(false);
    const [show, setShow] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [reset, setReset] = useState(false)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async () => {
        // e.preventDefault();
        let id = localStorage.getItem("id")
        let contactid = localStorage.getItem("contactid")
        const params = {
            typeOfContactDetail,
            valueOfContactDetail,
            limit: limit,
            page: page
        }
        const response = await AllContactDetails(id, contactid, params);
        setCount((prev) => response?.headers["x-total-count"]);
        setData((prev) => response.data);


    };

    useEffect(() => {
        if (verify) {
            handleSubmit();
        }
    }, [limit, page, verify]);

    const handleUser = async () => {
        const response = await authorize();
        setVerify(response.data.result);
    };
    useEffect(() => {
        handleSubmit();
    }, [updateTable]);
    useEffect(() => {
        handleUser();
    }, []);


    if (!verify) {
        return (
            <h1>
                <a href="/">plz login</a>
            </h1>
        );
    }
    const handleUpdate = async (d) => {
        setShow((prev) => true);

        setTypeOfContactDetail(d.typeOfContactDetail);
        setValueOfContactDetail(d.valueOfContactDetail);
        setId(d.id);
    };
    const updateButton = async (d) => {
        try {

            let contactid = localStorage.getItem("contactid")
            console.log(contactId, "cccccccccccccccccccccccccccc");
            const res = await Updatecontactdetaials(contactid, typeOfContactDetail, valueOfContactDetail);
            enqueueSnackbar('contact updated Successfully', { variant: "success" })
            console.log(res);
            handleClose();
        }
        catch (error) {
            enqueueSnackbar('Try Again', { variant: "error" })
        }
    };

    const handleFilterbtn = async () => {
        setPage((prev) => 1)
        handleSubmit()
    }


    const handleDelete = async (d) => {
        try {
            const res = await DeleteContactDeatils(d.id);

            if (res.status == 200) {
                setUpdateTable((prev) => !prev);
                console.log("rty");
            }
        }
        catch (error) {
            enqueueSnackbar('Try Again', { variant: "error" })
        }
    };

    const resetButton = () => {
        setTypeOfContactDetail(prev => "")
        setValueOfContactDetail(prev => "")
        setReset((prev) => !prev)
    }


    // useEffect(() => {
    //     handleFilterbtn();
    // }, [reset])



    const gettypeOfContactDetail = async (e) => {
        setTypeOfContactDetail(e.target.value)
    }
    const getvalueOfContactDetail = async (e) => {
        setValueOfContactDetail(e.target.value)
    }
    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <form>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">
                            Type of ContactDetails
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            aria-describedby="emailHelp"
                            value={typeOfContactDetail}
                            onChange={gettypeOfContactDetail}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">
                            value of contactDetails
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={valueOfContactDetail}
                            onChange={getvalueOfContactDetail}
                        />
                    </div>


                    <button class="btn btn-primary" onClick={updateButton} >
                        Update Contactdetails
                    </button>
                </form>
            </Modal>


            <SnackbarProvider autoHideDuration={3000} />
            <NavbarComponent />

            <CreateContactDetails handleSubmit={handleSubmit} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form action='#' style={{ padding: 1, margin: 15 }}>

                    <input type="text" placeholder='type of contactdetail' style={{ margin: 15 }} onChange={gettypeOfContactDetail} />
                    <input type="text" placeholder='value of contactdetail' style={{ margin: 15 }} onChange={getvalueOfContactDetail} />
                    <button onClick={handleSubmit} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Submit</button>
                    {/* <button style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button> */}
                    {/* <button onClick={handleReset} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button> */}
                    <button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Reset</button>
                </form>

            </div>
            <label htmlFor="count">{count}</label>
            <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} updateUser={true} deleteUser={true} updateFunction={handleUpdate} deleteFunction={handleDelete} setShow={setShow} />
        </div>
    )
}

export default GetAllContactDetails