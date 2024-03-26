type Props = {
  name: string;
};

export const Footer = ({ name }: Props) => {
  return (
    <p className="flex items-center justify-center gap-1">
      Made with <span className="text-pink-600 text-xl">&hearts;</span>
      {name}
    </p>
  );
};
