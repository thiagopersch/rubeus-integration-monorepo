import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Separator from "@/components/Separator";
import ToggleSwitch from "@/components/SwithToggle";
import TextComponent from "@/components/TextComponent";
import TextInput from "@/components/TextInput";
import Link from "next/link";

import Base from "../Base";

import * as S from "./styles";

const AddTBC = () => {
  return (
    <Base>
      <SectionContainer paddings="xsmall">
        <Card columns="fullwidth">
          <SectionContainer paddings="small">
            <Heading size="md">Cadastrar TBC</Heading>
          </SectionContainer>
          <S.WrapperDescription>
            <TextComponent color="lightGrey" size="small" textAlign="left">
              Configurações TOTVS Business Connect
            </TextComponent>
          </S.WrapperDescription>
          <S.WrapperInputs>
            <TextInput type="text" label="Nome do TBC" name="name" />
          </S.WrapperInputs>
          <S.WrapperInputsThreeColumns>
            <TextInput type="text" name="user" label="Usuário" />
            <TextInput type="text" name="password" label="Senha" />
            <TextInput type="text" name="link" label="Link TBC" />
          </S.WrapperInputsThreeColumns>
          <S.WrapperInputs>
            <ToggleSwitch
              key="metodoSemLicenca"
              children="Utiliza métodos sem licença"
            />
          </S.WrapperInputs>
          <S.WrapperDescription>
            <TextComponent color="lightGrey" size="small" textAlign="left">
              Contexto
            </TextComponent>
          </S.WrapperDescription>
          <S.WrapperInputsContextColumns>
            <TextInput type="text" name="coligate" label="Código da Coligada" />
            <TextInput type="text" name="branch" label="Código da filial" />
            <TextInput
              type="text"
              name="teachingLevel"
              label="Nível de ensino"
            />
            <TextInput
              type="text"
              name="codSistema"
              label="Código do sistema"
            />
            <TextInput type="text" name="userContext" label="Usuário" />
          </S.WrapperInputsContextColumns>
          <S.WrapperSeparator>
            <Separator />
          </S.WrapperSeparator>
          <S.WrapperButtons>
            <Link href="/tbc">
              <Button
                styleType="normal"
                size="large"
                color="white"
                sizeLabel="small"
                labelColor="darkGrey"
                children="Cancelar"
              />
            </Link>
            <Button
              styleType="normal"
              size="large"
              color="primaryColor"
              sizeLabel="small"
              labelColor="white"
              children="Concluir"
            />
          </S.WrapperButtons>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default AddTBC;
