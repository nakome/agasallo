import React from "react";

/**  Componentes
-----------------------------*/
import { BiLinkExternal,BiCodeBlock,BiTrash } from "react-icons/bi";
import { Button } from "./Forms";

/**  Config
-----------------------------*/
import lang from "../config/language.json"



/**
 * Card
 * @param {mixed} props
 * @returns
 */
const Card = (props) => {
  return (
    <section className="card">
      <header className="card-header">
        <div className="card-header-left">
          <div className="card-header-text">{props.data.title}</div>
        </div>
        <div className="card-header-right">
          {props.data.public ? (<a title={lang.preview} rel="noopener" target="_blank" href={`/api/share/${props.data.key}`} className="button" style={{marginRight: "5px"}}><BiLinkExternal/></a>) : ""}
          <Button title={lang.editcode} className="button button-success" style={{marginRight: "5px"}} onClick={props.openBin}><BiCodeBlock/></Button>
          <Button title={lang.delete} className="button button-danger" onClick={props.deleteBin}><BiTrash/></Button>
        </div>
      </header>
      <footer className="card-footer">
        <div className="card-footer-left">{lang.lastupdate}: {props.data.update_at}</div>
      </footer>
    </section>
  );
};

export default Card;