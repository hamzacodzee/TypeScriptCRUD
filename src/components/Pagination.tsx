import { Button } from "primereact/button";
import React, { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setPaginationValues } from "../store/slice/AddModalSlice";
import { limit } from "../helper/declarations";

const Pagination: FC = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { paginationValues, filteredUserState } = useSelector(
          (state: RootState) => state.addModal
     );

     const dataLength: number = filteredUserState?.length || 0;
     const totalPages: number = Math.ceil(dataLength / limit);

     return (
          <div
               style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "1.5rem",
               }}
          >
               <Button
                    label="<"
                    onClick={() => {
                         dispatch(
                              setPaginationValues({
                                   ...paginationValues,
                                   count: paginationValues.count - 1,
                                   start:
                                        (paginationValues.count - 1) * limit +
                                        1,
                                   end: paginationValues.count * limit,
                              })
                         );
                    }}
                    className="AddBtn"
                    disabled={paginationValues.count === 0}
               />

               <Button
                    label={(paginationValues.count + 1).toString()}
                    className="AddBtn"
                    disabled={true}
                    style={{
                         margin: "0.5rem",
                    }}
               />
               <Button
                    label=">"
                    onClick={() => {
                         dispatch(
                              setPaginationValues({
                                   ...paginationValues,
                                   count: paginationValues.count + 1,
                                   start:
                                        (paginationValues.count + 1) * limit +
                                        1,
                                   end: (paginationValues.count + 2) * limit,
                              })
                         );
                    }}
                    disabled={totalPages === paginationValues.count + 1}
                    className="AddBtn"
               />
          </div>
     );
};

export default memo(Pagination);
