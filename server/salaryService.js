const cheerio = require("cheerio");
const axios = require("axios");

class SalaryService {

  // function for cleaning up malformed and corrupted salary data
  handleSalaryData(salary) {
    const newSalaryString = salary.replace(/[$,]/g, "");
    return parseInt(newSalaryString) ? newSalaryString : null;
  }

  async getAllSalaryData() {

    // web scraper for pulling all player/salary data from the provided URL
    // resource used: https://oxylabs.io/blog/javascript-web-scraping

    const url = "https://questionnaire-148920.appspot.com/swe/data.html";
    const salary_data = [];

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $("#salaries-table > tbody > tr").each((index, element) => {
        const playerInfo = {
          name: $($(element).find("td.player-name")[0]).text(),
          salary: this.handleSalaryData(
            $($(element).find("td.player-salary")[0]).text()
          ),
          id: index,
        };

        salary_data.push(playerInfo);
      });
    } catch (err) {
      console.log("Error: " + err);
    }

    const duplicatedList = [...salary_data];

    // sorting the salary data from biggest to smallest salary
    const sortedSalaryList = duplicatedList.sort((a, b) => b.salary - a.salary);

    // taking only the top 125 salaries in the list
    const topSortedList = sortedSalaryList.slice(0, 125);

    // getting average of the top 125 salary list
    const topAverage = topSortedList.reduce((a, b) => {
      return a + b.salary / 125;
    }, 0);
    
    // data object that returns the list of all salaries, list of top 125 salaries and the average salary
    // all three need to be referenced seperately by the client code but getting these values from seperate API calls would give inconsistent data, as the web page data changes on load

    return {
      allSalaries: salary_data,
      topSalaries: topSortedList,
      averageSalary: topAverage
    }
  }
}

module.exports = new SalaryService();
