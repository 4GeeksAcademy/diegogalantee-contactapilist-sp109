import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA = "contactos_diego";

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error al agregar contacto");

      const newContact = await res.json();
      dispatch({ type: "add_contact", payload: newContact });
      navigate("/");
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      alert("Hubo un problema al agregar el contacto.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="text"
          name="phone"
          placeholder="Enter phone"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="text"
          name="address"
          placeholder="Enter address"
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Save
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={() => navigate("/")}>
          or get back to contacts
        </button>
      </div>
    </div>
  );
};

export default AddContact;