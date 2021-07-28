import React, { Component } from "react";
import axios from "axios";

const Flat = (props) => (
  <tr>
    <td>{props.flat.address}</td>
    <td>{props.flat.landlord_name}</td>
    <td>{props.flat.tenant_name}</td>
  </tr>
);

export default class FlatList extends Component {
  constructor(props) {
    super(props);
    this.state = { flats: [] };
  }

  // Here we load the list of flats from mongo
  componentDidMount() {
    const config = {
      headers: {
        "Content-Type": "application/graphql",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const query = `
    {
        getFlats {
          address
          landlord_name
          tenant_name
        }
    }`;

    const API_URL = "http://localhost:5000/graphql";

    axios
      .post(API_URL, query, config)
      .then((response) => {
        this.setState({ flats: response.data.data.getFlats });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will map out the users on the table
  flatList() {
    if (!this.state.flats) {
      return;
    }

    return this.state.flats.map((currentFlat) => {
      return <Flat flat={currentFlat} key={currentFlat._id} />;
    });
  }

  // This following section will display the table with the flat details
  render() {
    return (
      <div>
        <h3>Flat List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Landlord</th>
              <th>Tenant</th>
            </tr>
          </thead>
          <tbody>{this.flatList()}</tbody>
        </table>
      </div>
    );
  }
}
