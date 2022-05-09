const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

fs.createReadStream(path.resolve(__dirname, "assets", "data.csv"), {
  start: 0,
  end: 100000,
})
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => console.log(row))
  .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
