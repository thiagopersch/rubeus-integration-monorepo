import { Edit, X } from "@styled-icons/feather";

import { Client, FormattedClient } from "@/models/client";

import Table from "../Table";
import TableColumn from "../TableColumn";
import Badge from "../Badge";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { listClients } from "@/requests/queries/clients";
import { useRef } from "react";
import AddClientModal, { ClientModalRef } from "../AddClientModal";
import { useDeleteClientMutation } from "@/requests/mutations/clients";

import * as S from "./styles";

type ClientProps = {
  clients: any;
};

const ClientTable = ({ clients }: ClientProps) => {
  const { data: session } = useSession();
  const { data: client, refetch } = useQuery<FormattedClient[]>(
    "get-clients",
    () => listClients(session),
  );

  const addClientModal = useRef<ClientModalRef>(null);

  const mutation = useDeleteClientMutation(session);
  const handleDeleteClient = async (client: Client) => {
    const confirm = window.confirm(`Deseja excluir o cliente: ${client.name}?`);
    if (confirm) {
      await mutation.mutateAsync(client);
      refetch();
    }
  };

  return (
    <S.Wrapper>
      <Table<FormattedClient>
        items={clients || []}
        keyExtractor={(item) => item.id}
      >
        <TableColumn label="Nome" tableKey="name" actionColumn />
        <TableColumn label="Link" tableKey="link_crm" actionColumn />
        <TableColumn
          label="Situação"
          tableKey="status"
          actionColumn
          contentAlign="center"
          render={(client: Client) =>
            client.status ? (
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
          render={(client) => (
            <S.ActionButtons>
              <S.ActionEditButton
                type="button"
                title={`Alterar o cliente ${client.name}`}
                onClick={() => addClientModal.current?.openModal(client)}
              >
                <Edit title={`Alterar o cliente ${client.name}`} />
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
      <AddClientModal refetchFn={refetch} ref={addClientModal} />
    </S.Wrapper>
  );
};

export default ClientTable;
