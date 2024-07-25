import React, { FC, memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAllUsers } from "../store/slice/AddModalSlice";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import EditTable from "./EditTable";
import { AddStudent } from "../helper/declarations";

const ViewTable: FC = () => {
     const { allUsers } = useSelector((state: RootState) => state.addModal);
     const dispatch = useDispatch();
     const resultTemplate = (data: AddStudent) => {
          return <p>{data?.result ? "Pass" : "Fail"}</p>;
     };

     const handleDelete = (id: string) => {
          dispatch(
               setAllUsers(
                    allUsers.filter((user: AddStudent) => user?.id !== id)
               )
          );
          toast.success("Deleted Successfully!");
     };

     const actionTemplate = (data: AddStudent) => {
          return (
               <div style={{ display: "inline-flex" }}>
                    <EditTable data={data} />
                    <Button
                         style={{
                              backgroundColor:"transparent",border:"none",fontSize:"1.2rem", margin:0, padding:0
                         }}
                         label="❌"
                         onClick={() => handleDelete(data?.id)}
                    />
               </div>
          );
     };

     return (
          <div
               className="card"
               style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
               }}
          >
               <DataTable value={allUsers} tableStyle={{ width: "50rem" }}>
                    <Column field="s_name" header="Name"></Column>
                    <Column field="marks" header="Marks"></Column>
                    <Column
                         field="result"
                         header="Result"
                         body={resultTemplate}
                    ></Column>
                    <Column header="Action" body={actionTemplate}></Column>
               </DataTable>
          </div>
     );
};

export default memo(ViewTable);
