import React from "react";
//https://github.com/reactjs/react-modal#demos
// https://react-icons.github.io/react-icons/icons?name=bi
import { BiX } from "react-icons/bi";
import { Button } from "../components/Forms";

import lang from "../config/language.json"

const ModalOverlay = (props) => (
  <section className="Modal-overlay" {...props}>
    {props.children}
  </section>
);
const Modal = (props) => (
  <section className="modal" {...props}>
    {props.children}
  </section>
);
const ModalHeaderLeft = (props) => (
  <section className="modal-header-left" {...props}>
    {props.children}
  </section>
);
const ModalHeaderCenter = (props) => (
  <section className="modal-header-center" {...props}>
    {props.children}
  </section>
);
const ModalHeaderRight = (props) => (
  <section className="modal-header-right" {...props}>
    {props.children}
  </section>
);
const ModalHeader = (props) => (
  <header className="modal-header" {...props}>
    {props.children}
  </header>
);
const ModalHeaderTitle = (props) => (
  <h3 className="modal-header-title" {...props}>
    {props.children}
  </h3>
);
const ModalMainContent = (props) => (
  <section className="modal-main-content" {...props}>
    {props.children}
  </section>
);

export default function ModalView(props) {
  return (<React.Fragment>
    <ModalOverlay className={props.active ? 'overlay overlay-active' : 'overlay'} onClick={props.closeModal}/>
      <Modal className={props.active ? 'modal modal-active' : 'modal'} style={{maxHeight: props.height ? `${props.height}rem` : "30rem"}}>
        <ModalHeader>
          <ModalHeaderLeft>
            <ModalHeaderTitle>{props.title || lang.defaulttitle}</ModalHeaderTitle>
          </ModalHeaderLeft>
          <ModalHeaderCenter></ModalHeaderCenter>
          <ModalHeaderRight>
            <Button className="button button-danger" onClick={props.closeModal}><BiX /></Button>
          </ModalHeaderRight>
        </ModalHeader>
        <ModalMainContent>{props.children}</ModalMainContent>
      </Modal>
    </React.Fragment>
  );
}
