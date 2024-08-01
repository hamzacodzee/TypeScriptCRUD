import React, { FC, memo } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AddTable from "./AddTable";
import ViewTable from "./ViewTable";

const Add: FC = () => {
     return (
          <div>
               <AddTable />
               <ViewTable/>
          </div>
     );
};

export default memo(Add);
