import React from "react";

const DeleteAllContacts = ({ onDeleteAll }) => {
	return (
		<div className="text-center mb-4">
			<button className="btn btn-danger" onClick={onDeleteAll}>
				Eliminar todos los contactos
			</button>
		</div>
	);
};

export default DeleteAllContacts;
