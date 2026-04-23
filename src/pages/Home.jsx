import { useEffect } from "react";
import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { Link } from "react-router-dom";
import Form from "../components/Form";




export default function Home() {
  const { invoices } = useContext(InvoiceContext);
  const [filter, setFilter] = useState("All");

  const filtered = invoices.filter(i =>
    filter === "All" ? true : i.status === filter
  );

  const toggleTheme = () => {
    const current = document.body.className;
    const newTheme = current === "light" ? "dark" : "light";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.body.className = saved;
  }, []);

  return (
    <div className="container">
  <div className="header">
    <h1>Invoices</h1>

    <select onChange={(e) => setFilter(e.target.value)}>
  <option>All</option>
  <option>Draft</option>
  <option>Pending</option>
  <option>Paid</option>
</select>

    <div>
      <button onClick={toggleTheme}>Theme</button>
      <filter setFilter={setFilter} />
    </div>
  </div>

  <Form />

  {filtered.map(inv => (
    <div className="invoice-card" key={inv.id}>
      <Link to={`/invoice/${inv.id}`}>
        {inv.clientName}
      </Link>

      <span className={`status ${inv.status.toLowerCase()}`}>
        {inv.status}
      </span>
    </div>
  ))}
</div>
    
  );
}



