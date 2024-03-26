import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

import { HookFormTypes } from "@/types/HookFormTypes";

type Props = {
  form: HookFormTypes;
};

export const DepositForm = ({ form }: Props) => {
  const { register, handleSubmit, errors, onSubmit, isPending } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input
            type="number"
            min="0"
            step="0.000000000000000001"
            placeholder="0 ETH"
            {...register("amount")}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={isPending} type="submit">
          {isPending ? <Loader className="animate-spin" /> : "Send"}
        </Button>
      </CardFooter>
    </form>
  );
};
