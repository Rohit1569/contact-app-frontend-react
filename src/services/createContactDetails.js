import axios from "axios";
export const createcontactdetails = async (userId, contactId, typeOfContactDetail, valueOfContactDetail) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/contactdetail/${userId}/${contactId}`, { typeOfContactDetail, valueOfContactDetail }, { headers: { auth: localStorage.getItem("auth") } })

    return res
}