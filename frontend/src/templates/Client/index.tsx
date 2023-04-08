import { useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Edit, Plus, X } from "@styled-icons/feather";

import Base from "../Base";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import RowDropdown from "@/components/RowDropdown";
import SectionContainer from "@/components/SectionContainer";
import TextInput from "@/components/TextInput";
import Table from "@/components/Table";
import TableColumn from "@/components/TableColumn";
import AddClientModal, { ClientModalRef } from "@/components/AddClientModal";

import { useListClients } from "@/requests/queries/clients";

import * as S from "./styles";

const Client = () => {
  const { data: session } = useSession();
  const { data: client, refetch } = useListClients(session, {
    name: session?.configs.name_client,
  });

  const modalRef = useRef<ClientModalRef>(null);
  const handleOpenModal = () => {
    modalRef.current?.openModal();
  };

  return (
    <Base>
      <Card>
        <S.Wrapper>
          <S.WrapperHeading>
            <Heading size="md">Clientes</Heading>
          </S.WrapperHeading>
          <SectionContainer
            paddings="xsmall"
            display="flex"
            justifyContent="start"
            alignItems="start"
          >
            <Button
              size="medium"
              color="primaryColor"
              labelColor="white"
              icon={<Plus />}
              onClick={handleOpenModal}
            >
              Adicionar cliente
            </Button>
          </SectionContainer>
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
              <TextInput label="Pesquisar..." name="search" type="search" />
            </S.WrapperSearch>
            <S.WrapperItemsPerPage>
              <RowDropdown children="Itens por página" />
            </S.WrapperItemsPerPage>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <Table items={client || []} keyExtractor={(value) => value.id}>
              {/* <TableColumn label="Id" tableKey="id" actionColumn /> */}
              <TableColumn label="Nome" tableKey="name" actionColumn />
              <TableColumn label="Situação" tableKey="status" actionColumn />
              <TableColumn
                label="Última edição"
                tableKey="updated_at"
                actionColumn
              />
              <TableColumn
                label="Ações"
                tableKey="actions"
                contentAlign="center"
                actionColumn
                render={(client) => (
                  <S.ActionButtons>
                    <S.ActionEditButton
                      type="button"
                      title={`Alterar o cliente: ${client.name}`}
                      onClick={() => modalRef.current?.openModal(client)}
                    >
                      <Edit title={`Alterar o cliente: ${client.name}`} />
                    </S.ActionEditButton>
                    <S.ActionDeleteButton
                      type="button"
                      title={`Excluir o cliente ${client.name}`}
                      // onClick={() => handleDelete(client)}
                    >
                      <X />
                    </S.ActionDeleteButton>
                  </S.ActionButtons>
                )}
              />
            </Table>
          </SectionContainer>
        </S.Wrapper>
      </Card>
      <AddClientModal refetchFn={refetch} ref={modalRef} />
    </Base>
  );
};

export default Client;
