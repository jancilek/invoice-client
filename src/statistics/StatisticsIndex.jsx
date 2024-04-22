import { Statistics, StatisticsCompanies } from "./Statistics";

const StatisticsIndex = () => {
  return (
    <div>
      <h1>Celkové statistiky</h1>
      <hr />
      <Statistics />
      <br />
      <h1>Statistiky podle subjektu </h1>
      <hr />
      <StatisticsCompanies />
    </div>
  );
};

export default StatisticsIndex;
