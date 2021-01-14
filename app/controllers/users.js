const Users = require("../models/users.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    // console.log(req.body)
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        created_at: new Date(),
        updated_at: new Date()
    });

    // Save Customer in the database
    Users.create(users, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Users.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });  
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Users.findById(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.userId
            });
          }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        // created_at: new Date(),
        updated_at: new Date()
    });

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Users.updateById(
        req.params.userId,
        users,
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found User with id ${req.params.userId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating User with id " + req.params.userId
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Users.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.userId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};