import {FC, useState} from "react";
// import {useToggle} from "react-use";
// import {Succes, Error} from "@/components/Feedbacks";
// import {TextInput, NumberInput, DateInput, SelectInput} from "@/components/Inputs";
// import {createUniversity, updateUniversity} from "@/repositories/UniversityRepository";
// import {cancelModalForm, closeModal, handelModalFormChange, handelModelNumberChange} from "@/lib";
import {University} from "@/types/University";

// const initialForm = {
//   name: "",
//   nickName: "",
//   faculty: "",
//   major: "",
//   degreeLevel: "",
//   semestersCount: 0,
//   currSemester: 0,
//   currSemFstDay: "",
//   specialisation: "",
// };

const AddUniversityModal: FC<{universitiData?: University}> = ({universitiData}) => {
  //   const [form, setForm] = useState(universitiData ?? initialForm);
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");

  //   const sendForm = async () => {
  //     if (Object.values(form).some(value => !value)) return setError("All fields are required!");
  //     try {
  //       await createUniversity(form);
  //     } catch (error) {
  //       setError("University saving faild!");
  //     }
  //     setForm({...initialForm});
  //     setSucces(true);
  //     closeModal("addUniversityModal");
  //   };

  //   const update = async () => {
  //     if (Object.values(form).some(value => !value)) return setError("All fields are required!");
  //     try {
  //       await updateUniversity(universitiData!.id, form as University);
  //     } catch (error) {
  //       setError("University saving faild!");
  //     }
  //     setForm({...form});
  //     setSucces(true);
  //     closeModal("addUniversityModal");
  //   };

  return (
    <div>Modal</div>
    //     <dialog id="addUniversityModal" className="modal modal-bottom sm:modal-middle">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Add new University!</h3>
    //         <div className="flex flex-col">
    //           {succes && <Succes message="University saved!" closeFunction={() => setSucces(false)} />}
    //           {error && <Error message={error} closeFunction={() => setError("")} />}
    //           <TextInput
    //             label="University name"
    //             name="name"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.name}
    //             required={true}
    //           />
    //           <TextInput
    //             label="University nickname"
    //             name="nickName"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.nickName}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Faculty"
    //             name="faculty"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.faculty}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Major"
    //             name="major"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.major}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Specialisation"
    //             name="specialisation"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.specialisation}
    //             required={true}
    //           />
    //           <SelectInput
    //             label="Degree level"
    //             name="degreeLevel"
    //             options={[
    //               {value: "BA/BSc", text: "BA/BSc"},
    //               {value: "MA/MSc", text: "MA/MSc"},
    //             ]}
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.degreeLevel}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Semesters"
    //             name="semestersCount"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.semestersCount}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Current Semester"
    //             name="currSemester"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.currSemester}
    //             required={true}
    //           />
    //           <DateInput
    //             label="Current semester's first day"
    //             name="currSemFstDay"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.currSemFstDay}
    //             required={true}
    //           />
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button
    //             className="btn"
    //             onClick={() => cancelModalForm(universitiData ?? initialForm, setForm, "addUniversityModal")}
    //           >
    //             Cancel
    //           </button>
    //           <button className="btn" onClick={universitiData ? update : sendForm}>
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
  );
};

export default AddUniversityModal;
