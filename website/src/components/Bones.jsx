import React from "react";

export const MainApp = (props) => <main className="app">{props.children}</main>;

export const Header = (props) => {
  return <header className="app-header">{props.children}</header>;
};

export const HeaderLeft = (props) => {
  return <section className="app-header-left">{props.children}</section>;
};

export const HeaderCenter = (props) => {
  return <section className="app-header-center">{props.children}</section>;
};

export const HeaderRight = (props) => {
  return <section className="app-header-right">{props.children}</section>;
};

export const MainContent = (props) => (
  <main className="app-content">{props.children}</main>
);

export const DrawerHeader = (props) => (
  <header className="drawer-header" {...props}>
    {props.children}
  </header>
);
export const DrawerBody = (props) => (
  <section className="drawer-body" {...props}>
    {props.children}
  </section>
);

export const Divider = () => <div className="divider"></div>;