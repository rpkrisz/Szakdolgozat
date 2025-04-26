import {FC, MouseEventHandler} from "react";
import {X, CircleX} from "lucide-react";

const Error: FC<{message: string; closeFunction: MouseEventHandler<HTMLButtonElement>}> = ({
  message,
  closeFunction,
}) => {
  if (!message) {
    return;
  }

  message = message.charAt(0).toUpperCase() + message.slice(1);

  return (
    <div role="alert" className="alert alert-error">
      <CircleX />
      <span>Error! {message}</span>
      <button className="btn btn-sm" onClick={closeFunction}>
        <X />
      </button>
    </div>
  );
};
export default Error;
