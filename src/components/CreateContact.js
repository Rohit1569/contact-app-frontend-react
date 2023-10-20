import React, { useState } from 'react'
import { CreateContact as Create } from '../services/createContact'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import ValidationError from '../error/ValidationError'
const CreateContact = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userId, setUserId] = useState('')
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const handleCreate = async (d) => {
        try {
            if (firstName == "") {
                throw new ValidationError('please enter first name')
            }
            if (lastName == "") {
                throw new ValidationError('please enter last name')
            }
            let id = localStorage.getItem("id")
            console.log(localStorage, "llllllllllllllllllllllllllll");
            const res = await Create(firstName, lastName, id)
            enqueueSnackbar('Contact created successfully', { variant: "success" })
        }
        catch (error) {

        }

    }

    // const createButton = async () => {
    //     const res = await Create(firstName, lastName, userId)
    //     console.log(res)
    // }

    const getFirstname = (e) => {
        setFirstName(e.target.value)
    }
    const getLastname = (e) => {
        setLastName(e.target.value)
    }

    return (
        <>
            <div className="card mx-auto mt-1" style={{ width: "20rem" }}>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label>Enter First Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="firstname" placeholder='' onChange={getFirstname} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Last Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" placeholder='' onChange={getLastname} />
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => {
                            handleCreate()

                        }} >CreateAccount</button>
                    </form>
                </div>
            </div></>
    )
}

export default CreateContact