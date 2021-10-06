import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./PrescriptionList.css";
import Navbar from "../Navbar/Navbar";

export default class PrescriptionList extends Component {
  state = {
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

  async componentDidMount() {
    const prescription = await axios
      .get("http://localhost:4000/prescription/")
      .then((result) => {
        this.setState({
          prescriptions: result.data,
        });
      });
  }

  delete(_id) {
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
          axios.delete("http://localhost:4000/prescription/" + _id).then(() => {
            this.componentDidMount();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled");
        }
      });
  }
  render() {
    const { prescriptions } = this.state;
    return (
      <div className="col s9">
        <Navbar/>
        <Link to='/prescription'><button className="addMedBtn">Add Prescription</button></Link>
        <table className="responsive-table highlight">
          <tr>
            <th className="td">Medicine Name</th>
            <th className="td">Patient Name</th>
            <th className="td">Doctor Name</th>
            <th className="td">Instructor</th>
            <th className="td">Dosage</th>
            <th className="td">Date</th>
            <th className="td">Quantity</th>
            <th className="td">Price</th>
            <th className="td">Gross Total</th>
            <th className="td"></th>
          </tr>
          {prescriptions.map((prescription) => {
            return (
              <tr key={prescription._id} className="">
                <td>{prescription.medName}</td>
                <td>{prescription.patientName}</td>
                <td>{prescription.docName}</td>
                <td>{prescription.instructions}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.date.slice(0,10)}</td>
                <td>{prescription.quantity}</td>
                <td>{prescription.price}</td>
                <td>{prescription.grossTotal}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/prescriptionUpdate/",
                      id: prescription._id,
                    }}
                  >
                    <FontAwesomeIcon size="2x" icon={faEdit} />
                  </Link>

                  <FontAwesomeIcon
                    size="2x"
                    icon={faTrash}
                    onClick={(e) => this.delete(prescription._id)}
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
