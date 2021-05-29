/* :::::::::::::: Imports :::::::::::::: */
const models = require("../models");
const fs = require('fs');

exports.create = async (req, res) => {
    try {
        var findUser = await models.User.findOne({
            where: { id: req.user.id }
        });
        if(!findUser) {
            throw new Error('Sorry,we can not find your account');
        };

        if (req.file) {
            var attachmentUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        } else {
            var attachmentUrl = null;
        };
        
        var newPost = {
            title: req.body.title,
            content: req.body.content,
            attachment: attachmentUrl,
            likes: 0,
            userId: findUser.id
        };
        if(!newPost) {
            throw new Error(" A parameter is missing");
        }

        models.Message.create(newPost)
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        }); 
    } catch (err) {
        res.status(400).json({message: 'Could not create this post' });
    }
};

exports.getAll = async (req, res) => {
    try{
        var fields = req.query.fields;
		var order = req.query.order;

        var messages = await models.Message.findAll({
            order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
            attributes: fields != "*" && fields != null ? fields.split(",") : null,
            include: [{
                model: models.User,
				attributes: ["username"]
            }]
        });
        if (!messages) {
            throw new Error('Nothing to fetch');
        } else {
            res.status(200).json({ messages });
        };
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const getMessage = await models.Message.findOne({
            where: { id: req.params.id }
        });
        if (!getMessage) {
			throw new Error("Could not reach this message");
		} else {
            var destroyMessage = await models.Message.destroy({
                where: { id: req.params.id }
            });
            if (!destroyMessage) {
                throw new Error("Could not delete this message");
            } else {
                res.status(200).json({ message: "Post has been deleted with success" });
            }
        }
    } catch (error) {
		res.status(404).json({ error: error.message });
	}
};