import { FaTrash } from "react-icons/fa";
import type { Contact } from "../interfaces/contact.interface";

interface Props {
  contacts: Contact[];
  onDeleteClick: (id: number, name: string) => void;
}

export const ContactList = ({ contacts, onDeleteClick }: Props) => {
  return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      <li className="p-4 pb-2 text-sm font-semibold tracking-wide">
        Lista de Contactos
      </li>

      {contacts.map((contact) => (
        <li className="list-row" key={contact.id}>
          <div>
            <h3>{contact.name}</h3>
            <p className="text-xs font-medium opacity-60">
              Telefono: {contact.phone}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-square bg-red-500"
              aria-label="Eliminar Contacto"
              onClick={() => onDeleteClick(contact.id, contact.name)}
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
