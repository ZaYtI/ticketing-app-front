import type { FormKitProps } from "../interface/FormKitProps";

export const addTicketField = ref<FormKitProps[][]>([
  [
    {
      type: "text",
      name: "title",
      placeholder: "Entrez le titre du ticket",
      validation: "required",
      validationMessages: {
        required: "Le titre est requis",
      },
    },
  ],
  [
    {
      type: "select",
      name: "status",
      options: {
        1: "Ouvert",
        2: "En Attente",
        3: "Résolue",
        4: "Fermé",
      },
      validation: "required",
      validationMessages: {
        required: "Le statut est requis",
      },
    },
    {
      type: "select",
      name: "priority",
      options: {
        1: "Faible",
        2: "Moyenne",
        3: "Important",
      },
      validation: "required",
      validationMessages: {
        required: "La priorité est requise",
      },
    },
  ],
  [
    {
      type: "textarea",
      name: "description",
      placeholder: "Décrivez le problème",
      validation: "required",
      validationMessages: {
        required: "La description est requise",
      },
    },
  ],
  [
    {
      type: "datetime-local",
      label: "Date limite",
      name: "dead_line",
      validation: "date_after",
      validationMessages: {
        date_after: "La date doit être après la date actuelle.",
      },
      default: null,
    },
  ],
]);
