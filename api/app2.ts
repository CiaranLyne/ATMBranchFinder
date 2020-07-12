import express from "express";

const router = express();

router.get("/atm", (req, res, next) => {
    // var bank = req.body.bank;
    // var lat = req.body.lat;
    // var lng = req.body.lng;
    // var dist = req.body.dist;

    // console.log(req.body.bank);

    // res.send(ATMFinder([bank],[lat,lng],dist));
    console.log("hello")
    res.send("hello world");
    next();
});

const port = 3000;
router.listen(port, () => console.log(`Listening on port ${port}.`));


// router.use( bodyParser.json() );       // to support JSON-encoded bodies
// router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
//
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//
// router.get("/atm", function(req, res, next){
//     var bank = req.body.bank;
//     var lat = req.body.lat;
//     var lng = req.body.lng;
//     var dist = req.body.dist;
//
//     console.log(req.body.bank);
//
//     res.send(ATMFinder([bank],[lat,lng],dist));
// });
//
// router.get("/branch", function(req, res, next){
//     var bank = req.body.bank;
//     var lat = req.body.lat;
//     var lng = req.body.lng;
//     var dist = req.body.dist;
//
//     console.log(req.body.bank);
//
//     res.send(BranchFinder([bank],[lat,lng],dist));
// });
//
// const port = 3000;
//
// router.listen(port, () => console.log(`Listening on port ${port}.`));
//
// //console.log(BranchFinder(["RBS"],[55.85282300,-4.22867800],10));