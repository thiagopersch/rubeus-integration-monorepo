import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useResetAtom } from "jotai/utils";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import { ModalRef } from "@/components/Modal";
import SectionContainer from "@/components/SectionContainer";
import TextInput from "@/components/TextInput";
import Base from "../Base";

import { Sentence } from "@/models/sentence";

import { basicSentenceData } from "@/store/create-sentence";

import { useAddSentenceMutation } from "@/requests/mutations/sentence";
import { useListSentenceCategory } from "@/requests/queries/sentenceCategory";

import * as S from "./styles";
import ErrorMessageLabel from "@/components/ErrorMessageLabel";
import Select from "@/components/Select";

type AddSentencData = {
  id: string;
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
};

const CreateSentence = () => {
  const [sentence, setSentence] = useState<Sentence>();
  /* const [status, setStatus] = useState(false); */
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddSentencData>({
    defaultValues: {
      sentence_category_id: sentence?.sentence_category_id,
      code: sentence?.code,
      name: sentence?.name,
      coligate: sentence?.coligate,
      system_code: sentence?.system_code,
      content: sentence?.content,
    },
  });

  const { data: session } = useSession();
  const { data: sentences } = useListSentenceCategory(session);
  const modalRef = useRef<ModalRef>(null);

  const mutation = useAddSentenceMutation(modalRef, session);
  const resetForm = useResetAtom(basicSentenceData);

  const { push } = useRouter();

  const sentenceCategory = useMemo(() => {
    if (!sentences) return [];

    return sentences.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [sentences]);

  const onSubmit: SubmitHandler<AddSentencData> = useCallback(
    async (data: AddSentencData) => {
      try {
        setSaving(true);
        await mutation.mutateAsync({
          id: sentence?.id,
          sentence_category_id: data.sentence_category_id,
          code: data.code,
          name: data.name,
          coligate: data.coligate,
          system_code: data.system_code,
          content: data.content,
        });
      } catch (error) {
        console.error(error);
      }
      await push("/sentences");
      setSaving(false);
      resetForm();
    },
    [mutation, session],
  );

  return (
    <Base>
      <SectionContainer paddings="xsmall">
        <Card>
          <SectionContainer justifyContent="center">
            <Heading size="md">Cadastrar consulta</Heading>
          </SectionContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.WrapperTwoInputs>
              <S.WrapperInputs>
                <Controller
                  name="sentence_category_id"
                  control={control}
                  defaultValue={sentence?.sentence_category_id}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      label="Categoria"
                      {...field}
                      options={sentenceCategory}
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
              <S.WrapperInputs>
                <Controller
                  name="code"
                  control={control}
                  defaultValue={sentence?.code ?? ""}
                  rules={{ required: true, maxLength: 10 }}
                  render={({ field }) => (
                    <TextInput
                      id="code"
                      label="Código"
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
                    Ultrapassou o limite de 10 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInputs>
              <S.WrapperInputs>
                <Controller
                  name="coligate"
                  control={control}
                  defaultValue={sentence?.coligate ?? ""}
                  rules={{ required: true, maxLength: 10 }}
                  render={({ field }) => (
                    <TextInput
                      id="coligate"
                      label="Coligada"
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
                    Ultrapassou o limite de 10 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInputs>
              <S.WrapperInputs>
                <Controller
                  name="system_code"
                  control={control}
                  defaultValue={sentence?.system_code ?? ""}
                  rules={{ required: true, maxLength: 10 }}
                  render={({ field }) => (
                    <TextInput
                      id="system_code"
                      label="Sistema"
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
                    Ultrapassou o limite de 10 caracteres.
                  </ErrorMessageLabel>
                )}
              </S.WrapperInputs>
            </S.WrapperTwoInputs>
            <S.WrapperTwoInputs>
              <S.WrapperInputs>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={sentence?.name ?? ""}
                  rules={{ required: true, maxLength: 255 }}
                  render={({ field }) => (
                    <TextInput
                      id="name"
                      label="Nome"
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
            </S.WrapperTwoInputs>
            <S.WrapperSentence>
              <CodeMirror
                id="content"
                value={sentence?.content ?? ""}
                defaultValue={sentence?.content ?? ""}
                placeholder={sentence?.content ?? "Add your SQL query here!"}
                height="40rem"
                theme={"dark"}
                style={{ fontSize: "12px" }}
                extensions={[langs.sql()]}
                aria-invalid={errors.content ? "true" : "false"}
              />
            </S.WrapperSentence>
            <S.WrapperCTA>
              <Button
                size="medium"
                color="white"
                labelColor="darkGrey"
                type="reset"
              >
                Cancelar
              </Button>
              <Button
                size="medium"
                labelColor="white"
                disabled={saving}
                type="submit"
              >
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </S.WrapperCTA>
          </form>
        </Card>
      </SectionContainer>
    </Base>
  );
};

export default CreateSentence;
