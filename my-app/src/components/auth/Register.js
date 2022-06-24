import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./AuthStyles.module.css";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
    console.log(name.value.type);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "*Please enter Username.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "*Please enter email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "*Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "*Password and Confirm Password does not match.";
          }else if (value.length < 8) {
            stateObj["password"] =
              "*Password must be '8' characters";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "*Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "*Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };



  async function saveUser(e) {
    e.preventDefault();

    
    console.warn({
      username:input.username,
      email:input.email,
      password:input.password,
      confirmPassword:input.confirmPassword,
    });



    const data = {
      username:input.username,
      email:input.email,
      password:input.password,
      confirmPassword:input.confirmPassword,
    };

    let result = await fetch(
      "https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    result = await result.json();
    console.log("result", result);
    localStorage.setItem("users-data", JSON.stringify(result));
    history.push("Login");
  }



  return (
    <div>
      <div className={styles.inputs_container}>
        <h2>Sign Up</h2>
        <form onSubmit={saveUser}>
          <div className={styles.input_group}>
            <label htmlFor="">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.username && (
              <span className={styles.err}>{error.username}</span>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.email && <span className={styles.err}>{error.email}</span>}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && (
              <span className={styles.err}>{error.password}</span>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.confirmPassword && (
              <span className={styles.err}>{error.confirmPassword}</span>
            )}
          </div>
          <button className={styles.submitButton}  formNoValidate>SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
