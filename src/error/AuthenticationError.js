import React, { Component } from 'react'

export default class AuthenticationError extends Component {
    constructor(message) {
        super(message)
        this.name = "NotFoundError"
    }
}
