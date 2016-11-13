/**
 * Created by GrooshBene on 2016. 11. 13..
 */
module.exports = init;

function init(app, Article, randomString) {

    app.post('/article/write', function (req, res) {
        var article = new Article({
            _id : randomString.generate(13),
            author : req.param('author'),
            portrait : req.param('portrait'),
            location : req.param('location'),
            source : req.param('source'),
            postAge : new Date(),
            imageUrl : req.param('imageurl'),
            headline : req.param('headline'),
            body : req.param('body'),
            numLikes : req.param('numlikes'),
            numComments : req.param('numcomments')
        });
        article.save(function (err, silence) {
            if(err){
                console.log('/article/write DB Error');
                throw err;
            }
            res.send(200, article);
        });
    });

    app.get('/article/list', function (req, res) {
        Article.find().sort({postAge: -1}).exec(function (err, result) {
            if(err){
                console.log('/article/list DB Error');
                throw err;
            }
            var temp_result = { "responseData" : result };
            res.send(200, temp_result);
        });
    });

    //function end
}