import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markPaid } = useContext(InvoiceContext);

  const invoice = invoices.find(i => i.id == id);

  if (!invoice) return <p>Not found</p>;

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <div className="detail">
      <h2>{invoice.clientName}</h2>
      <p>{invoice.email}</p>
      <p>{invoice.amount}</p>
      <p>Status: {invoice.status}</p>
<br />
      <button className="button" onClick={() => markPaid(invoice.id)}>Mark Paid</button>

      <button className="button" onClick={() => {
        if (confirm("Delete?")) {
          deleteInvoice(invoice.id);
          navigate("/");
        }
      }}>
        Delete
      </button>
    </div>
    </div>
  );
}