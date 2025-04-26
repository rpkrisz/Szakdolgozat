import {useRegister} from "@/services";
import {TextInput} from "@/components/Inputs";
import {handleModalFormChange} from "@/utils/";
import {RegisterData} from "@/types";
import {MouseEvent, useState} from "react";
import {Link} from "react-router-dom";
import navigateRoutes from "@/NavigationRoutes";

const Register = () => {
  const [form, setForm] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const {mutate} = useRegister();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    mutate({...form});
  };

  return (
    <form className="card text-base-content bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="font-bold text-lg">Register now!</h3>
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-2">
          <TextInput
            name="firstName"
            label="First name"
            inputData={form.firstName}
            handleChange={e => handleModalFormChange(e, form, setForm)}
          />
          <TextInput
            name="lastName"
            label="Last name"
            inputData={form.lastName}
            handleChange={e => handleModalFormChange(e, form, setForm)}
          />
          <TextInput
            name="nickName"
            label="Nick name"
            inputData={form.nickName}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            className="md:col-span-2"
          />
          <TextInput
            name="email"
            label="Email"
            inputData={form.email}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            className="md:col-span-2"
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            inputData={form.password}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            className="md:col-span-2"
          />
          <TextInput
            name="passwordConfirmation"
            type="password"
            label="Confirm Password"
            inputData={form.passwordConfirmation}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            className="md:col-span-2"
          />
        </div>
        <div className="mt-4 flex gap-5 items-center justify-end">
          <Link to={navigateRoutes.loginPage} className="btn btn-primary">
            Log in!
          </Link>
          <button className="btn btn-accent" onClick={e => handleSubmit(e)}>
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
