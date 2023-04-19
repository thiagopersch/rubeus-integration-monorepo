import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import TextInput from "../TextInput";
import Separator from "../Separator";
import Button from "../Button";
import Modal, { ModalRef } from "../Modal";
import ErrorMessageLabel from "../ErrorMessageLabel";

import { Tbc } from "@/models/tbc";

import * as S from "./styles";
import { useAddTbcMutation } from "@/requests/mutations/tbc";
import TextComponent from "../TextComponent";
import ToggleSwitch from "../SwithToggle";

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

const AddTbcModal: ForwardRefRenderFunction<TbcModalRef, AddTbcModalProps> = (
  { refetchFn },
  ref,
) => {
  const [tbc, setTbc] = useState<Tbc>();

  const {
    /* register, */
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTbcData>();

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();
  const mutation = useAddTbcMutation(modalRef, session);

  const onSubmit: SubmitHandler<AddTbcData> = useCallback(
    async (values: AddTbcData) => {
      const isEditing = !!tbc?.id;
      await mutation.mutateAsync({
        id: tbc?.id,
        ...values,
        isEditing,
      });
      refetchFn && refetchFn();
    },
    [mutation, tbc, refetchFn, session],
  );

  const handleBack = useCallback(() => {
    setTbc(undefined);
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Tbc) => {
    setTbc(data);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal
      title={tbc ? `Editando o TBC: ${tbc?.name}` : "Adicionar TBC"}
      closeOnClickOutside={false}
      ref={modalRef}
      height="normal"
      width="normal"
    >
      <S.Wrapper>
        <TextComponent
          color="primaryGrey"
          textAlign="left"
          size="small"
          weight="bold"
        >
          Configurações TOTVS Business Connect
        </TextComponent>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperInputs>
            <Controller
              name="name"
              control={control}
              defaultValue={tbc?.name}
              rules={{ required: true, maxLength: 255 }}
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
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
          </S.WrapperInputs>
          <S.WrapperInputsThreeColumns>
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
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
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
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
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
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
          </S.WrapperInputsThreeColumns>
          <S.WrapperInputs>
            <ToggleSwitch
              key="metodoSemLicenca"
              children="Utiliza métodos sem licença"
            />
          </S.WrapperInputs>
          <S.WrapperTextContext>
            <TextComponent color="lightGrey" size="small" textAlign="left">
              Contexto
            </TextComponent>
          </S.WrapperTextContext>
          <S.WrapperInputsContextColumnsOne>
            <TextInput type="text" name="coligate" label="Código da Coligada" />
            <TextInput type="text" name="branch" label="Código da filial" />
            <TextInput
              type="text"
              name="teachingLevel"
              label="Nível de ensino"
            />
          </S.WrapperInputsContextColumnsOne>
          <S.WrapperInputsContextColumnsTwo>
            <TextInput
              type="text"
              name="codSistema"
              label="Código do sistema"
            />
            <TextInput type="text" name="userContext" label="Usuário" />
          </S.WrapperInputsContextColumnsTwo>
          <S.WrapperSeparator>
            <Separator />
          </S.WrapperSeparator>
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
            >
              Salvar
            </Button>
          </S.ButtonsContainer>
        </S.Form>
      </S.Wrapper>
    </Modal>
  );
};

export default forwardRef(AddTbcModal);
