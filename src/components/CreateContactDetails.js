import React, { useState } from 'react'



import { createcontactdetails as createcontactdetails } from '../services/createContactDetails'
import { enqueueSnackbar } from 'notistack'
import ValidationError from '../error/ValidationError'
const CreateUsers = ({ handleSubmit }) => {
    const [typeOfContactDetail, setTypeOfContactDetail] = useState("")
    const [valueOfContactDetail, setValueOfContactDetail] = useState("")

    const getTypeOfCd = (e) => {
        setTypeOfContactDetail(e.target.value)
    }
    const getvalueOfCd = (e) => {
        setValueOfContactDetail(e.target.value)
    }

    const handleCreateContactDetails = async (e) => {
        try {

            if (typeOfContactDetail == "") {
                throw new ValidationError("please enter type of contactDetail")
            }
            if (valueOfContactDetail == "") {
                throw new ValidationError('please enter value of contact detail')

            }
        }
        catch (error) {

        }
        const contactId = localStorage.getItem("contactid")
        const userId = localStorage.getItem("id")
        const response = await createcontactdetails(userId, contactId, typeOfContactDetail, valueOfContactDetail)
        alert("contact detail created")
        console.log(response);


    }

    return (
        <>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="typeOfCd" className="form-label">Enter Type Of contact details</label>
                    <input type="text" className="form-control" onChange={getTypeOfCd} placeholder='Enter Type Of contact details' required />
                </div>
                <div class="col-md-6">
                    <label for="valueOfCd" className="form-label">Enter value Of contact details</label>
                    <input type="text" class="form-control" onChange={getvalueOfCd} placeholder='Enter value Of contact details' required />
                </div>


                <div class="col-12">
                    <button className="btn btn-primary" onClick={handleCreateContactDetails}>Create ContactDetails</button>
                </div>
            </form>
        </>
    )
}

export default CreateUsers