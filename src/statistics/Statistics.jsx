import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { priceStringFormatter } from "../utils/priceStringFormatter";

export const Statistics = () => {
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    apiGet("/api/invoices/statistics").then((data) => setStatistics(data));
  }, []);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Cena za letošní rok</th>
          <th>Celková cena</th>
          <th>Počet faktur</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{priceStringFormatter(statistics?.currentYearSum)}</td>
          <td>{priceStringFormatter(statistics?.allTimeSum)}</td>
          <td>{statistics?.invoicesCount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export const StatisticsCompanies = () => {
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    apiGet("/api/persons/statistics").then((data) => setStatistics(data));
  }, []);
  return (
    <table className="table table-bordered">
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
            <td>{priceStringFormatter(statistic.revenue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
