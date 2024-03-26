import * as yup from "yup";

export const DepositSchema = yup.object({
  amount: yup.string().required(),
});

export type DepositForm = yup.InferType<typeof DepositSchema>;

export const WithdrawSchema = yup.object({
  amount: yup.string().required(),
});

export type WithdrawForm = yup.InferType<typeof WithdrawSchema>;
