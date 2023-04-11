import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

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
};

const AddClientModal: ForwardRefRenderFunction<
  ClientModalRef,
  AddClientModalProps
> = ({ refetchFn }, ref) => {
  const [client, setClient] = useState<Client>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddClientData>({
    defaultValues: { name: "" },
  });

  const modalRef = useRef<ModalRef>(null);
  const { data: session } = useSession();
  const mutation = useAddClientMutation(modalRef, session);

  const onSubmit: SubmitHandler<AddClientData> = useCallback(
    async (values: AddClientData) => {
      await mutation.mutateAsync({
        id: client?.id,
        ...values,
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
    <Modal title="Adicionar cliente" closeOnClickOutside={false} ref={modalRef}>
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperInputs>
            <TextInput
              label="Nome do cliente"
              {...register("name", { required: true, maxLength: 255 })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <ErrorMessageLabel>Name é obrigatório.</ErrorMessageLabel>
            )}
            {errors.name?.type === "maxLength" && (
              <ErrorMessageLabel>
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
          </S.WrapperInputs>
          <Separator />
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
