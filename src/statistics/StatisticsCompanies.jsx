import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const StatisticsCompanies = () => {
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    apiGet("/api/persons/statistics").then((data) => setStatistics(data));
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Společnost</th>
          <th>Obrat</th>
        </tr>
      </thead>
      <tbody>
        {statistics?.map((statistic) => (
          <tr key={statistic.personId}>
            <td>{statistic.personName}</td>
            <td>{statistic.revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsCompanies;
