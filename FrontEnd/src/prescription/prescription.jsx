import React, { Component } from "react";
import "./prescription.css";
import axios from "axios";
import PrescriptionList from "./PrescriptionList";
import Navbar from "../Navbar/Navbar";

export default class prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medName: "",
      patientName: "",
      docName: "",
      instructions: "",
      dosage: "",
      date: "",
      quantity: 0,
      price: 0,
      grossTotal: 0,
    };
    this.state = { prescription: [] };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      medName: this.state.medName,
      patientName: this.state.patientName,
      docName: this.state.docName,
      instructions: this.state.instructions,
      dosage: this.state.dosage,
      date: this.state.date,
      quantity: this.state.quantity,
      price: this.state.price,
      grossTotal: this.state.grossTotal,
    };
    console.log("Data to send", data);

    axios
      .post("http://localhost:4000/prescription/add", data)
      .then((res) => console.log(res.data));

    this.setState({
      medName: "",
      patientName: "",
      docName: "",
      instructions: "",
      dosage: "",
      date: "",
      quantity: 0,
      price: 0,
      grossTotal: 0,
    });
  };

  reset() {
    const res = {
      medName: "",
      patientName: "",
      docName: "",
      instructions: "",
      dosage: "",
      date: "",
      quantity: 0,
      price: 0,
      grossTotal: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/prescription/")
      .then((response) => {
        this.setState({ prescription: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  prescriptionList() {
    return this.state.prescription.map((res, i) => {
      return <PrescriptionList obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="PrescriptionContainer">
          <h2>Prescription</h2>
          <hr className="horizonalLine" />
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="messages"></div>
              <div className="controls">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Medicine Name</label>
                      <input
                        id="form_name"
                        type="text"
                        name="medName"
                        className="form-control"
                        required="required"
                        data-error="Name is required."
                        value={this.state.medName}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Patient Name</label>
                      <input
                        id="form_email"
                        type="text"
                        name="patientName"
                        className="form-control"
                        required="required"
                        data-error="Name is required."
                        value={this.state.patientName}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Doctor Name</label>
                      <input
                        id="form_name"
                        type="text"
                        name="docName"
                        className="form-control"
                        required="required"
                        data-error="Category is required."
                        value={this.state.docName}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Dosage</label>
                      <input
                        id="form_email"
                        type="text"
                        name="dosage"
                        className="form-control"
                        required="required"
                        data-error="Store box is required."
                        value={this.state.dosage}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Quantity</label>
                      <input
                        id="form_name"
                        type="number"
                        name="quantity"
                        className="form-control"
                        required="required"
                        data-error="Effects is required."
                        value={this.state.quantity}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Instructions</label>
                      <input
                        id="form_email"
                        type="text"
                        name="instructions"
                        className="form-control"
                        required="required"
                        data-error="Purchase price is required."
                        value={this.state.instructions}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Date</label>
                      <input
                        id="form_name"
                        type="date"
                        name="date"
                        className="form-control"
                        required="required"
                        data-error="Quantity is required."
                        value={this.state.date}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Price</label>
                      <input
                        id="form_email"
                        type="number"
                        name="price"
                        className="form-control"
                        required="required"
                        data-error="Price is required."
                        value={this.state.price}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="form_name">Gross Total</label>
                    <input
                      id="form_name"
                      type="number"
                      name="grossTotal"
                      className="form-control"
                      required="required"
                      data-error="Category is required."
                      value={this.state.grossTotal}
                      onChange={this.handleChange}
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    type="reset"
                    className="Button-Reset"
                    onClick={this.reset()}
                  >
                    Clear
                  </button>
                  <input type="submit" className="Button-Add" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
