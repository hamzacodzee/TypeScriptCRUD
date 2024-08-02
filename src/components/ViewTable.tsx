import React, { FC, memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteUser } from "../store/slice/AddModalSlice";
import { Button } from "primereact/button";
import EditTable from "./EditTable";
import { AddStudent } from "../helper/declarations";
import { Skeleton } from 'primereact/skeleton';

const ViewTable: FC = () => {
     const { getUserState, search, crudLoading } = useSelector((state: RootState) => state.addModal);
     const dispatch = useDispatch<AppDispatch>();
     const resultTemplate = (data: AddStudent) => {
          return <p>{data?.result ? "Pass" : "Fail"}</p>;
     };

     const handleDelete = (_id: string) => {
          dispatch(deleteUser({ _id }));
     };

     const actionTemplate = (data: AddStudent) => {
          return (
               <div style={{ display: "inline-flex" }}>
                    <EditTable data={data} />
                    <Button
                         style={{
                              backgroundColor: "transparent",
                              border: "none",
                              fontSize: "1.2rem",
                              margin: 0,
                              padding: 0,
                         }}
                         label="❌"
                         onClick={() => handleDelete(data?._id)}
                    />
               </div>
          );
     };

     const nameTemplate = (data: AddStudent) => {
          return (
               <p
                    style={{
                         width: "10rem",
                         wordBreak: "break-all",
                         display: "inline-block",
                    }}
               >
                    {data.s_name}
               </p>
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
               <DataTable
                    value={crudLoading ? Array(getUserState?.length || 1).fill({}) : getUserState?.filter((item: AddStudent) =>
                         item.s_name.toLowerCase().includes(search.toLowerCase())
                    )}
                    tableStyle={{ width: "50rem" }}
               >
                    <Column 
                         field="s_name" 
                         header="Name" 
                         body={crudLoading ? <Skeleton /> : nameTemplate}
                         style={crudLoading ? { height: "4rem" } : undefined}
                    />
                    <Column 
                         field="marks" 
                         header="Marks"
                         body={crudLoading ? <Skeleton /> : undefined}
                         style={crudLoading ? { height: "4rem" } : undefined}
                    />
                    <Column 
                         field="result" 
                         header="Result" 
                         body={crudLoading ? <Skeleton /> : resultTemplate}
                         style={crudLoading ? { height: "4rem" } : undefined}
                    />
                    <Column 
                         header="Action" 
                         body={crudLoading ? <Skeleton /> : actionTemplate}
                         style={crudLoading ? { height: "4rem" } : undefined}
                    />
               </DataTable>
          </div>
     );
};

export default memo(ViewTable);
