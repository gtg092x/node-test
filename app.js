var server = require('./managers/server'),
    async = require('async'),
    routes = require('./config/routes');

// dedicated listener method so we can have different process endpoints in the future
// eg: you may  want a dedicated web socket server:
//      you can use a command line argument or different script endpoint and have the same codebase for both
function listen(cb){
    server.listen(process.env.PORT || 8080, function() {
        cb(null);
    });
}

// app routes then listen
async.series([
    // apply routes
    routes,
    listen
],
    function(err){
        if(err)
            console.error('Error',err);
        // this is better than interpreting config because it's atomic to the server object
        console.log('%s listening at %s', server.name, server.url);
    });
