import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../store/slice/AddModalSlice";
import { RootState } from "../store/store";
import { AddStudent } from "../helper/declarations";
import { InputText } from "primereact/inputtext";
import {
     InputNumber,
     InputNumberValueChangeEvent, 
} from "primereact/inputnumber";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Button } from "primereact/button";

interface AddEditDialogProps {
     resetForm: () => void;
     handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
     handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
     handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
     handleNumber: (event: InputNumberValueChangeEvent) => void;
     handleRadio: (event: RadioButtonChangeEvent) => void;
     values: AddStudent;
     errors: Record<string, string>;
     touched: Record<string, boolean>;
}

const AddEditDialog = ({
     resetForm,
     handleSubmit,
     handleChange,
     handleNumber,
     handleRadio,
     handleBlur,
     values,
     errors,
     touched,
}: AddEditDialogProps) => {
     const dispatch = useDispatch();
     const { visible, editUser } = useSelector(
          (state: RootState) => state.addModal
     );
     return (
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
                                   {editUser ? "Edit Student" : "Add Student"}
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
                                   <label htmlFor="marks" className={"label"}>
                                        Marks:
                                   </label>
                                   <InputNumber
                                        name="marks"
                                        className="inputTextAddModal"
                                        value={values?.marks}
                                        onBlur={handleBlur}
                                        //onChange={(e) => setFieldValue('marks',e.value)}  ~~~~~~~~~~~~~~~~~~ This Also Works
                                        onValueChange={handleNumber}
                                   />
                                   <small style={{ color: "red" }}>
                                        {touched?.marks && errors?.marks}
                                   </small>
                              </div>
                              <div className={"inputContainer"}>
                                   <label htmlFor="marks" className={"label"}>
                                        Result:
                                   </label>
                                   <div className="flex align-items-center">
                                        <RadioButton
                                             inputId="ingredient1"
                                             name="result"
                                             value={true}
                                             onChange={handleRadio}
                                             checked={values?.result === true}
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
                                             onChange={handleRadio}
                                             checked={values?.result === false}
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
                                        label={editUser ? "Update" : "Save"}
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
     );
};

export default AddEditDialog;
