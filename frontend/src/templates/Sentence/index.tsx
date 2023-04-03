import ActionSentences from "@/components/ActionSentences";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Collapse from "@/components/Collapse";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Table from "@/components/Table";
import TableColumn from "@/components/TableColumn";
import TextComponent from "@/components/TextComponent";
import Link from "next/link";

import Base from "../Base";

import * as S from "./styles";

const Sentence = () => {
  return (
    <Base>
      <SectionContainer columns="fullwidth">
        <Card>
          <SectionContainer paddings="small">
            <Heading size="md">Sentenças</Heading>
          </SectionContainer>
          <S.Wrapper>
            <S.WrapperCTA>
              <Button size="small" color="primaryColor" labelColor="white">
                Nova sentença
              </Button>
              <Button color="white" labelColor="primaryRed">
                Publicar todas
              </Button>
            </S.WrapperCTA>
            <Collapse label="Inscrições e matriculas" open={false}>
              <Table<[]> items={[] || []} keyExtractor={(value) => value.id}>
                <TableColumn tableKey="sentence.code" actionColumn />
                <TableColumn
                  label="Código"
                  tableKey="sentence.code"
                  actionColumn
                  ellipsis
                ></TableColumn>
                <TableColumn
                  label="Nome"
                  tableKey="sentence.name"
                  actionColumn
                  ellipsis
                ></TableColumn>
                <TableColumn
                  label="Coligada"
                  tableKey="sentence.coligate"
                  actionColumn
                />
                <TableColumn
                  label="Sistema"
                  tableKey="sentence.system"
                  actionColumn
                />
                <TableColumn
                  label="Última edição"
                  tableKey="sentence.updated_at"
                  actionColumn
                  ellipsis
                />
                <TableColumn
                  label="Ações"
                  tableKey="sentence.actions"
                  actionColumn
                />
              </Table>
              <Checkbox id="checkSentence" />
              <S.WrapperNameSentence>
                <TextComponent>RB.PS.IM.005</TextComponent>
                <Link href="#">
                  <TextComponent>Dados do portal do inscrito</TextComponent>
                </Link>
                <TextComponent>0</TextComponent>
                <TextComponent>S</TextComponent>
                <TextComponent>
                  01/01/2023 as 13:30 por Tiago Pexe
                </TextComponent>
                <S.WrapperCTAActions>
                  <ActionSentences />
                </S.WrapperCTAActions>
              </S.WrapperNameSentence>
            </Collapse>
          </S.Wrapper>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default Sentence;
