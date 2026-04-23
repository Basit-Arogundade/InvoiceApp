import { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (inv) => {
    setInvoices(prev => [...prev, { ...inv, id: Date.now(), status: "Pending" }]);
  };

  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  const markPaid = (id) => {
    setInvoices(prev =>
      prev.map(i => i.id === id ? { ...i, status: "Paid" } : i)
    );
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice, markPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
};