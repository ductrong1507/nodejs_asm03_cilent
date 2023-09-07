import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignInForm.module.css";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

export default function SignInForm(props) {
  const [inputHandle, setInputHandle] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // chuyển trang login
  const registerClickHandle = () => {
    navigate("/register");
  };

  // xử lý các ô input
  const inputChangeHandle = (e) => {
    const { value, name } = e.target;
    const newValues = {
      ...inputHandle.values,
      [name]: value,
    };
    const newErrors = { ...inputHandle.errors };

    // Xử lý người dùng ko nhập
    if (value.trim() === "") {
      newErrors[name] = name + " không được để trống!!";
    } else {
      newErrors[name] = "";
    }

    setInputHandle({
      values: newValues,
      errors: newErrors,
    });
  };

  // Xử lý sự kiện submit form
  const submitFormHandle = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...inputHandle.errors };

    // kiểm tra xem trong values có trường nào rỗng ko
    for (let key in inputHandle.values) {
      if (inputHandle.values[key] === "") {
        valid = false;
        newErrors[key] = key + " không được để trống!!";
        setInputHandle({ ...inputHandle, errors: newErrors });
      }
    }

    if (valid) {
      const apiResponse = axios({
        method: "POST",
        url: `${API_BASE_URL}/user/login`,
        data: {
          email: inputHandle.values.email.trim().toLowerCase(),
          password: inputHandle.values.password.trim().toLowerCase(),
        },
      });

      apiResponse
        .then((result) => {
          console.log("result.data", result);

          if (result.data.status) {
            toast.success(result.data.message);
            setTimeout(() => {
              dispatch({
                type: "ON_LOGIN",
                data: result.data,
              });
            }, 800);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          setInputHandle({
            ...inputHandle,
            values: {
              ...inputHandle.values,
              password: "",
            },
          });
        });
    }
  };

  return (
    <section id={styles.sign_in}>
      <div className={styles.sign_in_container}>
        <h1>Sign In</h1>
        <form onSubmit={submitFormHandle} className={styles.sign_in_form}>
          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.email}</p>
            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.email}
              type="email"
              name="email"
              className={styles.form_control}
              placeholder="Email"
            />
          </div>
          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.password}</p>
            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.password}
              type="password"
              name="password"
              className={styles.form_control}
              placeholder="Password"
            />
          </div>

          <button type="submit">Sign In</button>
        </form>
        <p>
          Create an account?
          <span onClick={registerClickHandle}> Sign Up</span>
        </p>
      </div>
    </section>
  );
}
