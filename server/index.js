const express = require("express");
const salaryService = require("./salaryService.js");

const PORT = process.env.PORT || 3001;
const app = express();

// api call for getting all relevant data for the client code
app.get("/allSalaryData", async (req, res) => {
  try {
    salaryService.getAllSalaryData().then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log("Error in /salaries : " + error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
