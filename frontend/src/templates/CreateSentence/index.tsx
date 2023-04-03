import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Separator from "@/components/Separator";
import TextInput from "@/components/TextInput";
import Base from "../Base";

import * as S from "./styles";

const CreateSentence = () => {
  return (
    <Base>
      <SectionContainer paddings="xsmall">
        <Card>
          <SectionContainer paddings="small">
            <Heading size="md">Cadastrar sentença SQL</Heading>
          </SectionContainer>
          <S.WrapperInputs>
            <S.WrapperInputSmall>
              <TextInput
                type="text"
                name="coligate"
                id="coligate"
                label="Código da coligada"
              />
            </S.WrapperInputSmall>
            <S.WrapperInputSmall>
              <TextInput
                type="text"
                name="system"
                id="system"
                label="Código do sistema"
              />
            </S.WrapperInputSmall>
            <S.WrapperInputSmall>
              <TextInput
                type="text"
                name="code"
                id="code"
                label="Código da sentença"
              />
            </S.WrapperInputSmall>
            <S.WrapperInputLarge>
              <TextInput
                type="text"
                name="name"
                id="name"
                label="Nome da sentença"
              />
            </S.WrapperInputLarge>
          </S.WrapperInputs>
          <S.WrapperSentence>
            <TextInput
              type="text"
              name="sentence"
              id="sentence"
              label="Sentença"
              as="textarea"
            />
          </S.WrapperSentence>
          <S.WrapperSeparator>
            <Separator />
          </S.WrapperSeparator>
          <S.WrapperCTA>
            <Button size="medium" color="white" labelColor="darkGrey">
              Cancelar
            </Button>
            <Button size="medium" labelColor="white">
              Concluir
            </Button>
          </S.WrapperCTA>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default CreateSentence;
