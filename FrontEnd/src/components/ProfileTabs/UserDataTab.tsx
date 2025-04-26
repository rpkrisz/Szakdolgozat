import {FrontendUser} from "@/types";
import {FC, useEffect, useState} from "react";
import {useUpdateUser} from "@/services";
import {TextInput} from "../Inputs";
import {handleModalFormChange} from "@/utils/";
import {SaveIcon} from "lucide-react";

const UserDataTab: FC<{userData: FrontendUser}> = ({userData}) => {
  const [form, setForm] = useState(userData);
  const [updateUser] = useUpdateUser();

  useEffect(() => {
    setForm(userData);
  }, [userData]);

  const sendForm = async () => {
    if (Object.values(form).some(value => !value)) return console.error("All fields are required!");
    try {
      await updateUser(form as FrontendUser);
    } catch (error) {
      console.error("User saving faild!");
    }
    setForm({...form});
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          <tr>
            <th>First name</th>
            <td>
              <TextInput
                label=""
                name="firstName"
                handleChange={e => handleModalFormChange(e, form, setForm)}
                inputData={form.firstName}
                required={true}
              />
            </td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>
              <TextInput
                label=""
                name="lastName"
                handleChange={e => handleModalFormChange(e, form, setForm)}
                inputData={form.lastName}
                required={true}
              />
            </td>
          </tr>
          <tr>
            <th>Nick name</th>
            <td>
              <TextInput
                label=""
                name="nickName"
                handleChange={e => handleModalFormChange(e, form, setForm)}
                inputData={form.nickName}
                required={true}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <TextInput
                label=""
                name="email"
                handleChange={e => handleModalFormChange(e, form, setForm)}
                inputData={form.email}
                required={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end items-center">
        <button className="btn btn-primary" onClick={sendForm}>
          Save <SaveIcon />
        </button>
      </div>
    </div>
  );
};

export default UserDataTab;
