import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import dateStringFormatter from "../utils/dateStringFormatter";
import { priceStringFormatter } from "../utils/priceStringFormatter";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGet("/api/invoices/" + id).then((data) => {
      setInvoice(data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <h1>Detail faktury</h1>
      <hr />
      {!isLoading && <RenderInvoiceDetail invoice={invoice} />}
    </>
  );
};

const RenderInvoiceDetail = ({ invoice }) => {
  return (
    <>
      <div>
        <h3>{invoice.invoiceNumber}</h3>
        <p>
          <strong>Vystavovatel:</strong>
          <br />
          <Link to={`/persons/show/${invoice.seller._id}`}>
            {invoice.seller.name} ({invoice.seller.identificationNumber})
          </Link>
        </p>
        <p>
          <strong>Příjemce:</strong>
          <br />
          <Link to={`/persons/show/${invoice.buyer._id}`}>
            {invoice.buyer.name} ({invoice.buyer.identificationNumber})
          </Link>
        </p>
        <p>
          <strong>Datum vystavení:</strong>
          <br />
          {dateStringFormatter(invoice.issued, true)}
        </p>
        <p>
          <strong>Datum splatnosti:</strong>
          <br />
          {dateStringFormatter(invoice.dueDate, true)}
        </p>
        <p>
          <strong>Cena:</strong>
          <br />
          {priceStringFormatter(invoice.price)}
        </p>
        <p>
          <strong>DPH:</strong>
          <br />
          {invoice.vat}%
        </p>
        <p>
          <strong>Produkt:</strong>
          <br />
          {invoice.product}
        </p>
        <p>
          <strong>Poznámka:</strong>
          <br />
          {invoice.note}
        </p>
      </div>
    </>
  );
};

export default InvoiceDetail;
