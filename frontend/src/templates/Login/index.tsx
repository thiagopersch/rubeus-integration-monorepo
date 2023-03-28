import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { FormHandles } from "@unform/core";
import { toast } from "react-toastify";
import { ValidationError } from "yup";

import Base from "../Base";
import Card from "@/components/Card";
import SectionContainer from "@/components/SectionContainer";
import Heading from "@/components/Heading";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

import { signInSchema } from "./rules/schema";

import { isUrl } from "@/utils/isUrl";

import * as S from "./styles";

export type SigninFormData = {
  login: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { push, query } = useRouter();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (values: SigninFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      await signInSchema.validate(values, {
        abortEarly: false,
      });

      const callbackUrl = isUrl((query?.callbackUrl as string) || "")
        ? query?.callbackUrl
        : `${window.location.origin}${query?.callbackUrl || "/auth"}`;
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "",
      });

      if (result?.error) {
        toast.error("Usuário ou senha inválidos!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const session = await getSession({});

      // if (session?.user.changePassword) {
      //   return push(`/auth/change-password?callbackUrl=${callbackUrl}`);
      // }

      if (result?.url) {
        return push(result.url);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationError: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationError[error.path] = error.message;
          }
        });

        formRef.current?.setErrors(validationError);
      } else {
        console.log(err);
        toast.error("Não foi possível efetuar o login!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setLoading(false);
  };

  return (
    <Base>
      <S.Wrapper hasBackground={!!false}>
        <SectionContainer columns="fullwidth" marginTop="huge">
          <S.Content>
            <Heading size="md" color="primaryColor">
              Login
            </Heading>
            <S.WrapperFields>
              <S.Form onSubmit={handleSubmit} ref={formRef}>
                <TextInput name="login" label="Login" />
                <TextInput name="password" label="Senha" type="password" />
                <SectionContainer
                  paddings="none"
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    styleType="normal"
                    size="large"
                    color="primaryColor"
                    sizeLabel="xsmall"
                    labelColor="white"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </SectionContainer>
              </S.Form>
            </S.WrapperFields>
          </S.Content>
        </SectionContainer>
      </S.Wrapper>
    </Base>
  );
};

export default Login;
