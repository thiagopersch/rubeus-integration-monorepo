import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Edit, X } from "@styled-icons/feather";

import Badge from "../Badge";
import Table from "../Table";
import TableColumn from "../TableColumn";
import AddSentenceCategoryModal, {
  SentenceCategoryModalRef,
} from "../AddSentenceCategoryModal";

import {
  FormattedSentenceCategory,
  SentenceCategory,
} from "@/models/sentenceCategory";

import { listSentenceCategory } from "@/requests/queries/sentenceCategory";
import { useDeleteSentenceCategoryMutation } from "@/requests/mutations/sentenceCategory";

import * as S from "./styles";

const SentenceCategoryTable = () => {
  const { data: session } = useSession();

  const { data: setenceCategory, refetch } = useQuery<
    FormattedSentenceCategory[]
  >("get-sentence-category", () => listSentenceCategory(session));

  const addSentenceModal = useRef<SentenceCategoryModalRef>(null);

  const mutation = useDeleteSentenceCategoryMutation(session);
  const handleDeleteSentenceCategory = async (
    sentenceCategory: SentenceCategory,
  ) => {
    const confirm = window.confirm(
      `Deseja excluir a categoria: ${sentenceCategory.name}?`,
    );
    if (confirm) {
      await mutation.mutateAsync(sentenceCategory);
      refetch();
    }
  };

  return (
    <S.Wrapper>
      <Table items={setenceCategory || []} keyExtractor={(item) => item.id}>
        <TableColumn label="Nome" tableKey="name" actionColumn />
        <TableColumn
          label="Descrição"
          tableKey="description"
          ellipsis
          actionColumn
        />
        <TableColumn
          label="Status"
          tableKey="status"
          actionColumn
          render={(sentenceCategory: SentenceCategory) =>
            sentenceCategory.status ? (
              <Badge styledType="success">Ativado</Badge>
            ) : (
              <Badge styledType="danger">Desativado</Badge>
            )
          }
        />
        <TableColumn
          label="Última atualização"
          tableKey="formattedUpdatedAt"
          actionColumn
        />
        <TableColumn
          label="Ações"
          tableKey="actions"
          contentAlign="center"
          actionColumn
          render={(sentenceCategory) => (
            <S.ActionButtons>
              <S.ActionEditButton
                type="button"
                title={`Alterar a categoria ${sentenceCategory.name}`}
                onClick={() =>
                  addSentenceModal.current?.openModal(sentenceCategory)
                }
              >
                <Edit title={`Alterar a categoria ${sentenceCategory.name}`} />
              </S.ActionEditButton>

              <S.ActionDeleteButton
                type="button"
                title={`Excluir a categoria ${sentenceCategory.name}`}
                onClick={() => handleDeleteSentenceCategory(sentenceCategory)}
              >
                <X />
              </S.ActionDeleteButton>
            </S.ActionButtons>
          )}
        />
      </Table>
      <AddSentenceCategoryModal refetchFn={refetch} ref={addSentenceModal} />
    </S.Wrapper>
  );
};

export default SentenceCategoryTable;
