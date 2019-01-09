import React from "react";

const Input = ({ name, label, onChange, value, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        id={name}
        vlue={value}
        type="text"
        name={name}
        className="form-control"
        onChange={onChange}
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
