"use client";
import { toast } from "sonner";

import { DepositForm, DepositSchema } from "@/types/BankTypes";
import { DepositView } from "./DepositView";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi, bankContractAddress } from "@/constant/BankContract";
import { useEffect } from "react";

type Props = {
  refetch: () => {};
  getEvents: any;
};

export const DepositContainer = ({ refetch, getEvents }: Props) => {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(DepositSchema) });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const deposit = (amount: string) => {
    writeContract({
      address: bankContractAddress,
      abi,
      functionName: "deposit",
      value: parseEther(amount),
    });
  };

  const onSubmit: SubmitHandler<DepositForm> = async (formData) => {
    const { amount } = formData;
    console.log(formData);
    await deposit(amount);
    reset();
  };

  useEffect(() => {
    if (isLoading) {
      toast.success(hash, {
        action: {
          label: "Tx",
          onClick: () =>
            window.open(`https://sepolia.etherscan.io/tx/${hash}`, "_blank"),
        },
      });
    }
    if (isSuccess) {
      refetch();
      getEvents();
      toast.success("The deposit has been made.");
    }
  }, [isLoading, isSuccess]);

  return (
    <DepositView
      form={{ register, handleSubmit, errors, onSubmit, isPending }}
    />
  );
};
