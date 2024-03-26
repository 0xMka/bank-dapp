import { Navbar } from "./Header";
import { Footer } from "./Footer";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar title="BankDapp" />
      {children}
      <Footer name="0xMka" />
    </>
  );
};
