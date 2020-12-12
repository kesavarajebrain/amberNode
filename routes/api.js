const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const db = "mongodb+srv://interview:12stdmark789@interviewtaskcluster.dines.mongodb.net/InterviewTaskCluster?retryWrites=true&w=majority";
var http = require("http");
// const Employee = require('../models/employee');
// const Slot = require("../models/slot")
const Consule = require('../models/consulting')
var nodemailer = require('nodemailer');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log('Error !' + err);
    } else {
        console.log('connected to mongoDB');
    }
});

// router.post('/registerEmployee', (req, res) => {
//     let employeeData = req.body;
//     let employee = new Employee(employeeData);

//     Employee.find(
//         {
//             $or: [{
//                 empEmail: { $exists: true, $ne: null, $eq: employeeData.empEmail }
//             },
//             {
//                 empPhone: { $exists: true, $ne: null, $eq: employeeData.empPhone }
//             }
//             ]
//         },
//         async (err, result) => {
//             if (result.length > 0) {
//                 res.status(200).send({ status: false, statusCode: 404, msg: 'Employee Already Exists!' });
//             } else {
//                 employee.save((error, employee) => {
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         var transporter = nodemailer.createTransport({
//                             service: 'gmail',
//                             auth: {
//                                 user: '', //user gmail and pw
//                                 pass: ''
//                             }
//                         });

//                         var mailOptions = {
//                             from: 'kesavarajtry@gmail.com',
//                             to: employeeData.empEmail,
//                             subject: 'Welcome Mail - Employee Management System!',
//                             text: 'Hi '+ employeeData.empName +', This is a welcome email to you from us...!'
//                         };

//                         transporter.sendMail(mailOptions, function (error, info) {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log('Email sent: ' + info.response);
//                             }
//                         });
//                         res.status(200).send({ status: true, statusCode: 200, msg: "Employee Registered Successfully!", employee });
//                     }
//                 })
//             }
//         }
//     )
// });

// router.get('/getEmployees', (req, res) => {
//     Employee.aggregate([{ "$group": {
//         "_id": {
//             "empName": "$empName",
//             "_id": "$_id"
//         }
//     }}], (error, user) => {
//       if (error) {
//         console.log(error)
//       } else {
//         res.status(200).send({ status: true,statusCode:200, msg: "Employee Names fetched Successfully!", data: user })
//       }
//     }).sort({ _id: -1 });
//   });

  router.post('/saveSlot',  async(req, res) => {
    let checkStartDateandTime = await Consule.find({
            '$and':[
                
               {slotDate:{$exists:true, $eq:req.body.slotDate}},
               {endTime:{$exists:true, $eq:req.body.endTime}},
               {startTime:{$exists:true, $eq:req.body.startTime}}
            ]               
            }).exec();

      if(checkStartDateandTime.length>0)
      {
        res.status(200).send({ status: true,statusCode:400, msg: "Slot Already Alloted!" })
      }
     else
      {
        let slotData = req.body;
        let slot = new Consule(slotData);
        await slot.save((error, slotData) => {
          if (error) {
          } else {
            res.status(200).send({ status: true,statusCode:200, msg: "Slot data Saved!", data: slotData });
          }
        })
      }
  });

  
  router.post('/searchSlot', (req, res) => {
    let searchData = req.body
    console.log('######', searchData)
    Consule.find({ slotDate: searchData.slotDate }, (error, slots) => {
      if (error) {
        console.log(error)
      } else {
        res.status(200).send({ status: true,statusCode:200, msg: " Data Fetched Successfully!", data: slots })
      }
    });
  });

  router.post('/bookAppointment', function (req, res) {
      console.log(req.body)
      Consule.findByIdAndUpdate(
        req.body._id,
        {
          $set: {
            pateientNumber: req.body.pateientNumber,
            pateientName: req.body.pateientName,
            appointment:req.body.appointment
          }
        },
        {
          new: true
        },
        function (err, updateSlot) {
          if (err) {
            res.send('Error updating ID status');
          } else {
            res.status(200).send({ status: true,statusCode:200, msg: " Appointment Booked!", updateSlot });
          }
        }
      );
  });

  router.get('/getAllAppointments', (req, res) => {
    Consule.find((error, slots) => {
      if (error) {
        console.log(error)
      } else {
        res.status(200).send({ status: true,statusCode:200, msg: " Data Fetched Successfully!", data: slots })
      }
    });
  });
  

module.exports = router;
