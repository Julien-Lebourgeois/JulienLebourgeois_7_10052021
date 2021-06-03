/* :::::::::::::: Imports :::::::::::::: */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

/* :::::::::::::: REGEX :::::::::::::: */
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = /^(?=.*\d).{4,8}$/;

exports.signup = async (req, res) => {
    /* :::::::::::::: Params :::::::::::::: */
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    try {
        /* :::::::::::::: Check if params are empty :::::::::::::: */
        if (email == null || username == null || password == null) {
            throw new Error("Missing parameters");
        }
    
        /* :::::::::::::: Check pseudo length, mail regex, password etc... :::::::::::::: */
        if (username.length >= 15 || username.length <= 4) {
            throw new Error("wrong username (length must be 4 - 15)");
        }
    
        if (!email_regex.test(email)) {
            throw new Error('email is not valid');
        }
    
        if (!password_regex.test(password)) {
            throw new Error('password is not valid ( length must be 4 - 8 and include at least 1 number');
        }
    
        /* :::::::::::::: Check if user already exist in DB, if not proceed to creation :::::::::::::: */
        var alreadyExist = await models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        });
        if(alreadyExist) {
            throw new Error('this email is already used')
        } else {
            var newUser = await models.User.create({
                email: email,
                username: username,
                password: await bcrypt.hash(password, 5),
                isAdmin: 0
            });
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                });
            } else { 
                throw new Error('Impossible to create this account, please try again');
            }
        };
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.login = async (req, res) => {
    /* :::::::::::::: Params :::::::::::::: */
    var email = req.body.email;
    var password = req.body.password;

    try{
        /* :::::::::::::: Check if params are empty :::::::::::::: */
        if (email == null || password == null) {
            throw new Error("Missing parameters");
        }

        var findUser = await models.User.findOne({
            where: { email: email }
        });
        if (!findUser) {
            throw new Error("password or email incorrect");
        } else {
            bcrypt.compare(req.body.password, findUser.password)
            .then(valid => {
                if (!valid) {
                    throw new Error('password does not match !')
                }
                res.status(200).json({
                    userId: findUser.id,
                    token: jwt.sign(
                        { userId: findUser.id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '6h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        }
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.getProfile = async (req, res) => {
    try {
        /* :::::::::::::: Token check and decoded :::::::::::::: */
        if (req.headers && req.headers.authorization) {
          var authorization = req.headers.authorization.split(' ')[1],
            decoded;
          try {
            decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
          } catch (e) {
            return res.status(401).send('unauthorized');
          }
          var userId = decoded.userId;
          models.User.findOne({
                attributes: [ 'id', 'email', 'username', 'isAdmin' ],
                where: { id: userId }
            }).then(function (user) {
            return res.status(200).json(user);
          })
            .catch(err => {
              res.status(500).json({ message: err.message })
            });
        }
      }
      catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        /* :::::::::::::: Token check and decoded :::::::::::::: */
        if (req.headers && req.headers.authorization) {
          var authorization = req.headers.authorization.split(' ')[1],
            decoded;
          try {
            decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
          } catch (e) {
            return res.status(401).send('unauthorized');
          }
          var userId = decoded.userId;
          var getUser = await models.User.findOne({
              where: { id: userId } 
            })
          if (!getUser) {
            throw new Error("User not found");
          } else {
            models.User.destroy({
                where: { id: userId }
            })
            .then(function () {
                return res.status(200).json('User deleted');
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
              });
          }
        }
      }
      catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    /* :::::::::::::: Params :::::::::::::: */
    var email = req.body.email;
    var username = req.body.username;

    try {
        /* :::::::::::::: Token check and decoded :::::::::::::: */
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1],
              decoded;
            try {
              decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
            } catch (e) {
              return res.status(401).send('unauthorized');
            }
            var userId = decoded.userId;
            var getUser = await models.User.findOne({
                attributes: ['id', 'email', 'username'],
                where: { id: userId } 
              })
            if (!getUser) {
              throw new Error("User not found");
            } else {
              models.User.update({
                  email: email,
                  username: username,
              },
              { where: { id: userId }
            })
              .then(function () {
                  return res.status(200).json('Datas updated');
              })
              .catch(err => {
                  res.status(500).json({ message: 'cannot update user' });
                });
            }
          }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};