import { IonButton, IonIcon, IonItem, IonList } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useContactList } from "../hooks/contacts/useContactList";
import type { Contact } from "../interfaces/contact.interface";

interface Props {
  contacts: Contact[];
}

const ContactList = ({ contacts }: Props) => {
  const { onDeleteContact } = useContactList();

  return (
    <IonList className="bg-base-300 rounded-md shadow-md">
      <IonItem className="pb-2 text-sm font-semibold tracking-wide">
        Lista de Contactos
      </IonItem>

      {contacts.map((contact) => (
        <IonItem key={contact.id}>
          <div className="flex w-full items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>

              <p className="pb-4 text-xs font-medium opacity-60">
                Teléfono: {contact.phone}
              </p>
            </div>

            <IonButton
              shape="round"
              color="danger"
              onClick={() => onDeleteContact(contact.id, contact.name)}
            >
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </div>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ContactList;
