var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs");

var banksJSON = require("../settings.json");
var banks = banksJSON["0"]["Banks"];

var i;

var primaryData = [];

for (i = 0; i < banks.length; i++) {
  console.log(i);
  var data = [];

  //let postData = {};
  var targetURL = banks[i]["URL"] + "open-banking/v2.2/atms";
  console.log(targetURL);

  var reqVal = new XMLHttpRequest();
  
  reqVal.open("GET", targetURL, true);
  reqVal.BrandName = banks[i]["BrandName"];

  console.log(reqVal.BrandName);

  reqVal.setRequestHeader("Content-Type", "application/json");
  reqVal.setRequestHeader("Content-Type", "application/prs.openbanking.opendata.v2.2");

  //reqVal.send(JSON.stringify(postData));
  reqVal.send();
  
  reqVal.onload = function () {
    let data = JSON.parse(this.responseText);

    fs.writeFile("ATMListings/" + this.BrandName + ".json", "[" + JSON.stringify(data.data["0"]["Brand"]["0"]) + "]", function(err) {
      if (err) {
        console.log(err);
      }
    });
    
    console.log(data);
  };
};
