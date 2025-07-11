import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA = "contactos_diego";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`);
        const data = await res.json();
        const contact = data.contacts.find(c => c.id.toString() === id);

        if (contact) {
          setFormData({
            name: contact.name || contact.full_name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            address: contact.address || ""
          });
        } else {
          throw new Error("Contacto no encontrado");
        }
      } catch (err) {
        console.error("Error cargando contacto:", err);
        alert("No se pudo cargar el contacto");
        navigate("/");
      }
    };

    fetchContact();
  }, [id, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error actualizando contacto");

      navigate("/");
    } catch (err) {
      console.error("Error al actualizar contacto:", err);
      alert("No se pudo actualizar el contacto.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input className="form-control my-2" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="form-control my-2" type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <input className="form-control my-2" type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required />
        
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-primary" type="submit">Guardar Cambios</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate("/")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;