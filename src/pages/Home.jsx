import React, { useEffect } from "react";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA = "contactos_diego";

const fallbackContacts = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@mail.com",
    phone: "123456789",
    address: "Calle Falsa 123"
  },
  {
    id: 2,
    name: "Ana Gómez",
    email: "ana@mail.com",
    phone: "987654321",
    address: "Av. Siempre Viva 456"
  }
];

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const createAgenda = async () => {
    try {
      const res = await fetch(`${API_BASE}/agendas/${AGENDA}`, {
        method: "POST"
      });
      if (!res.ok) throw new Error("No se pudo crear la agenda");
      console.log("✅ Agenda creada");
    } catch (err) {
      console.error("❌ Error creando la agenda:", err);
    }
  };

  const getContacts = async () => {
    try {
      let res = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`);
      if (res.status === 404) {
        console.warn("📭 Agenda no existe. Creando...");
        await createAgenda();
        res = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`);
      }

      if (!res.ok) throw new Error("Error al obtener contactos");

      const data = await res.json();
      const normalized = (data.contacts || []).map(c => ({
        ...c,
        name: c.name || c.full_name
      }));
      dispatch({ type: "set_contacts", payload: normalized });
    } catch (err) {
      console.error("🚨 Error de red, usando fallback:", err);
      dispatch({ type: "set_contacts", payload: fallbackContacts });
    }
  };

  const handleDeleteAll = async () => {
    for (const c of store.contacts) {
      await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${c.id}`, {
        method: "DELETE"
      });
    }
    dispatch({ type: "set_contacts", payload: [] });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Contactos</h1>
      </div>

      {store.contacts.length === 0 ? (
        <p>No hay contactos. Usa el botón de arriba para agregar uno.</p>
      ) : (
        <>
          {store.contacts.map(c => (
            <ContactCard key={c.id} contact={c} refresh={getContacts} />
          ))}
          <button className="btn btn-danger mt-3" onClick={handleDeleteAll}>
            Eliminar todos
          </button>
        </>
      )}
    </div>
  );
};

export default Home;