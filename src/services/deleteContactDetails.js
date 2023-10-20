import axios from "axios";

export const DeleteContactDeatils = async (id) => {
    const res = await axios.delete(`http://127.0.0.1:20200/api/v1/contactdetail/${id}`, { headers: { auth: localStorage.getItem("auth") } })
    return res
}