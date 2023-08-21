const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    //resturant admins should approve connection after login with their branch id in 'connect' event.
    socket.on("approve_connection", (branch_id) => {
        socket.join(branch_id)
    });

    //resturant admin should listen that event for customer orders... 
    socket.on('from_customer', (data) => {
        //customers should order to resturants with that particular branch id...
        socket.to(data.branch).emit("to_resturant_admin", data);
    })
})

httpServer
    .listen(7000, () => {
        console.log("server is on!");
    })