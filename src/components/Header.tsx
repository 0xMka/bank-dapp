import Link from "next/link";

type Props = {
  title: string;
};

export const Navbar = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/">
        <h2 className="text-2xl font-bold cursor-pointer">{title}</h2>
      </Link>

      <w3m-button />
    </div>
  );
};
