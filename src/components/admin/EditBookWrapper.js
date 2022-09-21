import React from "react";
import EditBook from "./EditBook";
import { useParams } from "react-router-dom";
const EditBookWrapper = () => {
  const { id } = useParams();
  return <EditBook id={id} />;
};

export default EditBookWrapper;
