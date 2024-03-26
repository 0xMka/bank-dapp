import { formatEther } from "viem";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AlertTriangleIcon } from "lucide-react";

type Props = {
  events: any;
};

export const Events = ({ events }: Props) => {
  const shortenAddress = (address: string) => {
    if (!address) return "";
    const prefix = address.slice(0, 4);
    const suffix = address.slice(-6);
    return `${prefix}...${suffix}`;
  };

  return (
    <>
      {events.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>The list of the last 5 transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>EVENT NAME</TableHead>
                  <TableHead>ADDRESS</TableHead>
                  <TableHead className="text-right">AMOUNT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event: any) => {
                  return (
                    <TableRow key={crypto.randomUUID()}>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{shortenAddress(event.address)}</TableCell>
                      <TableCell className="text-right text-nowrap">
                        {formatEther(event.amount.toString())} ETH
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex items-center justify-center">
            <AlertTriangleIcon />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            No events.
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      )}
    </>
  );
};
