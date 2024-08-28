import React, { FC, memo, useEffect } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AddTable from "./AddTable";
import ViewTable from "./ViewTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getUser } from "../store/slice/AddModalSlice";
import Pagination from "./Pagination";

const Add: FC = () => {
     const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
          dispatch(getUser());
     }, [dispatch]);

     return (
          <>
               <AddTable />
               <ViewTable />
               <Pagination />
          </>
     );
};

export default memo(Add);
