import React from 'react'
import Paginations from './Paginations';
import './Table.css'

const Table = ({ data, count, limit, setPage, page, setLimit, updateUser, deleteUser, updateFunction, deleteFunction, infoFunction, viewButton, setShow, getfirstName }) => {
    let headerOfUserTable, rowsOfUserTable, filterHeaders;

    if (data.length > 0) {
        let key = Object.keys(data[0])
        filterHeaders = Object.keys(data[0]).map((k) => {
            return (<>

                <label style={{ margin: "10px", fontWeight: "bold", color: "rgb(85, 174, 194)" }}>{k}</label>
                {k == "isAdmin" ? <>
                    <select class="form-select" style={{ width: "25%", borderRadius: "10px" }} aria-label="Default select example">

                        <option value="1">Admin</option>
                        <option value="2">User</option>

                    </select>

                </> : <input style={{ margin: "10px", fontWeight: "bold", color: "rgb(85, 174, 194)", height: "35px", borderRadius: "10px" }} type="text" />}

                <br></br>
            </>)


        });
        headerOfUserTable = Object.keys(data[0]).map((k) => {
            return (
                <>
                    <th>{k}</th>
                </>
            );
        });

        rowsOfUserTable = data.map((d) => {
            let singleRow = []

            for (let i = 0; i < key.length; i++) {
                if (d[key[i]] === true) {

                    singleRow.push(<td>true</td>)
                }
                if (d[key[i]] === false) {
                    singleRow.push(<td>false</td>)
                }


                else {
                    singleRow.push(<td>{d[key[i]]}</td>)
                }


            }
            if (updateUser == true) {
                singleRow.push(<td><button className='btn-primary3' onClick={() => {
                    updateFunction(d)

                }} style={{ backgroundColor: '#3c8dbc' }} >Update</button></td>)
            }
            if (deleteUser == true) {
                singleRow.push(<td><button className='btn-primary3' onClick={() => {
                    deleteFunction(d)

                }} style={{ backgroundColor: 'red' }} >delete</button></td>)
            }
            if (viewButton == true) {
                singleRow.push(<td><button className='btn-primary3' onClick={() => { infoFunction(d) }}>view</button></td>)
            }

            return (
                <tr>
                    {singleRow}
                </tr>
            );
        });
    }

    const TableOfUsers = () => {
        return (
            <>

                <div className="card" style={{ width: "20rem" }}>
                    <table class="table">
                        <thead>
                            <tr>{headerOfUserTable}</tr>
                        </thead>
                        <tbody>{rowsOfUserTable}</tbody>
                    </table>
                </div>
            </>

        );
    };
    return (
        <div className='part'>
            {/* <form><div style={{ display: 'flex', fontSize: 15 }}>{filterHeaders}</div>
                <button >Submit</button>
            </form> */}
            <div className='main'>
                <div>
                    <Paginations count={count} limit={limit} setPage={setPage} page={page} />
                </div>
                <div>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        onClick={(e) => {
                            setLimit((prev) => e.target.value);

                        }}
                    >
                        <option value="1" selected={limit == 1}>1</option>
                        <option value="2" selected={limit == 2}>2</option>
                        <option value="3" selected={limit == 3}>3</option>
                        <option value="4" selected={limit == 4}>4</option>
                        <option value="5" selected={limit == 5}>5</option>
                    </select>

                </div>
            </div>


            <TableOfUsers />
        </div>

    )
}

export default Table