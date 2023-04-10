import * as Yup from "yup";

export const addClientSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório.").trim(),
  status: Yup.string(),
  // index: Yup.number().required('Campo obrigatório'),
});
