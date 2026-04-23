import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

export default function Form() {
  const { addInvoice } = useContext(InvoiceContext);

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    amount: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.clientName) return setError("Name required");
    if (!form.email.includes("@")) return setError("Invalid email");
    if (form.amount <= 0) return setError("Invalid amount");

    addInvoice(form);
    setForm({ clientName: "", email: "", amount: "" });
    setError("");
  };

  return (
    <div className="form">
      <input
        placeholder="Name"
        value={form.clientName}
        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <button onClick={handleSubmit}>Create</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
