import { useRef } from "react";
import { useListSentence } from "@/requests/queries/sentence";
import { useSession } from "next-auth/react";
import { Edit, X } from "@styled-icons/feather";

import { Sentence } from "@/models/sentence";
import AddSentenceModal, { SentenceModalRef } from "../AddSentenceModal";
import Table from "../Table";
import TableColumn from "../TableColumn";

import { useDeleteSentenceMutation } from "@/requests/mutations/sentence";

import * as S from "./styles";

type SentenceTableProps = {
  category: any;
};

const SentencesTable = ({ category }: SentenceTableProps) => {
  const { data: session } = useSession();

  const { data: sentence, refetch } = useListSentence(session);

  const addSentenceModal = useRef<SentenceModalRef>(null);

  const mutation = useDeleteSentenceMutation(session);
  const handleDeleteSentence = async (sentence: Sentence) => {
    const confirm = window.confirm(
      `Deseja realmente excluir a consulta: ${sentence.code} - ${sentence.name}?`,
    );
    if (confirm) {
      await mutation.mutateAsync(sentence);
      refetch();
    }
  };

  const filteredSentences =
    sentence?.filter((s) => s.sentence_category_id === category.id) || [];

  return (
    <S.Wrapper>
      <Table items={filteredSentences} keyExtractor={(value) => value.id}>
        <TableColumn label="Código" tableKey="code" actionColumn />
        <TableColumn label="Nome" tableKey="name" actionColumn ellipsis />
        <TableColumn
          label="Coligada"
          tableKey="coligate"
          contentAlign="center"
          actionColumn
        />
        <TableColumn
          label="Sistema"
          tableKey="system_code"
          contentAlign="center"
          actionColumn
        />
        <TableColumn
          label="Última atualização"
          tableKey="formattedUpdatedAt"
          actionColumn
          contentAlign="center"
        />
        <TableColumn
          label="Ações"
          tableKey="actions"
          contentAlign="center"
          actionColumn
          render={(sentence: Sentence) => (
            <S.ActionButtons>
              <S.ActionEditButton
                type="button"
                title={`Editar a consulta: ${sentence.name}`}
                onClick={() => addSentenceModal.current?.openModal(sentence)}
              >
                <Edit
                  title={`Alterar a consulta: ${sentence.code} - ${sentence.name}`}
                />
              </S.ActionEditButton>

              <S.ActionDeleteButton
                type="button"
                title={`Excluir a consulta: ${sentence.code} - ${sentence.name}`}
                onClick={() => handleDeleteSentence(sentence)}
              >
                <X />
              </S.ActionDeleteButton>
            </S.ActionButtons>
          )}
        />
      </Table>
      <AddSentenceModal ref={addSentenceModal} />
    </S.Wrapper>
  );
};

export default SentencesTable;
