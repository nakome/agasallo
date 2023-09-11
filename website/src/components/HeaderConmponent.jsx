import React from "react";

// Components
import {
  BiSave,
  BiPlus,
  BiCog,
  BiMenu,
  BiSolidSave,
  BiLogoGithub,
} from "react-icons/bi";

import { Input, Button } from "../ui/Forms";

// Language
import lang from "../config/language.json";

import { BinContext } from "../ui/Context";

const Header = (props) => {
  return <header className="app-header">{props.children}</header>;
};

const HeaderLeft = (props) => {
  return <section className="app-header-left">{props.children}</section>;
};

const HeaderCenter = (props) => {
  return <section className="app-header-center">{props.children}</section>;
};

const HeaderRight = (props) => {
  return <section className="app-header-right">{props.children}</section>;
};

export default function HeaderComponent(props) {
  const bin = React.useContext(BinContext);

  return (
    <Header>
      <HeaderLeft>
        <Button onClick={props.toggleDrawer} title={lang.openmenu}>
          <BiMenu />
        </Button>
        <Input
          name="title"
          id="title"
          required={true}
          type="text"
          value={bin.title}
          onChange={(e) => props.updateBin("title", e.target.value)}
          placeholder={lang.title}
          onKeyDown={props.saveDataOnKeyPressTitle}
        />
      </HeaderLeft>
      <HeaderCenter>
        <h3>{lang.appname}</h3>
      </HeaderCenter>
      <HeaderRight>
        <Button onClick={props.toggleToNewCode} title={lang.createnew}>
          <BiPlus />
        </Button>
        {props.isNew ? (
          <Button
            title={lang.savenew}
            className="button-warning"
            onClick={props.handleCreateNewCode}
          >
            <BiSolidSave />
          </Button>
        ) : (
          <Button title={lang.updatecode} onClick={props.handleUpdateCode}>
            <BiSave />
          </Button>
        )}
        <Button onClick={props.toggleModalSettings} title={lang.modalsettings}>
          <BiCog />
        </Button>
        <a
          rel="noopener"
          target="_blank"
          className="button"
          href="https://github.com/nakome/agasallo"
          title="Github"
        >
          <BiLogoGithub />
        </a>
      </HeaderRight>
    </Header>
  );
}
