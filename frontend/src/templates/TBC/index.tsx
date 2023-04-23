import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Edit, Plus, X } from "@styled-icons/feather";

import AddTbcModal, { TbcModalRef } from "@/components/AddTbcModal";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Table from "@/components/Table";
import TableColumn from "@/components/TableColumn";
import TextInput from "@/components/TextInput";

import { FormattedTbc, Tbc } from "@/models/tbc";

import { useDeleteTbcMutation } from "@/requests/mutations/tbc";
import { listTbc } from "@/requests/queries/tbc";

import Base from "../Base";

import * as S from "./styles";

const Tbcs = () => {
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const { data: tbc, refetch } = useQuery<FormattedTbc[]>("get-tbc", () =>
    listTbc(session),
  );
  const addTbcModal = useRef<TbcModalRef>(null);
  const handleOpenModal = () => {
    addTbcModal.current?.openModal();
  };

  const mutation = useDeleteTbcMutation(session);
  const handleDeleteTbc = async (tbc: Tbc) => {
    const confirm = window.confirm(
      `Deseja realmente excluir o TBC: ${tbc.name}?`,
    );
    if (confirm) {
      await mutation.mutateAsync(tbc.id);
      refetch();
    }
  };

  const searchLowerCase = search.toLowerCase();
  const tbcs = tbc?.filter((value) =>
    value.name.toLowerCase().includes(searchLowerCase),
  );

  return (
    <Base>
      <Card>
        <S.Wrapper>
          <S.WrapperHeading>
            <Heading size="md">TBC cadastrados</Heading>
          </S.WrapperHeading>
          <SectionContainer
            paddings="xsmall"
            display="flex"
            flexDirection="row"
            justifyContent="spaceBetween"
            alignItems="center"
            alignContent="center"
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
            <S.WrapperItemsPerPage>
              <Link href="/tbc/new" passHref>
                <Button
                  size="medium"
                  color="primaryColor"
                  sizeLabel="small"
                  labelColor="white"
                  icon={<Plus />}
                >
                  Adicionar TBC
                </Button>
              </Link>
            </S.WrapperItemsPerPage>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <Table items={tbcs || []} keyExtractor={(item) => item.id}>
              <TableColumn
                label="Name"
                tableKey="name"
                actionColumn
                render={(tbc: Tbc) => (
                  <Link
                    href={{
                      pathname: "/tbc/[tbc_id]",
                      query: {
                        tbc_id: tbc.id,
                      },
                    }}
                    passHref
                  >
                    <S.TextModifiersLink>{tbc.name}</S.TextModifiersLink>
                  </Link>
                )}
              />
              <TableColumn label="Link" tableKey="link" actionColumn />
              <TableColumn label="Usuário" tableKey="user" actionColumn />
              <TableColumn
                label="Utiliza licença?"
                tableKey="unlicensed_method"
                actionColumn
                contentAlign="center"
                render={(tbc: Tbc) =>
                  tbc.unlicensed_method ? (
                    <Badge styledType="success">Sim</Badge>
                  ) : (
                    <Badge styledType="danger">Não</Badge>
                  )
                }
              />
              <TableColumn
                label="Ações"
                tableKey="actions"
                contentAlign="center"
                actionColumn
                render={(tbc: Tbc) => (
                  <S.ActionButtons>
                    <S.ActionEditButton
                      type="button"
                      title={`Editar o TBC: ${tbc.name}`}
                      onClick={() => addTbcModal.current?.openModal(tbc)}
                    >
                      <Edit title={`Alterar o cliente: ${tbc.name}`} />
                    </S.ActionEditButton>

                    <S.ActionDeleteButton
                      type="button"
                      title={`Excluir o TBC: ${tbc.name}`}
                      onClick={() => handleDeleteTbc(tbc)}
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
      <AddTbcModal refetchFn={refetch} ref={addTbcModal} />
    </Base>
  );
};

export default Tbcs;
