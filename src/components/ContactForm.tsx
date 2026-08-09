import { FaPhoneAlt, FaUser } from "react-icons/fa";

export const ContactForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Agregar Contacto</h2>

      {/* Nombre */}
      <label className="input w-full">
        <span className="label">
          <FaUser /> Nombre
        </span>
        <input type="text" placeholder="Tu Nombre" />
      </label>

      {/* Telefono */}
      <label className="input w-full">
        <span className="label">
          <FaPhoneAlt /> Teléfono
        </span>
        <input type="tel" placeholder="Tu Teléfono" />
      </label>

      <button type="submit" className="btn">
        Agregar
      </button>
    </form>
  );
};
