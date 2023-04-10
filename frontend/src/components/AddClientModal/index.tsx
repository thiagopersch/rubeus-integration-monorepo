import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useSession } from "next-auth/react";
import { FormHandles } from "@unform/core";
import { ValidationError } from "yup";

import TextInput from "../TextInput";
import Separator from "../Separator";
import Button from "../Button";
import Modal, { ModalRef } from "../Modal";
import Checkbox from "../Checkbox";

import { useAddClientMutation } from "../../requests/mutations/clients";

import { Client } from "@/models/client";

import { addClientSchema } from "./rules/schema";

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
  const [status, setStatus] = useState(false);

  const modalRef = useRef<ModalRef>(null);
  const { data: session } = useSession();
  const mutation = useAddClientMutation(modalRef, session);

  const formRef = useRef<FormHandles>(null);

  const handleSave = useCallback(
    async (values: AddClientData) => {
      try {
        formRef.current?.setErrors({});

        /* O PROBLEMA ESTÁ AQUI */
        // await addClientSchema.validate(values, { abortEarly: false });
        console.log("chegou aqui");

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
    [mutation, refetchFn, status, session],
  );

  const handleBack = useCallback(() => {
    setClient(undefined);
    setStatus(false);
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Client) => {
    setClient(data);
    setStatus(data?.status || false);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal title="Adicionar cliente" closeOnClickOutside={false} ref={modalRef}>
      <S.Wrapper>
        <S.Form onSubmit={handleSave} ref={formRef}>
          <TextInput name="name" label="Nome do cliente" />
          <Checkbox name="status" label="Status" labelFor="Status" />
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
