import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tangCount } from "../../redux/Reducers/testReducer";

export default function TestComponent() {
  const { count } = useSelector((state) => state.testReducer);
  const dispatch = useDispatch();
  return (
    <div
      style={{ marginTop: "200px", marginBottom: "200px", textAlign: "center" }}
    >
      <h1>Tess redux toolkit</h1>
      <h3>
        Count: <span>{count}</span>
      </h3>
      <button
        onClick={() => {
          dispatch(tangCount(1));
        }}
      >
        Tăng 1+
      </button>
      <button
        onClick={() => {
          dispatch(tangCount(10));
        }}
      >
        Tăng 10+
      </button>
    </div>
  );
}
