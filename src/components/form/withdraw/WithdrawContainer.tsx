"use client";
import { toast } from "sonner";

import { WithdrawForm, WithdrawSchema } from "@/types/BankTypes";
import { WithdrawView } from "./WithdrawView";

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

export const WithdrawContainer = ({ refetch, getEvents }: Props) => {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(WithdrawSchema) });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdraw = (amount: string) => {
    writeContract({
      address: bankContractAddress,
      abi,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
  };

  const onSubmit: SubmitHandler<WithdrawForm> = async (formData) => {
    const { amount } = formData;
    console.log(formData);
    await withdraw(amount);
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
      toast.success("The withdrawal was successfully completed.");
    }
  }, [isLoading, isSuccess]);
  return (
    <WithdrawView
      form={{ register, handleSubmit, errors, onSubmit, isPending }}
    />
  );
};
