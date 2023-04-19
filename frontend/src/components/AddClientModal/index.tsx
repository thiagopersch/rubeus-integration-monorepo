import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  SetStateAction,
} from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import TextInput from "../TextInput";
import Separator from "../Separator";
import Button from "../Button";
import Modal, { ModalRef } from "../Modal";
import Checkbox from "../Checkbox";
import ErrorMessageLabel from "../ErrorMessageLabel";

import { useAddClientMutation } from "../../requests/mutations/clients";

import { Client } from "@/models/client";

import * as S from "./styles";

export type ClientModalRef = {
  openModal: (client?: Client) => void;
};

type AddClientModalProps = {
  refetchFn: () => void;
};

type AddClientData = {
  name: string;
  status: boolean;
};

const AddClientModal: ForwardRefRenderFunction<
  ClientModalRef,
  AddClientModalProps
> = ({ refetchFn }, ref) => {
  const [client, setClient] = useState<Client>();

  const {
    /* register, */
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddClientData>();

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();
  const mutation = useAddClientMutation(modalRef, session);

  const onSubmit: SubmitHandler<AddClientData> = useCallback(
    async (values: AddClientData) => {
      const isEditing = !!client?.id;
      await mutation.mutateAsync({
        id: client?.id,
        name: values.name,
        status: values.status,
        isEditing,
      });
      refetchFn && refetchFn();
    },
    [mutation, client, refetchFn, session],
  );

  const handleBack = useCallback(() => {
    setClient(undefined);
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Client) => {
    setClient(data);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal
      title={client ? `Editando cliente: ${client?.name}` : "Adicionar cliente"}
      closeOnClickOutside={false}
      ref={modalRef}
    >
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperInputs>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  label="Nome do cliente"
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

export default forwardRef(AddClientModal);
