import { FaPhoneAlt, FaUser } from "react-icons/fa";

interface Props {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const ContactForm = ({ onSubmit }: Props) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold">Agregar Contacto</h2>

      {/* Nombre */}
      <label className="input w-full">
        <span className="label">
          <FaUser /> Nombre
        </span>
        <input type="text" placeholder="Tu Nombre" name="name" />
      </label>

      {/* Telefono */}
      <label className="input w-full">
        <span className="label">
          <FaPhoneAlt /> Teléfono
        </span>
        <input type="tel" placeholder="Tu Teléfono" name="phone" />
      </label>

      <button type="submit" className="btn">
        Agregar
      </button>
    </form>
  );
};
