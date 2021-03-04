const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const db = "mongodb+srv://interview:12stdmark789@interviewtaskcluster.dines.mongodb.net/InterviewTaskCluster?retryWrites=true&w=majority";
var http = require("http");
const User = require('../models/user');
const Trains = require('../models/trains');
const Booking = require("../models/booking")

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log('Error !' + err);
    } else {
        console.log('connected to mongoDB');
    }
});

  router.post('/addUser', (req, res) => {
      let contactData = req.body;
      User.find(
        {
          mobNumber: contactData.mobNumber
        },
        async (err, result) => {
          if (result.length > 0) {
            res.status(200).send({ status: false,statusCode:400, msg: 'User already exist',});
          } else {
            let new_user = new User(contactData);
            new_user.save((error, program) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).send({ status: true,statusCode:200, msg: "User Added Successfully!",data:new_user });
              }
            })
          }
        }
      )
  });
  
  
  router.post('/logUser',(req,res)=>{
    let userData = req.body
    User.findOne({mobNumber: userData.mobNumber},(error,user)=>{
        if(error){
            console.log(error)

        }else{
            if(!user){
                res.status(200).send({ status:false,statusCode:400,msg:'Invalid Phone Number'})
               
            }else{
                if(user.userPassword !== userData.userPassword){
                    res.status(200).send({status:false,statusCode:400,msg:'Invalid Password'})
                }else{
                 res.status(200).send({statusCode:200, msg:'Valid User',data:user})
                }
            }
        }
    })
})
 

router.post('/searchTrains', (req, res) => {
  let searchData = req.body
  Trains.find({trainRoute:searchData.route}, (error, trains) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).send({ status: true,statusCode:200, msg: " Data Fetched Successfully!",data:trains})
    }
  });
});


router.post('/bookTrain', (req, res) => {
  let bookData = req.body
  let new_booking = new Booking(bookData);
  new_booking.save(bookData, (error, bookings) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).send({ status: true,statusCode:200, msg: " Data saved Successfully!",data:bookings})
    }
  });
});


router.post('/updateSeat', function (req, res) {
    Trains.findByIdAndUpdate(
      req.body.trainId,
      {
        $set: {
          available: req.body.available,
          booked: req.body.booked,
        }
      },
      {
        new: true
      },
      function (err, updateFeed) {
        if (err) {
          res.send('Error updating user');
        } else {
          res.status(200).send({ status: true,statusCode:200, msg: "data updated!" });
        }
      }
    );
});


router.post('/bookingSummary', (req, res) => {
  var searchData = req.body
  Booking.find({userId:req.body._id}, (error, trains) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).send({ status: true,statusCode:200, msg: " Data Fetched Successfully!",data:trains})
    }
  });
});



router.post('/cancelTicket', function (req, res) {
  Booking.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        status:'Cancelled',
      }
    },
    {
      new: true
    },
    function (err, updateFeed) {
      if (err) {
        res.send('Error updating user');
      } else {
        res.status(200).send({ status: true, statusCode:200, msg: "data updated!" });
      }
    }
  );
});

router.post('/getSeats', (req, res) => {
  console.log(req.body)
  Trains.find({_id:req.body.trainId}, (error, trains) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).send({ status: true,statusCode:200, msg: " Data Fetched Successfully!",data:trains})
    }
  });
});

module.exports = router;
