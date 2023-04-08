import * as Yup from "yup";

export const addClientSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório."),
  // index: Yup.number().required('Campo obrigatório'),
});
