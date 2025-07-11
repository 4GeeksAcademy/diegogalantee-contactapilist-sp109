import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<div className="container">
			<h2>Demo Page</h2>
			<ul className="list-group">
				{store.contacts?.map((contact) => (
					<li
						key={contact.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<Link to={`/single/${contact.id}`}>Link to: {contact.full_name}</Link>
						<button
							className="btn btn-danger"
							onClick={() => actions.deleteContact(contact.id)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
			<Link to="/">
				<button className="btn btn-primary mt-3">Back home</button>
			</Link>
		</div>
	);
};