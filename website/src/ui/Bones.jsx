import React from "react";

export const MainApp = (props) => <main className="app">{props.children}</main>;

export const MainContent = (props) => (
  <main className="app-content">{props.children}</main>
);


export const Divider = () => <div className="divider"></div>;
