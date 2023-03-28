import Link from "next/link";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import TextComponent from "@/components/TextComponent";
import TextInput from "@/components/TextInput";
import RowDropdown from "@/components/RowDropdown";
import Table from "@/components/Table";
import TableColumn from "@/components/TableColumn";

import Base from "../Base";
import * as S from "./styles";

const Tbc = () => {
  return (
    <Base>
      <S.Wrapper>
        <S.WrapperHeading>
          <Heading uppercase size="md">
            TBC cadastrados
          </Heading>
        </S.WrapperHeading>
        <SectionContainer
          paddings="xsmall"
          display="flex"
          justifyContent="start"
          alignItems="start"
        >
          <Button>
            <Link href="/addTbc" passHref>
              <TextComponent color="white" size="medium">
                Criar novo
              </TextComponent>
            </Link>
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
        <Table<[]> items={[] || []} keyExtractor={(value) => value.id}>
          <TableColumn label="Id" tableKey="tbc.id" actionColumn />
          <TableColumn label="Name" tableKey="tbc.name" actionColumn />
          <TableColumn label="Link" tableKey="tbc.lik" actionColumn ellipsis />
          <TableColumn label="Usuário" tableKey="tbc.user" actionColumn />
          <TableColumn
            label="Última edição"
            tableKey="tbc.updated_at"
            actionColumn
          />
        </Table>
      </S.Wrapper>
    </Base>
  );
};

export default Tbc;
