import React, { FC, memo, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setEditUser, setSearch, setVisible } from "../store/slice/AddModalSlice";
import { AddStudent } from "../helper/declarations";
import { generateUniqueId } from "../helper/functions";
import AddEditDialog from "./AddEditDialog";

const AddTable: FC = () => {
     const dispatch = useDispatch();
     const { allUsers, editUser, search } = useSelector(
          (state: RootState) => state.addModal
     );
     const initialValues: AddStudent = {
          id: editUser?.id || "",
          s_name: editUser?.s_name || "",
          marks: editUser?.marks || 0,
          result: editUser?.result || false,
     };

     const handleEditing = (values: AddStudent) => {
          dispatch(setAllUsers(allUsers?.map((user) => user?.id === values?.id ? values : user)));
          localStorage.setItem("CrudUser", JSON.stringify(allUsers?.map((user) => user?.id === values?.id ? values : user)));
     };

     const handleAdding = (values: AddStudent) => {
          dispatch(setAllUsers([...allUsers, { ...values, id: generateUniqueId() }]));
          localStorage.setItem("CrudUser", JSON.stringify([...allUsers, { ...values, id: generateUniqueId() }]));
     };

     const handleSubmitForm = (values: AddStudent) => {
          toast.success(`${editUser ? "Edited" : "Added"} Successfully!`);
          dispatch(setVisible(false));
          resetForm();
          if (editUser) {
               handleEditing(values);
          } else {
               handleAdding(values);
          }
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
          onSubmit: handleSubmitForm,
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

               <InputText
                    className="input_text_search"
                    value={search}
                    placeholder="Search"
                    onChange={(e) => dispatch(setSearch(e.target.value.trim()))}
               />

               <AddEditDialog
                    resetForm={resetForm}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleNumber={handleChange}
                    handleRadio={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    touched={touched}
               />
          </div>
     );
};

export default memo(AddTable);
