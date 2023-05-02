import { RefObject, useCallback } from "react";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import ToastContent from "@/components/ToastContent";
import { ModalRef } from "@/components/Modal";

import { Sentence, SentenceForm } from "@/models/sentence";

import { initializeApi, useMutation } from "@/services/api";

export function useAddSentenceMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const addSentence = useCallback(
    async (values: SentenceForm) => {
      const api = initializeApi(session);

      const { id, ...requestData } = values;

      return id
        ? api.put(`/sentence/${id}`, requestData)
        : api.post("/sentence", requestData);
    },
    [session],
  );

  return useMutation("add-sentence", addSentence, {
    linkedQueries: {
      "get-sentence": (old, newSentence) => [
        ...(Array.isArray(old) ? old : []),
        { ...newSentence, id: uuidv4(), disabled: true },
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

export function useDeleteSentenceMutation(
  // modalRef: RefObject<ModalRef>,
  session?: Session | null,
) {
  const deleteSentence = useCallback(
    async (sentence: any) => {
      const api = initializeApi(session);

      return api.delete(`/sentence/${sentence.id}`);
    },
    [session],
  );

  return useMutation("delete-sentence", deleteSentence, {
    linkedQueries: {
      "get-sentence": (old: Sentence[], deletedSentence: Sentence) =>
        old.map((sentence) =>
          sentence.id === deletedSentence.id
            ? { ...sentence, disabled: true }
            : sentence,
        ),
    },
    // onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(deletedSentence) {
      return (
        <ToastContent showSpinner>
          Removendo a categoria: ${deletedSentence.name}...
        </ToastContent>
      );
    },
    renderError: () => `Falha ao remover o registro`,
    renderSuccess: () => `Deletado com sucesso...`,
  });
}
