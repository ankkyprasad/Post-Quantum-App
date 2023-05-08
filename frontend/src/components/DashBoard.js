import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboard } from "../services/Api";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboard(),
    select: (data) => {
      return data.data;
    },
  });

  const navigate = useNavigate();

  console.log("data", data);

  useEffect(() => {
    if (!data) navigate("/login");
  }, []);

  return (
    <>
      <h1>Dasboard</h1>
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div>
          <h1>{data.message}</h1>
        </div>
      )}
    </>
  );
};
