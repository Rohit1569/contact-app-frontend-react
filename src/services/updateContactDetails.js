import axios from "axios";

export const Updatecontactdetaials = async (id, typeOfContactDetail, valueOfContactDetail) => {
    const res = await axios.put(`http://127.0.0.1:20200/api/v1/contactdetail/${id}`, { typeOfContactDetail, valueOfContactDetail }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}