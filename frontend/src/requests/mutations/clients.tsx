import { RefObject, useCallback } from "react";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import ToastContent from "@/components/ToastContent";
import { ModalRef } from "@/components/Modal";

import { initializeApi, useMutation } from "@/services/api";

import { Client, ClientForm } from "@/models/client";

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
      "get-clients": (old, newClient) => [
        ...old,
        { ...newClient, id: uuidv4(), disabled: true },
      ],
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render() {
      return (
        <ToastContent showSpinner>Salvando as informações...</ToastContent>
      );
    },
    renderError: () => `Alterações falharam`,
    renderSuccess: () => `Adicionado com sucesso!`,
  });
}

export function useDeleteClientMutation(
  // modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const deleteClient = useCallback(
    async (client: any) => {
      const api = initializeApi(session);

      return api.delete(`/clients/${client.id}`);
    },
    [session],
  );

  return useMutation("delete-client", deleteClient, {
    linkedQueries: {
      "get-clients": (old: Client[], deletedClient: Client) =>
        old.map((client) =>
          client.id === deletedClient.id
            ? { ...client, disabled: true }
            : client,
        ),
    },
    // onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(deletedClient) {
      return (
        <ToastContent showSpinner>
          Removendo o cliente: ${deletedClient.name}...
        </ToastContent>
      );
    },
    renderError: () => `Falha ao inserir o cliente!`,
    renderSuccess: () => `Deletado com sucesso...`,
  });
}
