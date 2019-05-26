import React, { Component } from 'react';
import axios from "axios";
import "./Validate.css";
import ValidateForm from './ValidateForm';

class Validate extends Component {

    constructor(props) {
        super(props);
        this.state = { data: {}, Loading: false, Loaded: false }
        this.validate = this.validate.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.setState({
            data: {},
            Loading: false,
            Loaded: false
        })
    }

    validate(bvn) {
        //Secret key
        const key = "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X";
        this.setState({ Loading: true, Loaded: false })
        const API = `https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${bvn}?seckey=${key}`;
        axios.get(API).then(response => {
            if (response.data.status === "success") {
                let details = response.data.data
                this.setState(st => ({
                    Loaded: true,
                    Loading: false,
                    data: { ...st.data, ...details }
                }))
            }
        })
    }
    renderInfo() {
        const { Loaded, Loading, data } = this.state
        let pick = 3;
        if (Loading) {
            return <div className={"loader"}></div>
        } else {
            if (Loaded) {
                return (
                    <div className="Validate-details">
                        <div className="Validate-hi">Hello!, {data["first_name"]}</div>
                        <form className="Validate-details-form" onSubmit={this.submit}>
                            <div>
                                <label htmlFor="name">BVN: </label>
                                <input id="name" defaultValue={data["bvn"]} disabled />
                            </div>
                            <div>
                                <label htmlFor="name">First Name: </label>
                                <input id="name" defaultValue={data["first_name"]} disabled />
                            </div>
                            <div>
                                <label htmlFor="name">Midlle Name: </label>
                                <input id="name" defaultValue={data["middle_name"]} disabled />
                            </div>
                            <div>
                                <label htmlFor="name">Last Name: </label>
                                <input id="name" defaultValue={data["last_name"]} disabled />
                            </div>
                            <div>
                                <label htmlFor="name">Date Of Birth: </label>
                                <input id="name" defaultValue={data["date_of_birth"]} disabled />
                            </div>
                            <div>
                                <label htmlFor="name">Phone Number: </label>
                                <input id="name" defaultValue={data["phone_number"]} disabled />
                            </div>
                            <button>OK</button>
                        </form>
                    </div>
                )
            } else {
                return <div></div>
            }
        }
    }

    render() {
        return (
            <div className="d-flex">
                <div className="Validate">
                    <ValidateForm validate={this.validate} Loading={this.state.Loading} Loaded={this.state.Loaded} />
                    {this.renderInfo()}
                </div>
            </div>

        )
    }
}

export default Validate;