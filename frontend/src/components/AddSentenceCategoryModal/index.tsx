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

import { SentenceCategory } from "@/models/sentenceCategory";

import { useAddSentenceCategoryMutation } from "@/requests/mutations/sentenceCategory";

import * as S from "./styles";

export type SentenceCategoryModalRef = {
  openModal: (sentenceCategory?: SentenceCategory) => void;
};

type AddSentenceCategoryProps = {
  refetchFn: () => void;
};

type AddSentenceCategoryData = {
  name: string;
  description: string;
  status: boolean;
};

const AddSentenceCategoryModal: ForwardRefRenderFunction<
  SentenceCategoryModalRef,
  AddSentenceCategoryProps
> = ({ refetchFn }, ref) => {
  const [sentenceCategory, setSentenceCategory] = useState<SentenceCategory>();
  const [status, setStatus] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddSentenceCategoryData>({
    defaultValues: {
      name: sentenceCategory?.name,
      description: sentenceCategory?.description,
      status: sentenceCategory?.status,
    },
  });

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();
  const mutation = useAddSentenceCategoryMutation(modalRef, session);

  const onSubmit: SubmitHandler<AddSentenceCategoryData> = useCallback(
    async (values: AddSentenceCategoryData) => {
      setSaving(true);

      await mutation.mutateAsync({
        id: sentenceCategory?.id,
        name: values.name,
        description: values.description,
        status: status,
      });

      refetchFn && refetchFn();

      setSaving(false);
    },
    [mutation, sentenceCategory, status, refetchFn, session],
  );

  const handleBack = useCallback(() => {
    setSentenceCategory(undefined);
    setStatus(false);
    reset();
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: SentenceCategory) => {
    setSentenceCategory(data);
    setStatus(data?.status || false);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal
      title={
        sentenceCategory
          ? `Editando a categoria: ${sentenceCategory?.name}`
          : "Adicionar categoria"
      }
      closeOnClickOutside={false}
      ref={modalRef}
    >
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperInputs>
            <Checkbox
              id="status"
              label="Situação"
              labelFor="Situação"
              isChecked={status}
              onCheck={setStatus}
              onChange={() => setStatus}
              aria-invalid={errors.status ? true : false}
            />
          </S.WrapperInputs>
          <S.WrapperInputs>
            <Controller
              name="name"
              control={control}
              defaultValue={sentenceCategory?.name ?? ""}
              rules={{ required: true, maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  id="name"
                  label={!sentenceCategory?.name ? "Nome" : ""}
                  placeholder={!!sentenceCategory?.name ? "Nome" : ""}
                  {...field}
                  defaultValue={sentenceCategory?.name ?? ""}
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
              name="description"
              control={control}
              defaultValue={sentenceCategory?.description ?? ""}
              rules={{ maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  id="description"
                  as="textarea"
                  cols={5}
                  rows={5}
                  label={!sentenceCategory?.description ? "Descrição" : ""}
                  placeholder={
                    !!sentenceCategory?.description ? "Descrição" : ""
                  }
                  {...field}
                  defaultValue={sentenceCategory?.description ?? ""}
                  aria-invalid={errors.description ? "true" : "false"}
                />
              )}
            />
            {errors.description?.type === "maxLength" && (
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

export default forwardRef(AddSentenceCategoryModal);
