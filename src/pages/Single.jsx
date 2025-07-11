
import React from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Single = () => {
  const { store } = useGlobalReducer();
  const { theId } = useParams();

  const singleContact = store.contacts.find(c => c.id === parseInt(theId));

  if (!singleContact) return <p>Contacto no encontrado</p>;

  return (
    <div className="container text-center">
      <h1 className="display-4">Contacto: {singleContact.full_name}</h1>
      <img src={rigoImageUrl} alt="Profile" className="img-thumbnail my-3" style={{ width: "200px" }} />
      <p><strong>Email:</strong> {singleContact.email}</p>
      <p><strong>Teléfono:</strong> {singleContact.phone}</p>
      <p><strong>Dirección:</strong> {singleContact.address}</p>
      <Link to="/">
        <span className="btn btn-primary btn-lg mt-3" role="button">
          Volver al inicio
        </span>
      </Link>
    </div>
  );
};