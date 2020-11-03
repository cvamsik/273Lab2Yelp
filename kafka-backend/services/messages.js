const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");
const mongoose = require("mongoose");
const routes = require("../config/routeConstants");

const Messaging = require('../models/Messaging')
const Message = require('../models/Messaging')
function handle_request(msg, callback) {

    console.log("Inside Login Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_INITIATE_MESSAGE":
            {
                let messaging = new Messaging({
                    conversation_id: msg.body.conversation_id,
                    restaurant_id: msg.body.restaurant_id,
                    customer_id: msg.body.customer_id
                })
                messaging.save().then((res) => {
                    console.log('Restaurant Profile Created ' + response)
                    callback(null, response)
                }).catch((err) => {
                    console.log('Unable to create Login Creds' + err)
                    callback(err, 'Error')
                })
                break;
            }
        case "POST_MESSGAGES": {
            let message = new Message({
                message: msg.body.message,
                timeStamp: Date.now(),
                sender: msg.body.sender
            })
            Message.save().then(
                Messaging.findOneAndUpdate({ conversation_id: msg.body.conversation_id }, { $push: { "messages": message } }, (err, result) => {
                    if (err) {
                        console.log('Error occured while Updating Conversation' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Message Created' + result)
                        callback(null, result)
                    }
                })
            ).catch((err) => {
                console.log('Error occured while creating Message' + err)
                callback(err, 'Error')
            })
            break;
        }
        case "GET_MESSAGES_LIST_RESTAURANT": {
            Messaging.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            })
            break;

        }
        case "GET_MESSAGES_LIST_CUSTOMER": {
            Messaging.find({ customer_id: msg.body.customer_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            })
            break;


        }
        case "GET_MESSAGES": {
            Messaging.find({ customer_id: msg.body.customer_id }, { restaurant_id: msg.body.restaurant_id }, (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Conversations' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('Fetching Conversations' + result)
                    callback(null, result)
                }
            })
            break;


        }
        default: {
            console.log("Hitting Default")
        }


    }

};

exports.handle_request = handle_request;


