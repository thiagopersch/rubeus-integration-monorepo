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
  link_crm: string;
  status: boolean;
};

const AddClientModal: ForwardRefRenderFunction<
  ClientModalRef,
  AddClientModalProps
> = ({ refetchFn }, ref) => {
  const [client, setClient] = useState<Client>();
  const [status, setStatus] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddClientData>({
    defaultValues: {
      name: client?.name,
      link_crm: client?.link_crm,
      status: client?.status,
    },
  });

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();
  const mutation = useAddClientMutation(modalRef, session);

  const onSubmit: SubmitHandler<AddClientData> = useCallback(
    async (values: AddClientData) => {
      setSaving(true);

      await mutation.mutateAsync({
        id: client?.id,
        name: values.name,
        link_crm: values.link_crm,
        status: status,
      });

      refetchFn && refetchFn();

      setSaving(false);
    },
    [mutation, client, status, refetchFn, session],
  );

  const handleBack = useCallback(() => {
    setClient(undefined);
    setStatus(false);
    reset();
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Client) => {
    setClient(data);
    setStatus(data?.status || false);
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
              defaultValue={client?.name ?? ""}
              rules={{ required: true, maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  id="name"
                  label={!client?.name ? "Nome do cliente" : ""}
                  placeholder={!!client?.name ? "Nome do cliente" : ""}
                  {...field}
                  defaultValue={client?.name ?? ""}
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
          <S.WrapperInputs>
            <Controller
              name="link_crm"
              control={control}
              defaultValue={client?.link_crm ?? ""}
              rules={{ required: true, maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  id="link_crm"
                  label={!client?.link_crm ? "Link do CRM" : ""}
                  placeholder={!!client?.link_crm ? "Link do CRM" : ""}
                  defaultValue={client?.link_crm ?? ""}
                  {...field}
                  aria-invalid={errors.link_crm ? "true" : "false"}
                />
              )}
            />
            {errors.link_crm?.type === "required" && (
              <ErrorMessageLabel>Link do CRM é obrigatório.</ErrorMessageLabel>
            )}
            {errors.link_crm?.type === "maxLength" && (
              <ErrorMessageLabel>
                Ultrapassou o limite do nome de 255 caracteres.
              </ErrorMessageLabel>
            )}
          </S.WrapperInputs>
          <S.WrapperInputs>
            <Checkbox
              id="status"
              label={status ? "Ativado" : "Desativado"}
              labelFor={status ? "Ativado" : "Desativado"}
              isChecked={status}
              onCheck={setStatus}
              onChange={() => setStatus}
            />
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

export default forwardRef(AddClientModal);
