import { enqueueSnackbar } from 'notistack';
import React, { Component } from 'react'

export default class ValidationError extends Component {
    constructor(message, errorcode = 403, originalError = enqueueSnackbar(message, { variant: "error" })) {
        super(message, errorcode, originalError)
        this.name = "Validation Error"
        console.log("validation error", message, errorcode, originalError);
    }
}
