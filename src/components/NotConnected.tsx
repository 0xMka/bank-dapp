import { AlertTriangleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export const NotConnected = () => {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <AlertTriangleIcon />
      </CardHeader>
      <CardContent>Please connect your wallet.</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
