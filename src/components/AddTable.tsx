import React, { FC, memo, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useFormik } from "formik";
import { RadioButton } from "primereact/radiobutton";
import { toast } from "react-toastify";
import * as yup from "yup";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
     setAllUsers,
     setEditUser,
     setVisible,
} from "../store/slice/AddModalSlice";
import { AddStudent } from "../helper/declarations";
import { generateUniqueId } from "../helper/functions";

const AddTable: FC = () => {
     const dispatch = useDispatch();
     const { visible, allUsers, editUser } = useSelector(
          (state: RootState) => state.addModal
     );
     const initialValues: AddStudent = {
          id: editUser?.id || "",
          s_name: editUser?.s_name || "",
          marks: editUser?.marks || 0,
          result: editUser?.result || false,
     };

     const {
          values,
          errors,
          touched,
          setValues,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
     } = useFormik({
          initialValues,
          validationSchema: yup.object({
               s_name: yup
                    .string()
                    .required("Name is Required")
                    .min(3, "Name Should Have Minimum 3 Characters"),
               marks: yup.number().required("Marks is Required"),
          }),
          onSubmit: (values) => {
               toast.success(`${editUser ? "Edited" : "Added"} Successfully!`);
               dispatch(setVisible(false));
               resetForm();
               if (editUser) {
                    dispatch(
                         setAllUsers(
                              allUsers?.map((user) =>
                                   user?.id === values?.id ? values : user
                              )
                         )
                    );
                    localStorage.setItem(
                         "CrudUser",
                         JSON.stringify(
                              allUsers?.map((user) =>
                                   user?.id === values?.id ? values : user
                              )
                         )
                    );
               } else {
                    dispatch(
                         setAllUsers([
                              ...allUsers,
                              { ...values, id: generateUniqueId() },
                         ])
                    );
                    localStorage.setItem(
                         "CrudUser",
                         JSON.stringify([
                              ...allUsers,
                              { ...values, id: generateUniqueId() },
                         ])
                    );
               }
          },
     });

     useEffect(() => {
          if (editUser) {
               setValues({
                    id: editUser.id || "",
                    s_name: editUser.s_name || "",
                    marks: editUser.marks || 0,
                    result: editUser.result || false,
               });
          }
     }, [editUser, setValues]);

     return (
          <div
               className={"cardContainer"}
               style={{ marginTop: "7rem", marginBottom: "2rem" }}
          >
               <Button
                    label="+ Add"
                    onClick={() => {
                         dispatch(setEditUser(null));
                         dispatch(setVisible(true));
                    }}
                    className="AddBtn"
               />
               <Dialog
                    visible={visible}
                    modal
                    onHide={() => {
                         resetForm();
                         dispatch(setVisible(false));
                    }}
                    content={({ hide }) => (
                         <form onSubmit={handleSubmit}>
                              <div className={"dialogContent"}>
                                   <h3>
                                        {editUser
                                             ? "Edit Student"
                                             : "Add Student"}
                                   </h3>
                                   <div className={"inputContainer"}>
                                        <label
                                             htmlFor="username"
                                             className={"label"}
                                        >
                                             Name:
                                        </label>
                                        <InputText
                                             id="username"
                                             className="inputTextAddModal"
                                             name="s_name"
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             value={values?.s_name}
                                        />
                                        <small style={{ color: "red" }}>
                                             {touched?.s_name && errors?.s_name}
                                        </small>
                                   </div>
                                   <div className={"inputContainer"}>
                                        <label
                                             htmlFor="marks"
                                             className={"label"}
                                        >
                                             Marks:
                                        </label>
                                        <InputNumber
                                             name="marks"
                                             className="inputTextAddModal"
                                             value={values?.marks}
                                             onBlur={handleBlur}
                                             //onChange={(e) => setFieldValue('marks',e.value)}  ~~~~~~~~~~~~~~~~~~ This Also Works
                                             onValueChange={handleChange}
                                        />
                                        <small style={{ color: "red" }}>
                                             {touched?.marks && errors?.marks}
                                        </small>
                                   </div>
                                   <div className={"inputContainer"}>
                                        <label
                                             htmlFor="marks"
                                             className={"label"}
                                        >
                                             Result:
                                        </label>
                                        <div className="flex align-items-center">
                                             <RadioButton
                                                  inputId="ingredient1"
                                                  name="result"
                                                  value={true}
                                                  onChange={handleChange}
                                                  checked={
                                                       values?.result === true
                                                  }
                                             />
                                             <label
                                                  htmlFor="ingredient1"
                                                  className="ml-2"
                                                  style={{
                                                       marginRight: "1.5rem",
                                                       marginLeft: "0.5rem",
                                                  }}
                                             >
                                                  Pass
                                             </label>

                                             <RadioButton
                                                  inputId="ingredient2"
                                                  name="result"
                                                  value={false}
                                                  onChange={handleChange}
                                                  checked={
                                                       values?.result === false
                                                  }
                                             />
                                             <label
                                                  htmlFor="ingredient2"
                                                  className="ml-2"
                                                  style={{
                                                       marginRight: "1rem",
                                                       marginLeft: "0.5rem",
                                                  }}
                                             >
                                                  Fail
                                             </label>
                                        </div>
                                   </div>
                                   <div className="flex align-items-center gap-2">
                                        <Button
                                             label={
                                                  editUser ? "Update" : "Save"
                                             }
                                             type="submit"
                                             className={"button"}
                                        />
                                        <Button
                                             label="Cancel"
                                             onClick={(e) => {
                                                  e.preventDefault();
                                                  dispatch(setVisible(false));
                                                  resetForm();
                                             }}
                                             className={"button"}
                                        />
                                   </div>
                              </div>
                         </form>
                    )}
               />
          </div>
     );
};

export default memo(AddTable);
