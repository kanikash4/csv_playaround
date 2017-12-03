'use strict';

var fs = require('fs');

fs.readFile('./CSV_upload.csv', function (err, data) {
  if (err) throw err;
  var csvData = data.toString();
  console.log(csvData);
  /**
   * Replace all instances of
   * ", ==> $ (end of string field)
   * ," ==> # (start of string field)
   */
  csvData = csvData.replace(/",/g, "$");
  csvData = csvData.replace(/,"/g, "#");
  // console.log(csvData);
  console.log();
  console.log();
  var result = "", i = 0, start = 0;
  while (i < csvData.length) {
    // Caught start of a string field
    if (csvData.charAt(i) == "#" && start == 0) {
      result = result + "\n";
      start = 1;
      // Caught end of a string field
    } else if (csvData.charAt(i) == "#" && start == 1) {
      // Caught end of a string field
    } else if (csvData.charAt(i) == "$" && start == 1) {
      result = result + "\n";
      start = 0;
      if ((i + 1) < csvData.length && csvData.charAt(i + 1) == "\"") {
        start = 1;
      }
      // Caught end of a string field which did not have start point
    } else if (csvData.charAt(i) == "$" && start == 0) {
      result = result + "\"\n";
      // Caught comma
    } else if (csvData.charAt(i) == "," && start == 0) {
      result = result + "\n";
    } else {
      result = result + csvData.charAt(i);
    }
    i = i + 1;
  }
  console.log(result);
  process.exit(0);
});