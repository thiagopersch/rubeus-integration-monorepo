import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useResetAtom } from "jotai/utils";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import ErrorMessageLabel from "@/components/ErrorMessageLabel";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import Select from "@/components/Select";
import TextComponent from "@/components/TextComponent";
import TextInput from "@/components/TextInput";

import { Tbc } from "@/models/tbc";

import { basicTbcData } from "@/store/create-tbc";

import { useAddTbcMutation } from "@/requests/mutations/tbc";
import { useListClients } from "@/requests/queries/clients";

import Base from "../Base";

import * as S from "./styles";

type AddTbcData = {
  id: string;
  client_id: string;
  name: string;
  user: string;
  password: string;
  link: string;
  unlicensed_method: string;
  context_coligate_code: string;
  context_branch_code: string;
  context_education_level_code: string;
  context_system_code: string;
  context_user_code: string;
};

const AddTBC = () => {
  const [tbc, setTbc] = useState<Tbc>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTbcData>();
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession();
  const { data: clients } = useListClients(session);
  const mutation = useAddTbcMutation(session);
  const resetform = useResetAtom(basicTbcData);

  const { push } = useRouter();

  const clientOptions = useMemo(() => {
    if (!clients) return [];

    return clients.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [clients]);

  const onSubmit: SubmitHandler<AddTbcData> = useCallback(
    async (data: AddTbcData) => {
      try {
        setSaving(true);
        await mutation.mutateAsync({
          ...data,
        });
      } catch (error) {
        console.error(error);
      }
      await push("/tbc");
      setSaving(false);
      resetform();
    },
    [mutation, session],
  );

  return (
    <Base>
      <SectionContainer paddings="xxsmall">
        <Card>
          <SectionContainer justifyContent="center">
            <Heading size="md">Cadastrar TBC</Heading>
          </SectionContainer>
          <S.WrapperDescription>
            <TextComponent color="lightGrey" size="small" weight="bold">
              Configurações TOTVS Business Connect
            </TextComponent>
          </S.WrapperDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.WrapperTwoInputs>
              <S.WrapperInput>
                <Controller
                  name="client_id"
                  control={control}
                  defaultValue={tbc?.client_id}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="Cliente"
                      {...field}
                      options={clientOptions}
                      aria-invalid={errors.client_id ? "true" : "false"}
                    />
                  )}
                />
                {errors.client_id?.type === "required" && (
                  <ErrorMessageLabel>Cliente é obrigatório.</ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={tbc?.name}
                  rules={{ required: true, maxLength: 100 }}
                  render={({ field }) => (
                    <TextInput
                      label="Nome"
                      id="name"
                      {...field}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  )}
                />
                {errors.name?.type === "required" && (
                  <ErrorMessageLabel>Nome é obrigatório.</ErrorMessageLabel>
                )}
                {errors.name?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 100 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
            </S.WrapperTwoInputs>
            <S.WrapperInputsThreeColumns>
              <S.WrapperInput>
                <Controller
                  name="user"
                  control={control}
                  defaultValue={tbc?.user}
                  rules={{ required: true, maxLength: 255 }}
                  render={({ field }) => (
                    <TextInput
                      label="Usuário"
                      id="user"
                      {...field}
                      aria-invalid={errors.user ? "true" : "false"}
                    />
                  )}
                />
                {errors.user?.type === "required" && (
                  <ErrorMessageLabel>Usuário é obrigatório.</ErrorMessageLabel>
                )}
                {errors.user?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 255 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="password"
                  control={control}
                  defaultValue={tbc?.password}
                  rules={{ required: true, maxLength: 255 }}
                  render={({ field }) => (
                    <TextInput
                      label="Senha"
                      id="password"
                      type="password"
                      {...field}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                  )}
                />
                {errors.password?.type === "required" && (
                  <ErrorMessageLabel>Senha é obrigatório.</ErrorMessageLabel>
                )}
                {errors.password?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 255 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="link"
                  control={control}
                  defaultValue={tbc?.link}
                  rules={{ required: true, maxLength: 255 }}
                  render={({ field }) => (
                    <TextInput
                      label="Link"
                      id="link"
                      {...field}
                      aria-invalid={errors.link ? "true" : "false"}
                    />
                  )}
                />
                {errors.link?.type === "required" && (
                  <ErrorMessageLabel>Link é obrigatório.</ErrorMessageLabel>
                )}
                {errors.link?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 255 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
            </S.WrapperInputsThreeColumns>
            <S.WrapperUnlicensedMethod>
              <S.WrapperInput>
                <Controller
                  name="unlicensed_method"
                  control={control}
                  defaultValue={tbc?.unlicensed_method}
                  render={({ field }) => (
                    <Checkbox
                      id="unlicensed_method"
                      label="Utilizar métodos sem licença"
                      labelColor="primaryColor"
                      {...field}
                      aria-invalid={errors.unlicensed_method ? "true" : "false"}
                    />
                  )}
                />
              </S.WrapperInput>
            </S.WrapperUnlicensedMethod>
            <S.WrapperDescription>
              <TextComponent color="lightGrey" size="small" weight="bold">
                Contexto
              </TextComponent>
            </S.WrapperDescription>
            <S.WrapperInputsContextColumns>
              <S.WrapperInput>
                <Controller
                  name="context_coligate_code"
                  control={control}
                  defaultValue={tbc?.context_coligate_code}
                  rules={{ required: true, maxLength: 3 }}
                  render={({ field }) => (
                    <TextInput
                      label="Cod. Coligada"
                      id="context_coligate_code"
                      {...field}
                      aria-invalid={
                        errors.context_coligate_code ? "true" : "false"
                      }
                    />
                  )}
                />
                {errors.context_coligate_code?.type === "required" && (
                  <ErrorMessageLabel>
                    Código da coligada é obrigatório.
                  </ErrorMessageLabel>
                )}
                {errors.context_coligate_code?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 3 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="context_branch_code"
                  control={control}
                  defaultValue={tbc?.context_branch_code}
                  rules={{ required: true, maxLength: 3 }}
                  render={({ field }) => (
                    <TextInput
                      label="Cod. Filial"
                      id="context_branch_code"
                      {...field}
                      aria-invalid={
                        errors.context_branch_code ? "true" : "false"
                      }
                    />
                  )}
                />
                {errors.context_branch_code?.type === "required" && (
                  <ErrorMessageLabel>
                    Código da filial é obrigatório.
                  </ErrorMessageLabel>
                )}
                {errors.context_branch_code?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 3 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="context_education_level_code"
                  control={control}
                  defaultValue={tbc?.context_education_level_code}
                  rules={{ required: true, maxLength: 3 }}
                  render={({ field }) => (
                    <TextInput
                      label="Nível de ensino"
                      id="context_education_level_code"
                      {...field}
                      aria-invalid={
                        errors.context_education_level_code ? "true" : "false"
                      }
                    />
                  )}
                />
                {errors.context_education_level_code?.type === "required" && (
                  <ErrorMessageLabel>
                    Nível de ensino é obrigatório.
                  </ErrorMessageLabel>
                )}
                {errors.context_education_level_code?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 3 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="context_system_code"
                  control={control}
                  defaultValue={tbc?.context_system_code}
                  rules={{ required: true, maxLength: 3 }}
                  render={({ field }) => (
                    <TextInput
                      label="Cod. Sistema"
                      id="context_system_code"
                      {...field}
                      aria-invalid={
                        errors.context_system_code ? "true" : "false"
                      }
                    />
                  )}
                />
                {errors.context_system_code?.type === "required" && (
                  <ErrorMessageLabel>
                    Código do sistema é obrigatório.
                  </ErrorMessageLabel>
                )}
                {errors.context_system_code?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 3 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
              <S.WrapperInput>
                <Controller
                  name="context_user_code"
                  control={control}
                  defaultValue={tbc?.context_user_code}
                  rules={{ required: true, maxLength: 100 }}
                  render={({ field }) => (
                    <TextInput
                      label="Cod. usuário"
                      id="context_user_code"
                      {...field}
                      aria-invalid={errors.context_user_code ? "true" : "false"}
                    />
                  )}
                />
                {errors.context_user_code?.type === "required" && (
                  <ErrorMessageLabel>
                    Código do usuário é obrigatório.
                  </ErrorMessageLabel>
                )}
                {errors.context_user_code?.type === "maxLength" && (
                  <ErrorMessageLabel>
                    Ultrapassou o limite de 100 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInput>
            </S.WrapperInputsContextColumns>
            <S.WrapperButtons>
              <Link href="/tbc" passHref>
                <Button
                  styleType="normal"
                  size="medium"
                  color="white"
                  sizeLabel="small"
                  labelColor="darkGrey"
                  type="reset"
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                styleType="normal"
                size="medium"
                color="primaryColor"
                sizeLabel="small"
                labelColor="white"
                type="submit"
                disabled={saving}
              >
                {saving ? "Salvando..." : "Concluir"}
              </Button>
            </S.WrapperButtons>
          </form>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default AddTBC;
