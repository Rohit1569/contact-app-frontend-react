import React, { Component } from 'react'

export default class BadRequestError extends Component {
    constructor(message) {
        super(message)
        this.name = "Bad Request"
    }
}
