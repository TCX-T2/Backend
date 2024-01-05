// function (req,res,next) {
//     methode = req.method;
//     url = req.url;
//     resourse = url.split('/')[1];
//     console.log(methode + ' ' + resourse);
//     // create ACTION MODEL
//     next();
// }

// // override the res.send function
// oldSend = res.send;
// res.send = function (data) {
//     // if no error
//     if (res.statusCode < 400) {
//         // call the function to create the ACTION MODEL
//         // createActionModel(req, res, data);
//     }

//     oldSend.apply(res, arguments);
// }