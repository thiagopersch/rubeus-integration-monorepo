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
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useShowTbc } from "@/requests/queries/tbc";

const Sentence = () => {
  const { query } = useRouter();
  const { data: session } = useSession();
  const { data: tbc } = useShowTbc(session, {
    id: query.tbc_id as string,
  });

  return (
    <Base>
      <SectionContainer>
        <Card>
          <SectionContainer paddings="xsmall">
            <Heading size="md" textAlign="center">
              Sentenças do TBC: {tbc?.name}
            </Heading>
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
            <S.WrapperDividerCollpase>
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
                  <TextComponent>01/01/2023 as 13:30</TextComponent>
                  <S.WrapperCTAActions>
                    <ActionSentences />
                  </S.WrapperCTAActions>
                </S.WrapperNameSentence>
              </Collapse>
            </S.WrapperDividerCollpase>
          </S.Wrapper>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default Sentence;
