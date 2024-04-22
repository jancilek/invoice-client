import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoicesTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
  const [invoices, setInvoices] = useState([]);
  const [persons, setPersons] = useState();

  const handleDataFromFilter = (data) => {
    setInvoices(data);
  };

  const deleteInvoice = async (id) => {
    try {
      await apiDelete("/api/invoices/" + id);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    setInvoices((prevInvoice) => prevInvoice.filter((item) => item._id !== id));
  };

  useEffect(() => {
    apiGet("/api/persons").then((data) => setPersons(data));
  }, []);

  useEffect(() => {
    apiGet("/api/invoices").then((data) => setInvoices(data));
  }, []);
  if (persons) {
    return (
      <div>
        <h1>Seznam faktur</h1>
        <hr />
        <InvoiceFilter invoices={handleDataFromFilter} persons={persons} />
        <hr />
        <InvoiceTable items={invoices} deleteItem={deleteInvoice} />
      </div>
    );
  }
};
export default InvoiceIndex;
