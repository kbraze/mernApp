import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLandlordName = this.onChangeLandlordName.bind(this);
    this.onChangeTenantName = this.onChangeTenantName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      address: "",
      landlord_name: "",
      tenant_name: "",
    };
  }

  // These update the state
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeLandlordName(e) {
    this.setState({
      landlord_name: e.target.value,
    });
  }

  onChangeTenantName(e) {
    this.setState({
      tenant_name: e.target.value,
    });
  }

  // This handles the submission
  onSubmit(e) {
    e.preventDefault();

    // create and post the new flat object
    const flat = {
      address: this.state.address,
      landlord_name: this.state.landlord_name,
      tenant_name: this.state.tenant_name,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const query = `
      mutation ($flat: FlatInput!) {
        setFlat(flat: $flat) {
          address
          landlord_name
          tenant_name
        }
      }`;

    const variables = { flat: flat };

    const API_URL = "http://localhost:5000/graphql";

    const data = { query, variables };

    axios.post(API_URL, data, config);

    // Clear the state
    this.setState({
      address: "",
      landlord_name: "",
      tenant_name: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Landlord's name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.landlord_name}
              onChange={this.onChangeLandlordName}
            />
          </div>
          <div className="form-group">
            <label>Tenants's name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.tenant_name}
              onChange={this.onChangeTenantName}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create flat"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
