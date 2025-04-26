import {useLogin} from "@/services";
import {TextInput} from "@/components/Inputs";
import {handleModalFormChange} from "@/utils/";
import {useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {mutate} = useLogin();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({...form});
  };

  return (
    <form className="card text-base-content bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="font-bold text-lg">Login now!</h3>
        <div className="flex flex-col">
          <TextInput
            name="email"
            label="Email"
            inputData={form.email}
            handleChange={e => handleModalFormChange(e, form, setForm)}
          />

          <TextInput
            name="password"
            type="password"
            label="Password"
            inputData={form.password}
            handleChange={e => handleModalFormChange(e, form, setForm)}
          />
        </div>

        <div className="mt-4 flex gap-5 items-center justify-end">
          <Link to={"/register"} className="btn btn-primary">
            Register now!
          </Link>
          <button className="btn btn-accent" onClick={e => handleLogin(e)}>
            Log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
