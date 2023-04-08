import { Session } from "next-auth";
import { RefObject, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalRef } from "@/components/Modal";
import ToastContent from "@/components/ToastContent";

import { ClientForm } from "@/models/client";

import { initializeApi, useMutation } from "@/services/api";

export function useAddClientMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addClient = useCallback(
    async (values: ClientForm) => {
      const api = initializeApi(session);

      const { id, ...requestData } = values;

      return id
        ? api.put(`/clients/${id}`, requestData)
        : api.post("/clients", requestData);
    },
    [session],
  );

  return useMutation("add-client", addClient, {
    linkedQueries: {
      "get-client": (old, newClient) => [
        ...old,
        { ...newClient, id: uuidv4(), disabled: true },
      ],
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(newClient) {
      return (
        <ToastContent showSpinner>
          Salvando o cliente {newClient.name}...
        </ToastContent>
      );
    },
    renderError: (newClient) => `Falha ao inserir cliente ${newClient.name}`,
    renderSuccess: (newClient) =>
      `Cliente ${newClient.name} inserido com sucesso!`,
  });
}
