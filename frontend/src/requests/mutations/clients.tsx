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

export function useDeleteClientMutation(session?: Session | null) {
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
    renderLoading: function render(deletedClient) {
      return (
        <ToastContent showSpinner>
          Removendo usuário: ${deletedClient.name}...
        </ToastContent>
      );
    },
    renderError: (deletedClient) =>
      `Falha ao inserir o cliente: ${deletedClient.name}`,
    renderSuccess: (deletedClient) =>
      `Cliente ${deletedClient.name} inserido com sucesso`,
  });
}
