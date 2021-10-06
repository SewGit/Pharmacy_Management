const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const medicineRoutes = express.Router();
const prescriptionRoutes = express.Router();
const PORT = 4000;

let Medicine = require('./medicine');
let Prescription = require('./prescription');
const medicine = require('./medicine');
const prescription = require('./prescription');

app.use(cors());
app.use(bodyParser.json());

// Medicine Functions Implementation

medicineRoutes.route('/').get(function(req, res) {
    Medicine.find(function(err, medicine) {
        if(err) {
            console.log(err);
        }else {
            res.json(medicine);
        }
    });
});

medicineRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Medicine.findById(id, function(err, medicine) {
        res.json(medicine);
    });
});

medicineRoutes.route('/update/:id').post(function(req, res) {
    Medicine.findById(req.params.id, function(err, medicine) {
    if(!medicine)
        res.status(404).send("Data is not found");
    else
    medicine.medName = req.body.medName,
    medicine.medCategory = req.body.medCategory,
    medicine.medEffects = req.body.medEffects,
    medicine.quantity = req.body.quantity,
    medicine.company = req.body.company,
    medicine.storeBox = req.body.storeBox,
    medicine.purchasePrice = req.body.purchasePrice,
    medicine.salePrice = req.body.salePrice,
    medicine.expDate = req.body.expDate,

    medicine.save().then(medicine => {
        res.json('Medicine Updated!');
    })
    .catch(err => {
        res.status(400).send("Update not possible");
    });
})
})

medicineRoutes.route('/add').post(function(req, res) {
    let medicine = new Medicine(req.body);
    medicine.save()
    .then(medicine => {
        res.status(200).json({'medicine': 'medicine added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new medicine failed');
    });
});

medicineRoutes.route('/:id').delete(function(req, res) {
    Medicine.findById(req.params.id)
    .then(medicine => medicine.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

// Prescription Functions Implementation

prescriptionRoutes.route('/').get(function(req, res) {
    Prescription.find(function(err, prescription) {
        if(err) {
            console.log(err);
        }else {
            res.json(prescription);
        }
    });
});

prescriptionRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Prescription.findById(id, function(err, prescription) {
        res.json(prescription);
    });
});

prescriptionRoutes.route('/update/:id').post(function(req, res) {
    Prescription.findById(req.params.id, function(err, prescription) {
    if(!prescription)
        res.status(404).send("Data is not found");
    else
    prescription.medName = req.body.medName,
    prescription.docName = req.body.docName,
    prescription.instructions = req.body.instructions,
    prescription.patientName = req.body.patientName,
    prescription.dosage = req.body.dosage,
    prescription.date = req.body.date,
    prescription.quantity = req.body.quantity,
    prescription.price = req.body.price,
    prescription.grossTotal = req.body.grossTotal,

    prescription.save().then(prescription => {
        res.json('Prescription Updated!');
    })
    .catch(err => {
        res.status(400).send("Update not possible");
    });
})
})

prescriptionRoutes.route('/add').post(function(req, res) {
    let prescription = new Prescription(req.body);
    prescription.save()
    .then(prescription => {
        res.status(200).json({'prescription': 'prescription added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new prescription failed');
    });
});

prescriptionRoutes.route('/:id').delete(function(req, res) {
    Prescription.findById(req.params.id)
    .then(prescription => prescription.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

app.use('/medicine', medicineRoutes);
app.use('/prescription', prescriptionRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});