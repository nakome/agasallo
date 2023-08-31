import React from "react";

// https://react-icons.github.io/react-icons/icons?name=bi
import { BiExpand,BiCollapse } from "react-icons/bi";

import CodeMirror from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-theme-aura";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import { Button,Select } from "./Forms";

// language
import lang from "../config/language.json";

export default function CodeBlock(props) {
  return (
    <div className="code">
      <div className="code-header">
        <Select
          value={props.type}
          onChange={props.setType}
          values={props.values}
        />
        <Button onClick={props.expand}>
            {props.active ? (<BiExpand />) : <BiCollapse />}
        </Button>
      </div>
      <div className="code-body">
          <CodeMirror
            value={props.content}
            height="100%"
            extensions={[loadLanguage(props.type)]}
            theme={aura}
            onChange={props.setContent}
          />
      </div>
    </div>
  );
}
