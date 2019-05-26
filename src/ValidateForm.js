import React, { Component } from 'react'
import "./ValidateForm.css";

class ValidateForm extends Component {
    constructor(props) {
        super(props);
        this.state = { bvn: "" }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (isNaN(this.state.bvn)) {
            alert("Please review your BVN")
            this.setState({ bvn: "" })
        } else {
            this.props.validate(this.state.bvn)
            this.setState({ bvn: "" })
        }

    }

    render() {
        const { bvn } = this.state
        return (
            <form className="ValidateForm" onSubmit={this.handleSubmit}>
                <label htmlFor="bvn">Rave Bvn Customer Validation Sample Form</label>
                <input
                    type="text"
                    id="bvn"
                    name="bvn"
                    placeholder="Please enter your BVN for validation"
                    value={bvn}
                    onChange={this.handleChange}
                    required
                    disabled={(this.props.Loaded) ? true : false}
                />
                {(this.props.Loaded) ? "" : <button disabled={(this.props.Loading) ? true : false}>{(this.props.Loading) ? "Validating..." : "Validate BVN"}</button>}
            </form>
        )
    }
}

export default ValidateForm;