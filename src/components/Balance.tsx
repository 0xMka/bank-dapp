import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader } from "lucide-react";

import { formatEther } from "viem";

type Props = {
  isPending: boolean;
  balanceOfUser: any;
};

export const Balance = ({ isPending, balanceOfUser }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        {isPending ? (
          <Loader className="animate-spin" />
        ) : (
          <span className="text-xl">
            {formatEther(balanceOfUser.toString())} ETH
          </span>
        )}
      </CardContent>
    </Card>
  );
};
