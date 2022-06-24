import React, { useState } from 'react';
import styles from  './AuthStyles.module.css';

const Login = () => {

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
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
            }else if (!value.includes("@")) {
              stateObj["email"] =
                "*Invalid email: email must include '@' ";
            }
            break;

        case "password":
          if (!value) {
            stateObj[name] = "*Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "*Password and Confirm Password does not match.";
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
  
  return (
    <div>
      <div className={styles.inputs_container}>
        <h2>Sign In</h2>
        <form>
          
          <div className={styles.input_group}>
            <label htmlFor="">Email</label>
            <input  type="text"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput} />
              {error.email && <span className={styles.err}>{error.email}</span>}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && <span className={styles.err}>{error.password}</span>}
          </div>
          <button className={styles.submitButton}>SignIn</button>
        </form>
      </div>
    </div>
  )
}

export default Login