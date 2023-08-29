import React from "react";

/**
 * Form
 * @param {mixed} props
 * @returns
 */
export const Form = (props) => <form {...props}>{props.children}</form>;

/**
 * Input
 * @param {mixed} props
 * @returns
 */
export const Input = (props) => (
  <div className="form-group">
    {props.label ? <label>{props.label}</label> : ""}
    <input {...props} />
  </div>
);


/**
 * Input Search
 * @param {mixed} props
 * @returns
 */
export const InputSearch = (props) => <input type="search" {...props} />;


/**
 * Textarea
 * @param {mixed} props
 * @returns
 */
export const Textarea = (props) => (
  <div className="form-group">
    {props.label ? <label>{props.label}</label> : ""}
    <textarea {...props} />
  </div>
);

/**
 * Buttons
 * @param {mixed} props
 * @returns
 */
export const Buttons = (props) => <div className="buttons">{props.children}</div>;

/**
 * Button
 * @param {mixed} props
 * @returns
 */
export const Button = (props) => <button type="button" {...props}>{props.children}</button>;

/**
 * Switch button
 * @param {mixed} props
 * @returns
 */
export const Switch = (props) => (
  <div className="switch-form">
    <label className="switch">
      {props.ischecked === "on" ? (
        <input type="checkbox" checked={true} onChange={props.onChange} />
      ) : (
        <input type="checkbox" onChange={props.onChange} />
      )}
      <span className="slider round" />
    </label>{" "}
    <span>{props.title}</span>
  </div>
);

/**
 * Select
 * @param {mixed} props
 * @returns
 */
export const Select = (props) => (
  <div className="form-group">
    {props.label ? <label>{props.label}</label> : ""}
    <select {...props}>
      {props.values.map((item, index) => (
        <option key={`id_${index}`} value={item.toLowerCase()}>
          {item}
        </option>
      ))}
    </select>
  </div>
);
