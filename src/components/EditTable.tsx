import { Button } from "primereact/button";
import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { AddStudent } from "../helper/declarations";
import { getUserById, setVisible } from "../store/slice/AddModalSlice";
import { AppDispatch } from "../store/store";

interface EditTableProps {
     data: AddStudent;
}

const EditTable: FC<EditTableProps> = ({ data }) => {
     const dispatch = useDispatch<AppDispatch>();
     return (
          <div style={{ alignItems: "center", justifyContent: "center" }}>
               <Button
                    style={{
                         backgroundColor: "transparent",
                         border: "none",
                         fontSize: "1rem",
                         margin: 0,
                         padding: 0,
                    }}
                    label="📝"
                    onClick={() => {
                         dispatch(setVisible(true));
                         dispatch(getUserById({ id: data._id, actionType: "edit" }));
                    }}
               />
          </div>
     );
};

export default memo(EditTable);
