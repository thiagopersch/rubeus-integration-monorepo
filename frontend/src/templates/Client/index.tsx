import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Edit, Plus, X } from "@styled-icons/feather";
import { useQuery } from "react-query";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import TextInput from "@/components/TextInput";
import Table from "@/components/Table";
import TableColumn from "@/components/TableColumn";
import AddClientModal, { ClientModalRef } from "@/components/AddClientModal";

import Base from "../Base";

import { Client, FormattedClient } from "@/models/client";

import { useDeleteClientMutation } from "@/requests/mutations/clients";
import { listClients } from "@/requests/queries/clients";

import * as S from "./styles";
import ClientTable from "@/components/ClientTable";

const Clients = () => {
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const { data: client, refetch } = useQuery<FormattedClient[]>(
    "get-clients",
    () => listClients(session),
  );

  const addClientModal = useRef<ClientModalRef>(null);
  const handleOpenModal = () => {
    addClientModal.current?.openModal();
  };

  const mutation = useDeleteClientMutation(session);
  const handleDeleteClient = async (client: Client) => {
    const confirm = window.confirm(`Deseja excluir o cliente: ${client.name}?`);
    if (confirm) {
      await mutation.mutateAsync(client);
      refetch();
    }
  };

  const searchLowerCase = search.toLowerCase();
  const clients = client?.filter((client) =>
    client.name.toLowerCase().includes(searchLowerCase),
  );

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
              Adicionar cliente
            </Button>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <ClientTable clients={clients} />
          </SectionContainer>
        </S.Wrapper>
      </Card>
      <AddClientModal refetchFn={refetch} ref={addClientModal} />
    </Base>
  );
};

export default Clients;
