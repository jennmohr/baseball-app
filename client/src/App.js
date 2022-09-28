import React from "react";
import { NumericFormat } from "react-number-format";
import "./styles/App.css";
import SalariesTable from "./salariesTable";

function App() {
  const [salaryData, setSalaryData] = React.useState(null);
  const [selectedData, setSelectedData] = React.useState(null);
  const [allDataLoaded, setAllDataLoaded] = React.useState(false);

  React.useEffect(() => {
    // api call for getting top 125 salaries, all salaries & the average for the top 125
    
    fetch("/allSalaryData") 
      .then((res) => res.json())
      .then((data) => {setSalaryData(data); setTimeout(function() {setAllDataLoaded(true)}, 1000)}); // 1 second timeout for clean load and data update
  }, []);

  const getSelectedData = () => {
    switch(selectedData){
      case "TopSalaries" :
        return salaryData && salaryData.topSalaries && <SalariesTable list={salaryData.topSalaries} size={125}/>
      case "AllSalaries" :
        return salaryData && salaryData.allSalaries && <SalariesTable list={salaryData.allSalaries} size={125}/>
      default: return
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="baseballAppHeader">
            <img className="headerImage" src={"https://cdn-icons-png.flaticon.com/512/2279/2279419.png"}/>
            Baseball App <span className="subtitle">by Jenn Mohr</span>
        </div>
        <div className="salaryContainer">
          <div className="salaryTitle">Free Agent Qualifying Offer</div>
          <div className="salaryDescription">As a departing free agent from our organization, you will be offered a one-year contract whose monetary value is the average of the 125 highest salaries from the past season <b>(2016)</b>. You are free to reject the offer and sign with any other team, but your new team will have to forfeit a draft pick. The qualifying offer is as follows:</div>
          <div className="salaryValue">
            {allDataLoaded && salaryData && salaryData.averageSalary
            ? <NumericFormat
                  value={Math.round(salaryData.averageSalary)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                /> : "Loading..."
                }
          </div>
          <div className="salaryDescription">In order to better understand how our organization calculated this number, feel free to utilize the following resources: </div>
          <div className="buttonGroup">
            <button className="dataViewButton" onClick={() => setSelectedData("TopSalaries")}>View Top 125 Salaries</button>
            <button className="dataViewButton" onClick={() => setSelectedData("AllSalaries")}>View All Salaries</button>
          </div>
          <div className="selectedDataView">
            {selectedData ? getSelectedData() : <></>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
