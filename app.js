var server = require('./managers/server'),
    async = require('async'),
    routes = require('./config/routes');

function listen(cb){
    server.listen(process.env.PORT || 8080, function() {
        cb(null);
    });
}

// app routes and socket hooks
async.series([
    // apply routes
    routes,
    listen
],
    function(err){
        if(err)
            console.error('Error',err);
        console.log('%s listening at %s', server.name, server.url);
    });
