import React from "react";

export const MainApp = (props) => <main className="app">{props.children}</main>;

export function Header(props) {
  return <header className="app-header">{props.children}</header>;
}

export function HeaderLeft(props) {
  return <section className="app-header-left">{props.children}</section>;
}

export function HeaderCenter(props) {
  return <section className="app-header-center">{props.children}</section>;
}

export function HeaderRight(props) {
  return <section className="app-header-right">{props.children}</section>;
}

export const MainContent = (props) => (
  <main className="app-content">{props.children}</main>
);


export const DrawerHeader = props => (
  <header className="drawer-header" {...props}>{props.children}</header>
)
export const DrawerBody = props => (
  <section className="drawer-body" {...props}>{props.children}</section>
)