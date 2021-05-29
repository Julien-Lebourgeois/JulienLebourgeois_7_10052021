/* :::::::::::::: Imports :::::::::::::: */
const models = require("../models");
const fs = require('fs');

exports.create = async (req, res) => {
    try {
        var comment = req.body.content;

        var newCom = {
            content: comment,
            messageId: req.params.id,
            userId: req.user.id,
        };
        if (!newCom) {
            throw new Error(" A parameter is missing");
        }

        models.Comment.create(newCom)
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        }); 
    } catch (err) {
        res.status(400).json({message: 'Could not create this comment' });
    }
};

exports.getComments = async (req, res) => {
    try {
        var order = req.query.order;

        var comments = await models.Comment.findAll({
        attributes: ['id', 'content', 'userId', 'messageId'],
        where: { messageId: req.params.id },
        include: [{
            model: models.User,
            attributes: [ 'username' ]
        }],
        order: [ order != null ? order.split(':') : ['createdAt', 'DESC']]
        });
        if (!comments) {
            throw new Error ('There are no comments');
        } else {
            res.status(200).send({ comments });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        var findComment = await models.Comment.findOne({
            attributes: ['id', 'content', 'userId', 'messageId'],
            where: { id: req.params.id}
        });
        if (!findComment) {
            throw new Error('Can not find you comment');
        } else {
            await models.Comment.destroy({
                where: { id: req.params.id }
            })
            .then(function(){
                res.status(200).json({ message: 'Comment has been deleted'});
            })
            .catch(function(err) {
                res.status(400).json({ message: 'Can not delete this comment' });
            })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};