import { Button } from "primereact/button";
import React, { FC, memo } from "react";
import { setEditUser, setVisible } from "../store/slice/AddModalSlice";
import { useDispatch } from "react-redux";
import { AddStudent } from "../helper/declarations";

interface EditTableProps {
     data: AddStudent;
}

const EditTable: FC<EditTableProps> = ({ data }) => {
     const dispatch = useDispatch();
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
                         dispatch(setEditUser(data));
                         dispatch(setVisible(true));
                    }}
               />
          </div>
     );
};

export default memo(EditTable);
