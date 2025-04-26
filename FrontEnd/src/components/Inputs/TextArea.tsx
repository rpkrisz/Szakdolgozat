import {ChangeEvent, FC} from "react";

const TextArea: FC<{
  name: string;
  label: string;
  inputData: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}> = ({name, label, inputData, handleChange, placeholder, required = false, className}) => {
  return (
    <label className={`form-control justify-start flex-grow ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <textarea
        name={name}
        className="textarea textarea-bordered  w-full text-base-content"
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handleChange(e)}
        required={required}
      ></textarea>
    </label>
  );
};
export default TextArea;
