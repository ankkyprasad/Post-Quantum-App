import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboard } from "../services/Api";
export const DashBoard = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboard(),
    select: (data) =>{
      return data.data
    }
  });

  console.log("data",data)

  return (
  <>
  <h1>Dasboard</h1>
  {
    isLoading? "loading..."
    :
    error? "Something went wrong"
    :
  <div>
  <h1>{data.message}</h1>
  </div>
  }
  </>
  )
};
