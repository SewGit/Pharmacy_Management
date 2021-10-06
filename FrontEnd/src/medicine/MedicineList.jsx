import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./MedicineList.css"
// import medicine from "./medicine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
// import navbar from "../NavBar/navbar";
import generateMedicinePDF from "./MedicineReport";
import Navbar from "../Navbar/Navbar";

export default class MedicineList extends Component {
  state = {
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

    onClick:false
  };

  async componentDidMount() {
    const medicine = await axios
      .get("http://localhost:4000/medicine/")
      .then((result) => {
        this.setState({
          medicines: result.data,
        });
      });
  }

  delete(_id) {
    // let id=this.props.location.id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Do you want to delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted",
            "Item has been deleted",
            "success"
          );
          axios
            .delete("http://localhost:4000/medicine/" + _id)
            .then(() => {
              this.componentDidMount();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled");
        }
      });
  }

  render() {
    const { medicines } = this.state;
    return (
      <div className="col s9">
        <Navbar/>
        <div className="ReportRow">
              <Link to='/'><button className="addMedBtn">Add Medicine</button></Link>
              <button className="ReportButton" onClick={() => {generateMedicinePDF(this.state.medicines)}}>Generate Report</button>
          </div>
        <table className="responsive-table highlight">
          {/* <thead> */}
          <tr>
            <th className="td">Medicine Name</th>
            <th className="td">Medicine Category</th>
            <th className="td">Effects</th>
            <th className="td">Quantity</th>
            <th className="td">Company</th>
            <th className="td">Store Box</th>
            <th className="td">Purchase Price</th>
            <th className="td">Sale Price</th>
            <th className="td">Expire Date</th>
            <th className="td"></th>
          </tr>
          {medicines.map((medicine) => {
            return (
              <tr 
              key={medicine._id}
              className="">
                <td>{medicine.medName}</td>
                <td>{medicine.medCategory}</td>
                <td>{medicine.medEffects}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.company}</td>
                <td>{medicine.storeBox}</td>
                <td>{medicine.purchasePrice}</td>
                <td>{medicine.salePrice}</td>
                <td>{medicine.expDate.slice(0,10)}</td>
                <td>
                  <Link to={{pathname: "/medicineUpdate/" ,id:medicine._id}} ><FontAwesomeIcon size="2x"
                    icon={faEdit}/></Link>
                  <FontAwesomeIcon
                    size="2x"
                    icon={faTrash}
                    onClick={(e) => this.delete(medicine._id)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
