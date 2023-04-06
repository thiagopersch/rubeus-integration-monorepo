import { Session } from "next-auth";
import { RefObject, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalRef } from "@/components/Modal";

import { initializeApi, useMutation } from "@/services/api";

import ToastContent from "@/components/ToastContent";

export function useAddClientMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addClient = useCallback(
    async (values: any) => {
      const api = initializeApi(session);
      return api.post("/clients", values);
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
