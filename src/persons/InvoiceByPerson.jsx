import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import { priceStringFormatter } from "../utils/priceStringFormatter";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoceByPerson = ({ transaction, identificationNumber }) => {
  const [invoices, setInvoices] = useState();
  const talbeLabels =
    transaction == "sales"
      ? { headline: "Vystavené", colLabel: "Odběratel" }
      : { headline: "Přijaté", colLabel: "Dodavatel" };

  useEffect(() => {
    apiGet(`/api/identification/${identificationNumber}/${transaction}`).then(
      (data) => setInvoices(data)
    );
  }, [identificationNumber]);

  return (
    <>
      <h2>{talbeLabels.headline} faktury</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Číslo faktury</th>
            <th>{talbeLabels.colLabel}</th>
            <th>Datum vystavění</th>
            <th>Datrum splatnosti</th>
            <th>Částka</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr key={invoice._id}>
              <td>
                <Link to={`/invoices/show/${invoice._id}`}>
                  {invoice.invoiceNumber}
                </Link>
              </td>
              {transaction == "salles" ? (
                <td>
                  <Link to={`/persons/show/  ${invoice.buyer._id}`}>
                    {invoice.buyer.name}
                  </Link>
                </td>
              ) : (
                <td>
                  <Link to={`/persons/show/  ${invoice.seller._id}`}>
                    {invoice.seller.name}
                  </Link>
                </td>
              )}

              <td>{dateStringFormatter(invoice.issued, true)}</td>
              <td>{dateStringFormatter(invoice.dueDate, true)}</td>
              <td>{priceStringFormatter(invoice.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default InvoceByPerson;
