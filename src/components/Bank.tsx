"use client";
import { useEffect, useState } from "react";

import { Balance } from "@/components/Balance";
import { DepositContainer } from "@/components/form/deposit/DepositContainer";
import { WithdrawContainer } from "@/components/form/withdraw/WithdrawContainer";
import { Events } from "./Events";

import { abi, bankContractAddress } from "@/constant/BankContract";
import { publicClient } from "@/utils/client";

import { useAccount, useReadContract } from "wagmi";
import { parseAbiItem } from "viem";

export const Bank = () => {
  const { address } = useAccount();
  const [events, setEvents] = useState<any>([]);

  const {
    data: balanceOfUser,
    isPending,
    refetch,
  } = useReadContract({
    abi: abi,
    address: bankContractAddress,
    functionName: "getBalance",
    account: address,
  });

  const getEvents = async () => {
    const depositEvents = await publicClient.getLogs({
      address: bankContractAddress,
      event: parseAbiItem(
        "event etherDeposited(address indexed account, uint amount)"
      ),
      fromBlock: "earliest",
    });

    const withdrawEvents = await publicClient.getLogs({
      address: bankContractAddress,
      event: parseAbiItem(
        "event etherWithdrawed(address indexed account, uint amount)"
      ),
      fromBlock: "earliest",
    });

    const combinedEvents = depositEvents
      .map((event) => ({
        type: "Deposit",
        address: event.args.account,
        amount: event.args.amount,
        blockNumber: Number(event.blockNumber),
      }))
      .concat(
        withdrawEvents.map((event) => ({
          type: "Withdraw",
          address: event.args.account,
          amount: event.args.amount,
          blockNumber: Number(event.blockNumber),
        }))
      );

    combinedEvents.sort(function (a, b) {
      return b.blockNumber - a.blockNumber;
    });

    setEvents(combinedEvents.slice(0, 5));
  };

  useEffect(() => {
    const getAllEvents = async () => {
      if (address !== undefined) {
        await getEvents();
      }
    };
    getAllEvents();
  }, [address]);

  return (
    <div className="flex flex-col gap-8 p-4">
      <Balance isPending={isPending} balanceOfUser={balanceOfUser} />
      <div className="flex flex-row gap-8">
        <DepositContainer refetch={refetch} getEvents={getEvents} />
        <WithdrawContainer refetch={refetch} getEvents={getEvents} />
      </div>
      <Events events={events} />
    </div>
  );
};
