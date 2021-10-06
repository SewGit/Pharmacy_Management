import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Navbar/Navbar";

export default class updateMedicine extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      medName: "",
      medCategory: "",
      medEffects: "",
      quantity: 0,
      company: "",
      storeBox: "",
      purchasePrice: 0,
      salePrice: 0,
      expDate: "",
      medicines: [],
    };
  }

  async componentDidMount() {
    let id = this.props.location.id;
    console.log(id);
    await axios
      .get("http://localhost:4000/medicine/" + id)
      .then((result) => {
        this.setState({
          medName: result.data.medName,
          medCategory: result.data.medCategory,
          medEffects: result.data.medEffects,
          quantity: result.data.quantity,
          company: result.data.company,
          storeBox: result.data.storeBox,
          purchasePrice: result.data.purchasePrice,
          salePrice: result.data.salePrice,
          expDate: result.data.expDate,
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
      medCategory: this.state.medCategory,
      medEffects: this.state.medEffects,
      quantity: this.state.quantity,
      company: this.state.company,
      storeBox: this.state.storeBox,
      purchasePrice: this.state.purchasePrice,
      salePrice: this.state.salePrice,
      expDate: this.state.expDate.slice(0, 10),
    };
    let id = this.props.location.id;
    axios.post("http://localhost:4000/medicine/update/" + id, data).then(() => {
      Swal.fire({
        icon: "success",
        title: "Successfully Updated!",
      }).then(() => {
        window.location = "/medicineList";
      });
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar/>
        <div className="UpdateMedicineContainer">
          <h2>Update Medicine</h2>
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
                        placeholder="Enter Medicine Name"
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
                      <label for="form_email">Company</label>
                      <input
                        id="form_email"
                        type="text"
                        name="company"
                        className="form-control"
                        placeholder="Enter Company"
                        required="required"
                        data-error="Company is required."
                        value={this.state.company}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Expire Date</label>
                      <div
                        className="input-group date"
                        data-provide="datepicker"
                      >
                        <input
                          type="date"
                          className="form-control"
                          name="expDate"
                          value={this.state.expDate}
                          onChange={this.handleChange}
                        />
                        <div className="input-group-addon">
                          <span className="glyphicon glyphicon-th"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Medicine Category</label>
                      <input
                        id="form_name"
                        type="text"
                        name="medCategory"
                        className="form-control"
                        placeholder="Enter Category"
                        required="required"
                        data-error="Category is required."
                        value={this.state.medCategory}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Store Box</label>
                      <input
                        id="form_email"
                        type="text"
                        name="storeBox"
                        className="form-control"
                        placeholder="Enter Store Box"
                        required="required"
                        data-error="Store box is required."
                        value={this.state.storeBox}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Effects</label>
                      <input
                        id="form_name"
                        type="text"
                        name="medEffects"
                        className="form-control"
                        placeholder="Enter Effects"
                        required="required"
                        data-error="Effects is required."
                        value={this.state.medEffects}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Purchase Price</label>
                      <input
                        id="form_email"
                        type="number"
                        name="purchasePrice"
                        className="form-control"
                        placeholder="Enter Purchase Price"
                        required="required"
                        data-error="Purchase price is required."
                        value={this.state.purchasePrice}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Quantity</label>
                      <input
                        id="form_name"
                        type="number"
                        name="quantity"
                        className="form-control"
                        placeholder="Enter Quantity"
                        required="required"
                        data-error="Quantity is required."
                        value={this.state.quantity}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_email">Sales Price</label>
                      <input
                        id="form_email"
                        type="number"
                        name="salePrice"
                        className="form-control"
                        placeholder="Enter Sales Price"
                        required="required"
                        data-error="Sales price is required."
                        value={this.state.salePrice}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
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
