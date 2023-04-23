import { RefObject, useCallback } from "react";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import ToastContent from "@/components/ToastContent";
import { ModalRef } from "@/components/Modal";

import { Tbc, TbcForm } from "@/models/tbc";

import { initializeApi, useMutation } from "@/services/api";

export function useAddTbcMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addTbc = useCallback(
    async (values: TbcForm) => {
      const api = initializeApi(session);

      const { id, ...resquestData } = values;

      return id
        ? api.put(`/tbc/${id}`, resquestData)
        : api.post("/tbc", resquestData);
    },
    [session],
  );

  return useMutation("add-tbc", addTbc, {
    linkedQueries: {
      "get-tbc": (old, newTbc) => [
        ...old,
        { ...newTbc, id: uuidv4(), disabled: true },
      ],
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render() {
      return (
        <ToastContent showSpinner>Salvando as informações...</ToastContent>
      );
    },
    renderError: () => `Falha ao registrar alterações!`,
    renderSuccess: () => `Alterações registradas com sucesso!`,
  });
}

export function useDeleteTbcMutation(
  /* modalRef: RefObject<ModalRef>, */
  session?: Session | null,
) {
  const deleteTbc = useCallback(
    async (tbc: any) => {
      const api = initializeApi(session);

      return api.delete(`/tbc/${tbc.id}`);
    },
    [session],
  );

  return useMutation("delete-client", deleteTbc, {
    linkedQueries: {
      "get-tbc": (old: Tbc[], deletedTbc: Tbc) =>
        old.map((tbc) =>
          tbc.id === deletedTbc.id ? { ...tbc, disabled: true } : tbc,
        ),
    },
    // onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(deletedTbc) {
      return (
        <ToastContent showSpinner>
          Removendo o registro ${deletedTbc.name}...
        </ToastContent>
      );
    },
    renderError: () => `Falha ao remover o registro!`,
    renderSuccess: () => `Deletado com sucesso...`,
  });
}
