let csvToJson = require("convert-csv-to-json");

let fileInputName = "../data/heart.csv";
let fileOutputName = "../data/heart.json";
csvToJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
