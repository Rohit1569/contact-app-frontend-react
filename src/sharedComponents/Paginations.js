import React from 'react'
import { Pagination } from "react-bootstrap";
const Paginations = ({ count, limit, setPage, page, setLimit }) => {
    let paginationItems = []
    for (let i = 1; i < Math.ceil(count / limit); i++) {
        paginationItems.push(<Pagination.Item key={i} onClick={(e) => { setPage((prev) => i); }} active={page === i}>{i}</Pagination.Item>)
    }
    const PaginationForUser = () => {
        return (
            <Pagination>
                <Pagination.Item key={0} onClick={(e) => {
                    setPage(prev => {
                        if (prev <= 1) {
                            return Math.ceil(count / limit)
                        }
                        return prev - 1
                    })

                }}>prev</Pagination.Item>
                {paginationItems}
                <Pagination.Item key={0} onClick={(e) => {
                    setPage(prev => {
                        if (prev >= Math.ceil(count / limit)) {
                            return 1
                        }
                        return prev + 1
                    })

                }}>next</Pagination.Item>



            </Pagination>
        )
    }
    return (
        <div>
            <PaginationForUser />
        </div>
    )
}
// const Paginations = ({ count, limit, handleLogin, setPage, page }) => {
//     let PaginationItems = []
//     for (let i = 1; i < Math.ceil(count / limit); i++) {
//         PaginationItems.push(<Pagination.Item key={i} onClick={(e) => { setPage((prev) => i); handleLogin(e) }} active={page === i}>{i}</Pagination.Item>)
//     }

//     let i
//     for (i = 1; i <= Math.ceil(count / limit); i++) {
//         PaginationItems.push(<Pagination.Item key={i} active={page == i} onClick={(e) => {
//             setPage((prev) => i);
//             handleLogin(e)
//         }}>{i}</Pagination.Item>)
//     }

//     const PaginationUser = () => {
//         return (
//             <Pagination>
//                 <Pagination.Item key={0} onClick={(e) => {
//                     setPage(prev => {
//                         if (prev <= 1) {
//                             return Math.ceil(count / limit)
//                         }
//                         return prev - 1
//                     })
//                     handleLogin(e)
//                 }}>prev</Pagination.Item>
//                 {PaginationItems}
//                 <Pagination.Item key={0} onClick={(e) => {
//                     setPage(prev => {
//                         if (prev >= Math.ceil(count / limit)) {
//                             return 1
//                         }
//                         return prev + 1
//                     })
//                     handleLogin(e)
//                 }}>next</Pagination.Item>



//             </Pagination>
//         )
//     }
//     return (
//         <div>
//             <PaginationUser />
//         </div>
//     )
// }

export default Paginations