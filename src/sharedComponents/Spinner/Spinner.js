import React from 'react'
import "./Spinner.css"
const Spinner = ({ loading }) => {
    return (
        <>
            <div class="loader" style={{ display: loading ? "block" : "none" }}>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
                <div class="dot-spinner__dot"></div>
            </div></>
    )
}

export default Spinner