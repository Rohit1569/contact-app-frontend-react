import axios from "axios";
export const CreateContact = async (firstName, lastName, id) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/contact/${id}/create`, { firstName, lastName, id }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}