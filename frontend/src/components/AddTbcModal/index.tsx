import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import Button from "../Button";
import Checkbox from "../Checkbox";
import ErrorMessageLabel from "../ErrorMessageLabel";
import Modal, { ModalRef } from "../Modal";
import Select from "../Select";
import Separator from "../Separator";
import TextComponent from "../TextComponent";
import TextInput from "../TextInput";

import { Tbc } from "@/models/tbc";

import { useAddTbcMutation } from "@/requests/mutations/tbc";
import { tbcKeys } from "@/requests/queries/tbc";
import { useListClients } from "@/requests/queries/clients";

import * as S from "./styles";

export type TbcModalRef = {
  openModal: (tbc?: Tbc) => void;
};

type AddTbcModalProps = {
  refetchFn: () => void;
};

type AddTbcData = {
  client_id: string;
  name: string;
  user: string;
  password: string;
  link: string;
  unlicensed_method: boolean;
  context_coligate_code: string;
  context_branch_code: string;
  context_education_level_code: string;
  context_system_code: string;
  context_user_code: string;
};

const MessageRequired = "Campo obrigatório.";

const AddTbcModal: ForwardRefRenderFunction<TbcModalRef, AddTbcModalProps> = (
  { refetchFn },
  ref,
) => {
  const [tbc, setTbc] = useState<Tbc>();
  const [unlicensed_method, setUnlicensed_method] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddTbcData>({
    defaultValues: {
      client_id: tbc?.client_id,
      name: tbc?.name,
      user: tbc?.user,
      password: tbc?.password,
      link: tbc?.link,
      unlicensed_method: tbc?.unlicensed_method,
      context_coligate_code: tbc?.context_coligate_code,
      context_branch_code: tbc?.context_branch_code,
      context_education_level_code: tbc?.context_education_level_code,
      context_system_code: tbc?.context_system_code,
      context_user_code: tbc?.context_user_code,
    },
  });

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useListClients(session, {
    id: session?.id,
  });
  const mutation = useAddTbcMutation(modalRef, session);

  const clientOptions = useMemo(() => {
    if (isLoading) return [{ label: "Carregando...", value: "" }];
    if (!clients) return [];

    return clients.map((client) => ({
      value: client.id,
      label: client.name,
    }));
  }, [clients, isLoading]);

  const onSubmit: SubmitHandler<AddTbcData> = useCallback(
    async (values: AddTbcData) => {
      setSaving(true);
      await mutation.mutateAsync({
        id: tbc?.id,
        client_id: values?.client_id,
        name: values?.name,
        user: values?.user,
        password: values?.password,
        link: values?.link,
        unlicensed_method: unlicensed_method,
        context_coligate_code: values?.context_coligate_code,
        context_branch_code: values?.context_branch_code,
        context_education_level_code: values?.context_education_level_code,
        context_system_code: values?.context_system_code,
        context_user_code: values?.context_user_code,
      });
      refetchFn && refetchFn();
      setSaving(false);
    },
    [mutation, tbc, unlicensed_method, refetchFn, session],
  );

  const handleBack = useCallback(() => {
    setTbc(undefined);
    setUnlicensed_method(false);
    reset();
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Tbc) => {
    setTbc(data);
    setUnlicensed_method(data?.unlicensed_method || false);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal
      title={tbc ? `Editando o TBC: ${tbc?.name}` : "Adicionar TBC"}
      closeOnClickOutside={false}
      ref={modalRef}
      height="normal"
      width="auto"
    >
      <S.Wrapper>
        <S.WrapperDescription>
          <TextComponent color="lightGrey" size="small" weight="bold">
            Configurações TOTVS Business Connect
          </TextComponent>
        </S.WrapperDescription>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperTwoInputs>
            <S.WrapperInputs>
              <Controller
                name="name"
                control={control}
                defaultValue={tbc?.name ?? ""}
                rules={{ required: true, maxLength: 255 }}
                render={({ field }) => (
                  <TextInput
                    id="name"
                    label={!tbc?.name ? "Nome" : ""}
                    placeholder={!!tbc?.name ? "Nome" : ""}
                    defaultValue={tbc?.name ?? ""}
                    {...field}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                )}
              />
              {errors.name?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.name?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 255 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
          </S.WrapperTwoInputs>
          <S.WrapperInputsThreeColumns>
            <S.WrapperInputs>
              <Controller
                name="user"
                control={control}
                defaultValue={tbc?.user ?? ""}
                rules={{ required: true, maxLength: 255 }}
                render={({ field }) => (
                  <TextInput
                    id="user"
                    label={!tbc?.user ? "Usuário" : ""}
                    placeholder={!!tbc?.user ? "Usuário" : ""}
                    defaultValue={tbc?.user ?? ""}
                    {...field}
                    aria-invalid={errors.user ? "true" : "false"}
                  />
                )}
              />
              {errors.user?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.user?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 255 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="password"
                control={control}
                defaultValue={tbc?.password}
                rules={{ required: true, maxLength: 255 }}
                render={({ field }) => (
                  <TextInput
                    id="password"
                    type="password"
                    label={!tbc?.password ? "Senha" : ""}
                    placeholder={!!tbc?.password ? "Senha" : ""}
                    defaultValue={tbc?.password}
                    {...field}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                )}
              />
              {errors.password?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.password?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 255 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="link"
                control={control}
                defaultValue={tbc?.link}
                rules={{ required: true, maxLength: 255 }}
                render={({ field }) => (
                  <TextInput
                    id="link"
                    label={!tbc?.link ? "Link" : ""}
                    placeholder={!!tbc?.link ? "Link" : ""}
                    defaultValue={tbc?.link}
                    {...field}
                    aria-invalid={errors.link ? "true" : "false"}
                  />
                )}
              />
              {errors.link?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.link?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 255 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
          </S.WrapperInputsThreeColumns>
          <S.WrapperUnlicensedMethod>
            <S.WrapperInputs>
              <Checkbox
                id="unlicensed_method"
                label="Utilizar métodos sem licença"
                labelFor="Utiliza métodos sem licença"
                isChecked={unlicensed_method}
                onCheck={setUnlicensed_method}
              />
            </S.WrapperInputs>
          </S.WrapperUnlicensedMethod>
          <S.WrapperDescription>
            <TextComponent color="lightGrey" size="small" textAlign="left">
              Contexto
            </TextComponent>
          </S.WrapperDescription>
          <S.WrapperInputsContextColumns>
            <S.WrapperInputs>
              <Controller
                name="context_coligate_code"
                control={control}
                defaultValue={tbc?.context_coligate_code ?? ""}
                rules={{ required: true, maxLength: 3 }}
                render={({ field }) => (
                  <TextInput
                    id="context_coligate_code"
                    label={!tbc?.context_coligate_code ? "Cod. Coligada" : ""}
                    placeholder={
                      !!tbc?.context_coligate_code ? "Cod. Coligada" : ""
                    }
                    defaultValue={tbc?.context_coligate_code ?? ""}
                    {...field}
                    aria-invalid={
                      errors.context_coligate_code ? "true" : "false"
                    }
                  />
                )}
              />
              {errors.context_coligate_code?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.context_coligate_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 3 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="context_branch_code"
                control={control}
                defaultValue={tbc?.context_branch_code ?? ""}
                rules={{ required: true, maxLength: 3 }}
                render={({ field }) => (
                  <TextInput
                    id="context_branch_code"
                    label={!tbc?.context_branch_code ? "Cod.Filial" : ""}
                    placeholder={
                      !!tbc?.context_branch_code ? "Cod. Filial" : ""
                    }
                    defaultValue={tbc?.context_branch_code ?? ""}
                    {...field}
                    aria-invalid={errors.context_branch_code ? "true" : "false"}
                  />
                )}
              />
              {errors.context_branch_code?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.context_branch_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 3 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="context_education_level_code"
                control={control}
                defaultValue={tbc?.context_education_level_code ?? ""}
                rules={{ required: true, maxLength: 3 }}
                render={({ field }) => (
                  <TextInput
                    id="context_education_level_code"
                    label={
                      !tbc?.context_education_level_code
                        ? "Nível de ensino"
                        : ""
                    }
                    placeholder={
                      !!tbc?.context_education_level_code
                        ? "Nível de ensino"
                        : ""
                    }
                    defaultValue={tbc?.context_education_level_code ?? ""}
                    {...field}
                    aria-invalid={
                      errors.context_education_level_code ? "true" : "false"
                    }
                  />
                )}
              />
              {errors.context_education_level_code?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.context_education_level_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 3 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="context_system_code"
                control={control}
                defaultValue={tbc?.context_system_code ?? ""}
                rules={{ required: true, maxLength: 3 }}
                render={({ field }) => (
                  <TextInput
                    id="coligate"
                    label={!tbc?.context_system_code ? "Cod. Sistema" : ""}
                    placeholder={!!tbc?.context_system_code ? "Sistema" : ""}
                    defaultValue={tbc?.context_system_code ?? ""}
                    {...field}
                    aria-invalid={errors.context_system_code ? "true" : "false"}
                  />
                )}
              />
              {errors.context_system_code?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.context_system_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 3 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                name="context_user_code"
                control={control}
                defaultValue={tbc?.context_user_code ?? ""}
                rules={{ required: true, maxLength: 100 }}
                render={({ field }) => (
                  <TextInput
                    id="coligate"
                    label={!tbc?.context_user_code ? "Cod. Usuário" : ""}
                    placeholder={!!tbc?.context_user_code ? "Cod. Usuário" : ""}
                    defaultValue={tbc?.context_user_code ?? ""}
                    {...field}
                    aria-invalid={errors.context_user_code ? "true" : "false"}
                  />
                )}
              />
              {errors.context_user_code?.type === "required" && (
                <ErrorMessageLabel>{MessageRequired}</ErrorMessageLabel>
              )}
              {errors.context_user_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 100 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
          </S.WrapperInputsContextColumns>
          <S.ButtonsContainer>
            <Button
              styleType="normal"
              size="medium"
              color="white"
              labelColor="darkGrey"
              onClick={handleBack}
              type="button"
            >
              Voltar
            </Button>
            <Button
              styleType="normal"
              size="medium"
              labelColor="white"
              type="submit"
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </S.ButtonsContainer>
        </S.Form>
      </S.Wrapper>
    </Modal>
  );
};

export default forwardRef(AddTbcModal);
