import { useState } from "react";
import InputField from "../components/InputField";
import { apiGet } from "../utils/api";
import InputSelect from "../components/InputSelect";

const InvoiceFilter = ({ invoices, persons }) => {
  const [invoiceFilter, setInvoiceFilter] = useState({
    sellerId: "",
    buyerId: "",
    minPrice: "",
    maxPrice: "",
    product: "",
    limit: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const invoiceFilterReducer = Object.entries(invoiceFilter)
      .filter(([key, value]) => value !== "") // Exclude empty values
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    apiGet("/api/invoices", invoiceFilterReducer).then((data) =>
      invoices(data)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6">
          <InputSelect
            prompt={"Vyberte prodávajícího"}
            label={"Prodávající"}
            name={"seller"}
            value={invoiceFilter.sellerId}
            items={persons}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, sellerId: e.target.value });
            }}
          />
        </div>
        <div className="col-sm-6">
          <InputSelect
            prompt={"Vyberte nakupujícího"}
            label={"Nakupující"}
            name={"buyer"}
            value={invoiceFilter.buyerId}
            items={persons}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, buyerId: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <InputField
            type="number"
            label={"Cena od"}
            prompt={"neuvedeno"}
            value={invoiceFilter.minPrice}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, minPrice: e.target.value });
            }}
          />
        </div>
        <div className="col-sm-3">
          <InputField
            type="number"
            label={"Cena do"}
            prompt={"neuvedeno"}
            value={invoiceFilter.maxPrice}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, maxPrice: e.target.value });
            }}
          />
        </div>
        <div className="col-sm-3">
          <InputField
            type="text"
            label={"Produkt"}
            prompt={"neuvedeno"}
            value={invoiceFilter.product}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, product: e.target.value });
            }}
          />
        </div>
        <div className="col-sm-3">
          <InputField
            type="number"
            label={"Limit počtu faktur"}
            prompt={"neuvedeno"}
            value={invoiceFilter.limit}
            handleChange={(e) => {
              setInvoiceFilter({ ...invoiceFilter, limit: e.target.value });
            }}
          />
        </div>
      </div>
      <input
        type="submit"
        className="btn btn-primary mt-3"
        value={"Filtrovat faktury"}
      />
    </form>
  );
};

export default InvoiceFilter;
