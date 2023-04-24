import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Edit, Plus, X } from "@styled-icons/feather";

import AddSentenceCategoryModal, {
  SentenceCategoryModalRef,
} from "@/components/AddSentenceCategoryModal";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Table from "@/components/Table";
import TextInput from "@/components/TextInput";
import TableColumn from "@/components/TableColumn";

import {
  FormattedSentenceCategory,
  SentenceCategory,
} from "@/models/sentenceCategory";

import Base from "../Base";

import { listSentenceCategory } from "@/requests/queries/sentenceCategory";
import { useDeleteSentenceCategoryMutation } from "@/requests/mutations/sentenceCategory";

import * as S from "./styles";

const SentenceCategories = () => {
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const { data: setenceCategory, refetch } = useQuery<
    FormattedSentenceCategory[]
  >("get-sentence-category", () => listSentenceCategory(session));

  const addSentenceModal = useRef<SentenceCategoryModalRef>(null);
  const handleOpenModal = () => {
    addSentenceModal.current?.openModal();
  };

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

  const searchLowerCase = search.toLowerCase();
  const setenceCategories = setenceCategory?.filter((setenceCategory) =>
    setenceCategory.name.toLowerCase().includes(searchLowerCase),
  );

  return (
    <Base>
      <SectionContainer>
        <Card>
          <S.WrapperHeading>
            <Heading size="md">Categoria de sentenças</Heading>
          </S.WrapperHeading>
          <SectionContainer
            paddings="xsmall"
            display="flex"
            flexDirection="row"
            justifyContent="spaceBetween"
            alignContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <S.WrapperSearch>
              <TextInput
                label="Pesquisar..."
                id="search"
                name="search"
                type="search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </S.WrapperSearch>
            <Button
              size="medium"
              color="primaryColor"
              labelColor="white"
              icon={<Plus />}
              onClick={handleOpenModal}
            >
              Adicionar
            </Button>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <Table<FormattedSentenceCategory>
              items={setenceCategories || []}
              keyExtractor={(item) => item.id}
            >
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
                      <Edit
                        title={`Alterar a categoria ${sentenceCategory.name}`}
                      />
                    </S.ActionEditButton>

                    <S.ActionDeleteButton
                      type="button"
                      title={`Excluir a categoria ${sentenceCategory.name}`}
                      onClick={() =>
                        handleDeleteSentenceCategory(sentenceCategory)
                      }
                    >
                      <X />
                    </S.ActionDeleteButton>
                  </S.ActionButtons>
                )}
              />
            </Table>
          </SectionContainer>
        </Card>
      </SectionContainer>
      <AddSentenceCategoryModal refetchFn={refetch} ref={addSentenceModal} />
    </Base>
  );
};

export default SentenceCategories;
