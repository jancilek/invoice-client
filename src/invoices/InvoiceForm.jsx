import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import dateStringFormatter from "../utils/dateStringFormatter";
import InputSelect from "../components/InputSelect";

const InvoiceFrom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [persons, setPersons] = useState();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    seller: { _id: "" },
    buyer: { _id: "" },
    issued: "",
    dueDate: "",
    product: "",
    price: "",
    vat: 21,
    note: "",
  });

  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    apiGet("/api/persons").then((data) => setPersons(data));
  }, []);

  useEffect(() => {
    if (id) {
      apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    (id
      ? apiPut("/api/invoices/" + id, invoice)
      : apiPost("/api/invoices", invoice)
    )
      .then((data) => {
        setSent(true);
        setSuccess(true);
        navigate("/invoices");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSent(true);
        setSuccess(false);
      });
  };

  const sent = sentState;
  const success = successState;

  if (persons) {
    return (
      <div>
        <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
        <hr />
        {errorState ? (
          <div className="alert alert-danger">{errorState}</div>
        ) : null}
        {sent && (
          <FlashMessage
            theme={success ? "success" : ""}
            text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
          />
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            required={true}
            type={"number"}
            min={"3"}
            label={"Číslo faktury"}
            prompt={"Zadejte číslo faktury"}
            value={invoice.invoiceNumber}
            handleChange={(e) => {
              setInvoice({ ...invoice, invoiceNumber: e.target.value });
            }}
          />

          <InputSelect
            prompt={"Vyberte prodávajícího"}
            label={"Prodávající"}
            name={"seller"}
            value={invoice.seller._id}
            items={persons}
            handleChange={(e) => {
              setInvoice({
                ...invoice,
                seller: { ...invoice.seller, _id: e.target.value },
              });
            }}
          />

          <InputSelect
            prompt={"Vyberte Nakupujícího"}
            label={"Nakupující"}
            name={"buyer"}
            value={invoice.buyer._id}
            items={persons}
            handleChange={(e) => {
              setInvoice({
                ...invoice,
                buyer: { ...invoice.buyer, _id: e.target.value },
              });
            }}
          />

          <InputField
            required={true}
            type={"date"}
            min={"3"}
            label={"Datum vystavení"}
            prompt={"Zadejte datum vystavení"}
            value={dateStringFormatter(invoice.issued)}
            handleChange={(e) => {
              setInvoice({ ...invoice, issued: e.target.value });
            }}
          />
          <InputField
            required={true}
            type={"date"}
            min={"3"}
            label={"Datum splatnosti"}
            prompt={"Zadejte datum splatnosti"}
            value={dateStringFormatter(invoice.dueDate)}
            handleChange={(e) => {
              setInvoice({ ...invoice, dueDate: e.target.value });
            }}
          />
          <InputField
            required={true}
            type={"text"}
            min={"3"}
            label={"Produkt"}
            prompt={"Zadejte produkt"}
            value={invoice.product}
            handleChange={(e) => {
              setInvoice({ ...invoice, product: e.target.value });
            }}
          />
          <InputField
            required={true}
            type={"number"}
            min={"3"}
            label={"Cena"}
            prompt={"Zadejte cenu"}
            value={invoice.price}
            handleChange={(e) => {
              setInvoice({ ...invoice, price: e.target.value });
            }}
          />
          <InputField
            required={true}
            type={"number"}
            min={"3"}
            label={"Daň"}
            prompt={"Zadejte daň"}
            value={invoice.vat}
            handleChange={(e) => {
              setInvoice({ ...invoice, vat: e.target.value });
            }}
          />
          <InputField
            required={false}
            type={"text"}
            min={"3"}
            label={"Poznámka"}
            prompt={"Zadejte poanámku"}
            value={invoice.note}
            handleChange={(e) => {
              setInvoice({ ...invoice, note: e.target.value });
            }}
          />

          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Uložit"
          />
        </form>
      </div>
    );
  }
};

export default InvoiceFrom;
