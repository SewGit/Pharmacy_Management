import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Navbar/Navbar";

export default class updatePrescription extends Component {
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
      prescriptions: [],
    };
  }

  async componentDidMount() {
    let id = this.props.location.id;
    await axios
      .get("http://localhost:4000/prescription/" + id)
      .then((result) => {
        this.setState({
          medName: result.data.medName,
          patientName: result.data.patientName,
          docName: result.data.docName,
          instructions: result.data.instructions,
          dosage: result.data.dosage,
          date: result.data.date,
          quantity: result.data.quantity,
          price: result.data.price,
          grossTotal: result.data.grossTotal,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
    let id = this.props.location.id;
    axios
      .post("http://localhost:4000/prescription/update/" + id, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Updated!",
        }).then(() => {
          window.location = "/prescriptionList";
        });
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar />
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
                  <button type="submit" className="Button-Add">
                    <FontAwesomeIcon icon={faCheckCircle} /> Update 
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
