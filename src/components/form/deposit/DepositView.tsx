import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DepositForm } from "./DepositForm";
import { HookFormTypes } from "@/types/HookFormTypes";

type Props = {
  form: HookFormTypes;
};

export const DepositView = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit</CardTitle>
      </CardHeader>
      <DepositForm form={form} />
    </Card>
  );
};
