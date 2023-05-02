import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Plus } from "@styled-icons/feather";

import AddSentenceCategoryModal, {
  SentenceCategoryModalRef,
} from "@/components/AddSentenceCategoryModal";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import SentenceCategoryTable from "@/components/SentenceCategoryTable";

import Base from "../Base";

import { listSentenceCategory } from "@/requests/queries/sentenceCategory";

import * as S from "./styles";

const SentenceCategories = () => {
  const { data: session } = useSession();
  const { refetch } = useQuery("get-sentence-category", () =>
    listSentenceCategory(session),
  );

  const addSentenceModal = useRef<SentenceCategoryModalRef>(null);
  const handleOpenModal = () => {
    addSentenceModal.current?.openModal();
  };

  return (
    <Base>
      <SectionContainer>
        <Card>
          <S.WrapperHeading>
            <Heading size="md">Categoria de sentenças</Heading>
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
            <Button
              size="medium"
              color="primaryColor"
              labelColor="white"
              icon={<Plus />}
              onClick={handleOpenModal}
            >
              Adicionar
            </Button>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <SentenceCategoryTable />
          </SectionContainer>
        </Card>
      </SectionContainer>
      <AddSentenceCategoryModal refetchFn={refetch} ref={addSentenceModal} />
    </Base>
  );
};

export default SentenceCategories;
