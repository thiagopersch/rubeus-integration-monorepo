import { useRef } from "react";
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

import { Client, FormattedClient } from "@/models/client";

import { useDeleteClientMutation } from "@/requests/mutations/clients";
import { listClients } from "@/requests/queries/clients";

import * as S from "./styles";
import { useQuery } from "react-query";

const Clients = () => {
  const addClientModal = useRef<ClientModalRef>(null);

  const { data: session } = useSession();
  const { data, refetch } = useQuery<FormattedClient[]>("get-clients", () =>
    listClients(session),
  );

  const mutation = useDeleteClientMutation(session);
  const handleDeleteClient = async (client: Client) => {
    const confirm = window.confirm(`Deseja excluir o cliente: ${client.name}?`);
    if (confirm) {
      await mutation.mutateAsync(client);
      refetch();
    }
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
              onClick={() => addClientModal.current?.openModal()}
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
            <Table<FormattedClient>
              items={data || []}
              keyExtractor={(item) => item.id}
            >
              <TableColumn label="Nome" tableKey="name" actionColumn />
              <TableColumn label="Situação" tableKey="status" actionColumn />
              <TableColumn
                label="Última edição"
                tableKey="formattedUpdatedAt"
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
                      onClick={() => addClientModal.current?.openModal()}
                    >
                      <Edit title={`Alterar o cliente: ${client.name}`} />
                    </S.ActionEditButton>
                    <S.ActionDeleteButton
                      type="button"
                      title={`Excluir o cliente ${client.name}`}
                      onClick={() => handleDeleteClient(client)}
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
      <AddClientModal refetchFn={refetch} ref={addClientModal} />
    </Base>
  );
};

export default Clients;
