import {FC, ReactNode} from "react";

const CardElement: FC<{
  title: string;
  text: string | number;
  icon: ReactNode;
}> = ({title, text, icon}) => {
  return (
    <div className="flex flex-col justify-start">
      <h3 className="flex text-lg xl:text-xl items-center mb-1 font-semibold">
        {icon}
        {title}
      </h3>
      <p className="xl:text-base pl-4 lg:pl-5 xl:pl-6">{text}</p>
    </div>
  );
};

export default CardElement;
