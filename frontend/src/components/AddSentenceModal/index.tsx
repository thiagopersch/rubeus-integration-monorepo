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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";

import Button from "../Button";
import ErrorMessageLabel from "../ErrorMessageLabel";
import Modal, { ModalRef } from "../Modal";
import Select from "../Select";
import TextInput from "../TextInput";

import { Sentence } from "@/models/sentence";

import { useAddSentenceMutation } from "@/requests/mutations/sentence";
import { useListSentenceCategory } from "@/requests/queries/sentenceCategory";

import * as S from "./styles";

export type SentenceModalRef = {
  openModal: (sentence?: Sentence) => void;
};

type AddSentenceData = {
  sentence_category_id: string;
  sentence_category_name: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
};

const AddSentenceModal: ForwardRefRenderFunction<SentenceModalRef> = (
  _,
  ref,
) => {
  const [sentence, setSentence] = useState<Sentence>();
  const [saving, setSaving] = useState(false);

  const modalRef = useRef<ModalRef>(null);

  const { data: session } = useSession();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddSentenceData>({
    defaultValues: {
      sentence_category_id: sentence?.sentence_category_id,
      code: sentence?.code,
      coligate: sentence?.coligate,
      system_code: sentence?.system_code,
      name: sentence?.name,
      content: sentence?.content,
    },
  });

  const mutation = useAddSentenceMutation(modalRef, session);
  const { data: sentenceCategories } = useListSentenceCategory(session);

  const sentenceCategory = useMemo(() => {
    if (!sentenceCategories) return [];

    return sentenceCategories.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [sentenceCategories]);

  const onSubmit: SubmitHandler<AddSentenceData> = useCallback(
    async (values: AddSentenceData) => {
      setSaving(true);

      await mutation.mutateAsync({
        id: sentence?.id,
        sentence_category_id: values?.sentence_category_id,
        code: values?.code,
        coligate: values?.coligate,
        system_code: values?.system_code,
        name: values?.name,
        content: values?.content,
      });

      setSaving(false);
    },
    [mutation, sentence, session],
  );

  const handleBack = useCallback(() => {
    setSentence(undefined);
    reset();
    modalRef.current?.closeModal();
  }, []);

  const openModal = useCallback((data?: Sentence) => {
    setSentence(data);
    modalRef.current?.openModal();
  }, []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal
      title={
        sentence
          ? `Editando a consulta: ${sentence?.code} - ${sentence?.name}`
          : "Adicionar consulta"
      }
      closeOnClickOutside={false}
      ref={modalRef}
      height="auto"
      width="huge"
    >
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.WrapperInputsRow>
            {!sentence?.sentence_category_id ? (
              <S.WrapperInputs>
                <Controller
                  key="sentence_category_id"
                  name="sentence_category_id"
                  control={control}
                  defaultValue={sentence?.sentence_category_id}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      key="sentence_category_id"
                      id="sentence_category_id"
                      label="Categoria"
                      {...field}
                      options={sentenceCategory}
                      defaultValue={sentence?.sentence_category_id}
                      aria-invalid={
                        errors.sentence_category_id ? "true" : "false"
                      }
                    />
                  )}
                />
                {errors.sentence_category_id?.type === "required" && (
                  <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
                )}
              </S.WrapperInputs>
            ) : undefined}
            <S.WrapperInputs>
              <Controller
                key="code"
                name="code"
                control={control}
                defaultValue={sentence?.code ?? ""}
                rules={{ required: true, maxLength: 30 }}
                render={({ field }) => (
                  <TextInput
                    id="code"
                    label={!sentence?.code ? "Código" : ""}
                    placeholder={!!sentence?.code ? "Código" : ""}
                    {...field}
                    defaultValue={sentence?.code ?? ""}
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                )}
              />
              {errors.code?.type === "required" && (
                <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
              )}
              {errors.code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 30 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                key="coligate"
                name="coligate"
                control={control}
                defaultValue={sentence?.coligate ?? ""}
                rules={{ required: true, maxLength: 5 }}
                render={({ field }) => (
                  <TextInput
                    id="coligate"
                    label={!sentence?.coligate ? "Coligada" : ""}
                    placeholder={!!sentence?.coligate ? "Coligada" : ""}
                    {...field}
                    defaultValue={sentence?.coligate ?? ""}
                    aria-invalid={errors.coligate ? "true" : "false"}
                  />
                )}
              />
              {errors.coligate?.type === "required" && (
                <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
              )}
              {errors.coligate?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 5 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
            <S.WrapperInputs>
              <Controller
                key="system_code"
                name="system_code"
                control={control}
                defaultValue={sentence?.system_code ?? ""}
                rules={{ required: true, maxLength: 5 }}
                render={({ field }) => (
                  <TextInput
                    id="system_code"
                    label={!sentence?.system_code ? "Sistema" : ""}
                    placeholder={!!sentence?.system_code ? "Sistema" : ""}
                    {...field}
                    defaultValue={sentence?.system_code ?? ""}
                    aria-invalid={errors.system_code ? "true" : "false"}
                  />
                )}
              />
              {errors.system_code?.type === "required" && (
                <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
              )}
              {errors.system_code?.type === "maxLength" && (
                <ErrorMessageLabel>
                  Ultrapassou o limite de 5 caracteres.
                </ErrorMessageLabel>
              )}
            </S.WrapperInputs>
          </S.WrapperInputsRow>
          <S.WrapperInputs>
            <Controller
              key="name"
              name="name"
              control={control}
              defaultValue={sentence?.name ?? ""}
              rules={{ required: true, maxLength: 255 }}
              render={({ field }) => (
                <TextInput
                  id="name"
                  label={!sentence?.name ? "Nome" : ""}
                  placeholder={!!sentence?.name ? "Nome" : ""}
                  {...field}
                  defaultValue={sentence?.name ?? ""}
                  aria-invalid={errors.name ? "true" : "false"}
                />
              )}
            />
            {errors.name?.type === "required" && (
              <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
            )}
            {errors.name?.type === "maxLength" && (
              <ErrorMessageLabel>
                Ultrapassou o limite de 255 caracteres.
              </ErrorMessageLabel>
            )}
          </S.WrapperInputs>
          <S.WrapperSentence>
            <Controller
              name="content"
              control={control}
              defaultValue={sentence?.content ?? "-- Add your SQL query here!"}
              rules={{ required: true }}
              render={({ field }) => (
                <CodeMirror
                  id="content"
                  defaultValue={
                    sentence?.content ?? "-- Add your SQL query here!"
                  }
                  placeholder={
                    sentence?.content ?? "-- Add your SQL query here!"
                  }
                  height="40rem"
                  width="100%"
                  theme={"dark"}
                  style={{ fontSize: "12px" }}
                  extensions={[langs.sql()]}
                  {...field}
                  aria-invalid={errors.content ? "true" : "false"}
                />
              )}
            />
            {errors.content?.type === "required" && (
              <ErrorMessageLabel>Campo obrigatório.</ErrorMessageLabel>
            )}
          </S.WrapperSentence>
          <S.ButtonsContainer>
            <Button
              styleType="normal"
              size="medium"
              color="white"
              labelColor="primaryColor"
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

export default forwardRef(AddSentenceModal);
