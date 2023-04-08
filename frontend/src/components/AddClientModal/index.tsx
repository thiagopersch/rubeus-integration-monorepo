import {
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useState,
  useRef,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { FormHandles } from "@unform/core";
import { ValidationError } from "yup";

import { useAddClientMutation } from "../../requests/mutations/clients";
import { addClientSchema } from "./rules/schema";

import { Client } from "@/models/client";

import * as S from "./styles";
import TextInput from "../TextInput";
import Separator from "../Separator";
import Button from "../Button";
import Modal, { ModalRef } from "../Modal";

export type ClientModalRef = {
  openModal: (client?: Client) => void;
};

type AddClientModalProps = {
  refetchFn?: () => void;
};

type AddClientData = {
  name: string;
};

const AddClientModal: ForwardRefRenderFunction<
  ClientModalRef,
  AddClientModalProps
> = ({ refetchFn }, ref) => {
  const [client, setClient] = useState<Client>();

  const modalRef = useRef<ModalRef>(null);
  const { data: session } = useSession();
  const mutation = useAddClientMutation(modalRef, session);

  const formRef = useRef<FormHandles>(null);

  const handleSave = useCallback(
    async (values: AddClientData) => {
      try {
        formRef.current?.setErrors({});

        await addClientSchema.validate(values, { abortEarly: false });

        await mutation.mutateAsync({
          id: client?.id,
          ...values,
        });
        refetchFn && refetchFn();
      } catch (err) {
        if (err instanceof ValidationError) {
          const validationErrors: Record<string, string> = {};

          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });

          formRef.current?.setErrors(validationErrors);
        }
      }
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
        <S.Form onSubmit={handleSave} ref={formRef} initialData={client}>
          <TextInput name="name" label="Nome do cliente" />
          <Separator />
          <S.ButtonsContainer>
            <Button
              type="button"
              styleType="normal"
              size="medium"
              color="white"
              labelColor="darkGrey"
              onClick={handleBack}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              styleType="normal"
              size="medium"
              labelColor="white"
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
