import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { WithdrawForm } from "./WithdrawForm";
import { HookFormTypes } from "@/types/HookFormTypes";

type Props = {
  form: HookFormTypes;
};

export const WithdrawView = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw</CardTitle>
      </CardHeader>
      <WithdrawForm form={form} />
    </Card>
  );
};
