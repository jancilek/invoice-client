import React from "react";
import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import { priceStringFormatter } from "../utils/priceStringFormatter";

const InvoiceTable = ({ items, deleteItem }) => {
  return (
    <div>
      <p>Seznam faktur: {items.length}</p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Číslo faktury</th>
            <th>Vystavovatel</th>
            <th>Příjemce</th>
            <th>Datum vystavení</th>
            <th>Datum splatnosti</th>
            <th>Cena</th>
            <th colSpan={3}>Akce</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/invoices/show/${item._id}`}>
                  {item.invoiceNumber}
                </Link>
              </td>
              <td>
                <Link to={`/persons/show/${item._id}`}>{item.seller.name}</Link>
              </td>
              <td>
                <Link to={`/persons/show/${item._id}`}>{item.buyer.name}</Link>
              </td>
              <td>{dateStringFormatter(item.issued, true)}</td>
              <td>{dateStringFormatter(item.dueDate, true)}</td>
              <td>{priceStringFormatter(item.price)}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={`/invoices/show/${item._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Zobrazit
                  </Link>
                  <Link
                    to={`/invoices/edit/${item._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Upravit
                  </Link>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Odstranit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/invoices/create`} className="btn btn-success">
        Nová faktura
      </Link>
    </div>
  );
};

export default InvoiceTable;
