import axios from "axios";
export const UpdateContact = async (firstName, lastName, id) => {

    const res = await axios.put(`http://127.0.0.1:20200/api/v1/contact/${id}`, { firstName, lastName }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}