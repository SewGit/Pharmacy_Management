
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import medicine from './medicine/medicine';
import prescription from './prescription/prescription';
import MedicineList from './medicine/MedicineList';
import updateMedicine from './medicine/updateMedicine';
import updatePrescription from './prescription/updatePrescription';
import PrescriptionList from './prescription/PrescriptionList';

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={medicine} />
      <Route path='/medicineList' component={MedicineList}/>
      <Route path='/medicineUpdate' component={updateMedicine}/>
      <Route path='/prescription' component={prescription} />
      <Route path='/prescriptionList' component={PrescriptionList}/>
      <Route path='/prescriptionUpdate' component={updatePrescription}/>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
