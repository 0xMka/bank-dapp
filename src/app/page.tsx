"use client";
import { Bank } from "@/components/Bank";
import { NotConnected } from "@/components/NotConnected";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <div className="flex items-center justify-center">
      {isConnected ? (
        <Bank />
      ) : (
        <div className="mt-32 p-4">
          <NotConnected />
        </div>
      )}
    </div>
  );
}
