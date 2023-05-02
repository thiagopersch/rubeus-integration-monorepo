import { FormattedTbc, Tbc } from "@/models/tbc";
import Badge from "../Badge";
import Table from "../Table";
import TableColumn from "../TableColumn";
import { Edit, X } from "@styled-icons/feather";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { listTbc } from "@/requests/queries/tbc";
import { useRef } from "react";
import AddTbcModal, { TbcModalRef } from "../AddTbcModal";
import { useDeleteTbcMutation } from "@/requests/mutations/tbc";

import * as S from "./styles";

type TbcProps = {
  tbcs: any;
};

const TbcTable = ({ tbcs }: TbcProps) => {
  const { data: session } = useSession();
  const { refetch } = useQuery<FormattedTbc[]>("get-tbc", () =>
    listTbc(session),
  );

  const addTbcModal = useRef<TbcModalRef>(null);

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

  return (
    <>
      <Table items={tbcs || []} keyExtractor={(item) => item.id}>
        <TableColumn label="Name" tableKey="name" actionColumn />
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
          label="Última atualização"
          tableKey="formattedUpdatedAt"
          actionColumn
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
      <AddTbcModal refetchFn={refetch} ref={addTbcModal} />
    </>
  );
};

export default TbcTable;
