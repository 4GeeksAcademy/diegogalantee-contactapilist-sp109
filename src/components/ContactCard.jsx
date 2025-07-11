import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, refresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await fetch(`https://playground.4geeks.com/contact/agendas/contactos_diego/contacts/${contact.id}`, {
      method: "DELETE"
    });
    refresh();
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="avatar"
          className="rounded-circle me-4"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h5 className="mb-1 fw-bold">{contact.full_name || contact.name}</h5>
          <p className="mb-1">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>
          <p className="mb-1">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>
          <p className="mb-0">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>
        <div className="ms-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate(`/edit/${contact.id}`)}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;