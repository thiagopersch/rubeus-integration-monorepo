import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Plus } from "@styled-icons/feather";

import AddSentenceModal, {
  SentenceModalRef,
} from "@/components/AddSentenceModal";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Collapse from "@/components/Collapse";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import SentencesTable from "@/components/SentencesTable";

import Base from "../Base";

import { useListSentenceCategory } from "@/requests/queries/sentenceCategory";

import * as S from "./styles";

const SentenceQueries = () => {
  const { data: session } = useSession();

  const { data: sentenceCategory } = useListSentenceCategory(session);

  const addSentenceModal = useRef<SentenceModalRef>(null);

  return (
    <Base>
      <SectionContainer>
        <Card>
          <SectionContainer paddings="xxsmall" justifyContent="center">
            <Heading size="md">Consultas</Heading>
          </SectionContainer>
          <S.Wrapper>
            <SectionContainer
              display="flex"
              flexDirection="row"
              justifyContent="spaceBetween"
              alignItems="center"
              alignContent="center"
            >
              <S.WrapperCTA>
                <Link href="/sentences/new" passHref>
                  <Button
                    size="small"
                    color="primaryColor"
                    labelColor="white"
                    icon={<Plus />}
                  >
                    Nova consulta
                  </Button>
                </Link>
              </S.WrapperCTA>
            </SectionContainer>
            <S.WrapperDividerCollpase>
              {sentenceCategory?.map((category) => (
                <Collapse label={category.name} open={false}>
                  <SentencesTable category={category} />
                </Collapse>
              ))}
            </S.WrapperDividerCollpase>
          </S.Wrapper>
        </Card>
      </SectionContainer>
      <AddSentenceModal ref={addSentenceModal} />
    </Base>
  );
};

export default SentenceQueries;
