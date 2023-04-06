import { Session } from "next-auth";
import { RefObject, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { ModalRef } from "@/components/Modal";

import { initializeApi, useMutation } from "@/services/api";

import ToastContent from "@/components/ToastContent";

export function useAddTbcMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addTbc = useCallback(
    async (values: any) => {
      const api = initializeApi(session);
      return api.post("/tbc", values);
    },
    [session],
  );

  return useMutation("add-Tbc", addTbc, {
    linkedQueries: {
      "get-tbc": (old, newTbc) => [
        ...old,
        { ...newTbc, id: uuidv4(), disabled: true },
      ],
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(newTbc) {
      return (
        <ToastContent showSpinner>Salvando o Tbc {newTbc.name}...</ToastContent>
      );
    },
    renderError: (newTbc) => `Falha ao inserir Tbc ${newTbc.name}`,
    renderSuccess: (newTbc) => `Tbc ${newTbc.name} inserido com sucesso!`,
  });
}
