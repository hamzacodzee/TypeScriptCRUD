import React, { FC, memo, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as yup from "yup";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setEditUser, setSearch, setVisible, updateUser } from "../store/slice/AddModalSlice";
import { AddStudent, initialValuesObj } from "../helper/declarations";
import AddEditDialog from "./AddEditDialog";

const AddTable: FC = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { 
          // allUsers,
           editUser, search } = useSelector(
          (state: RootState) => state.addModal
     );

     const initialValues: AddStudent = JSON.parse(JSON.stringify(initialValuesObj));

     const handleEditing = async (values: AddStudent) => {
          await dispatch(updateUser(values));
     };

     const handleAdding = async (values: AddStudent) => {
          await dispatch(addUser(values));
     };

     const handleSubmitForm = (values: AddStudent) => {
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
                    _id: editUser._id || "",
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
