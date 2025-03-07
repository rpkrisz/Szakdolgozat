import {FC, MouseEventHandler} from "react";
import {X, CircleCheck} from "lucide-react";

const Succes: FC<{message: string; closeFunction: MouseEventHandler<HTMLButtonElement>}> = ({
  message,
  closeFunction,
}) => {
  message = message.charAt(0).toUpperCase() + message.slice(1);

  return (
    <div role="alert" className="alert alert-success">
      <CircleCheck />
      <span>Succes! {message}</span>
      <button className="btn btn-sm" onClick={closeFunction}>
        <X />
      </button>
    </div>
  );
};
export default Succes;
