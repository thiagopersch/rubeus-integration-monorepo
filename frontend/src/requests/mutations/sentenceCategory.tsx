import { RefObject, useCallback } from "react";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import ToastContent from "@/components/ToastContent";
import { ModalRef } from "@/components/Modal";

import {
  SentenceCategory,
  SentenceCategoryForm,
} from "@/models/sentenceCategory";

import { initializeApi, useMutation } from "@/services/api";

export function useAddSentenceCategoryMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addSentenceCategory = useCallback(
    async (values: SentenceCategoryForm) => {
      const api = initializeApi(session);

      const { id, ...requestData } = values;

      return id
        ? api.put(`/sentence-category/${id}`, requestData)
        : api.post("/sentence-category", requestData);
    },
    [session],
  );

  return useMutation("add-sentence-category", addSentenceCategory, {
    linkedQueries: {
      "get-sentence-category": (old, newSentenceCategory) => [
        ...old,
        { ...newSentenceCategory, id: uuidv4(), disabled: true },
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

export function useDeleteSentenceCategoryMutation(
  // modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const deleteSentenceCategory = useCallback(
    async (sentenceCategory: any) => {
      const api = initializeApi(session);

      return api.delete(`/sentence-category/${sentenceCategory.id}`);
    },
    [session],
  );

  return useMutation("delete-sentence-category", deleteSentenceCategory, {
    linkedQueries: {
      "get-sentence-category": (
        old: SentenceCategory[],
        deletedSentenceCategory: SentenceCategory,
      ) =>
        old.map((sentenceCategory) =>
          sentenceCategory.id === deletedSentenceCategory.id
            ? { ...sentenceCategory, disabled: true }
            : sentenceCategory,
        ),
    },
    // onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(deletedSentenceCategory) {
      return (
        <ToastContent showSpinner>
          Removendo a categoria: ${deletedSentenceCategory.name}...
        </ToastContent>
      );
    },
    renderError: () => `Falha ao remover o registro`,
    renderSuccess: () => `Deletado com sucesso...`,
  });
}
