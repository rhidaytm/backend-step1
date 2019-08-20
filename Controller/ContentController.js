const Posts = require('../Models/Posts');
const middlewareAuth = require("../Middleware/Auth");
const jimp = require('jimp');
const fs = require("fs");

exports.Index = (req, res, next) => {
    res.status(200)
        .json({ msg: 'QTHA REST API v.0.0.1',
     });
}

exports.List = (req, res, next) => {
    Posts.findAll().then((result) => {
        if (middlewareAuth.keys(req.body.keys)) {
            res.status(200).json({
              msg: "connection success",
              data: result
            });
        } else {
            res.status(401).json({
                msg: "auth not permited"
            });
        }
    }).catch((err) => {
        res.status(402).json({
            msg: 'conection errors'
        })
    })
}

exports.Create = (req, res, next) => {
    const title = req.body.content_title;
    const contentText = req.body.content_text;

    if (middlewareAuth.keys(req.body.keys)) {
        var imageUrl = null;

        if (req.file) {
            imageUrl = req.file.originalname;

            let width = 400;
            let height = 400;

            jimp.read('./' + req.file.path).then(image => {
                image
                    .resize(400, jimp.AUTO)
                    .crop(0, 0, 400, 400)
                    .background(0xFFFFFFF)
                    .quality(80)
                    .write('./public/uploads/' + req.file.originalname);

                console.log('success manipulation')
            }).catch(() => {
                console.log('Error Occured');
            })
        }

        const post = new Posts({
            content_title: title,
            content_text: contentText,
            content_image: imageUrl
        });

        post.save().then(result => {
            res.status(200).json({
                data: post,
                msg: "success uploaded"
            });
        })
    } else {
        res.status(401).json({
            msg: "auth not permited"
        });
    }
}

exports.Delete = (req, res, next) => {
    if (middlewareAuth.keys(req.body.keys)) {
        Posts.findAll({
            where: {
                id: req.params.id
            }
        }).then(postsId => {
            try {
                fs.unlinkSync(
                    "./public/uploads/" + postsId[0].content_image
                );

                Posts.destroy({
                    where: {
                        id: postsId[0].id
                    }
                }).then( 
                    function(rowDeleted) {
                        if (rowDeleted === 1) {
                            res.status(401).json({
                                msg: "Delete Success"
                            });
                        }
                    },
                    function(err) {
                        console.log(err);
                    }
                );
            } catch (err) {
                console.error(err);
            }
        }).catch(err => {
            res.send(err);
        });        
    } else {
        res.status(401).json({
            msg: "auth not permited"
        });
    }
}