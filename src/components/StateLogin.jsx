import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const handleReset = (event) => {
    event.preventDefault();
    setEnteredValues({ email: "", password: "" });
  };
  const handleBlur = (identifier) => {
    setDidEdit((prevEdits) => ({ ...prevEdits, [identifier]: true }));
  };
  //validating the user email with onBlur useState and "@"
  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredValues);
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    // when the user start typing again the error message disappear
    setDidEdit((prevEdit) => ({ ...prevEdit, [identifier]: false }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleBlur("email")}
          value={enteredValues.email}
          onChange={(event) => {
            handleInputChange("email", event.target.value);
          }}
          error={emailIsInvalid && "Please enter a valid email adress."}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="PASSWORD"
          value={enteredValues.password}
          onBlur={() => handleBlur("password")}
          onChange={(event) => {
            handleInputChange("password", event.target.value);
          }}
          error={passwordIsInvalid && "Password is incorrect."}
        />
      </div>
      <p className="form-actions">
        <button className="button button-flat" onClick={handleReset}>
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
