var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express - Satyam Sahay Example!!' });
});

module.exports = router;


router.get('/getCompanyCode/:compCode', function(req, res, next) {
    try {
    		var compCode = req.param('compCode');
            var ride2MD = req.param('Ride2MD');
            var logistiCare = req.param('LogistiCare');
	      /*var query = url.parse(req.url,true).query;
	      console.log("Query" + query);
        var ride2MD = query.Ride2MD;
        var logistiCare = query.LogistiCare;*/
        console.log(ride2MD);
        console.log(logistiCare);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                //conn.query("SELECT Ride2MD, LogistiCare FROM `vcode` WHERE CompanyCode = '" + compCode + "'", function(err, rows, fields) {
                conn.query("SELECT Ride2MD, LogistiCare FROM `broker_list` WHERE CompanyCode = '" + compCode + "'", function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
