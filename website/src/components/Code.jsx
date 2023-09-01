import React from "react";

// https://react-icons.github.io/react-icons/icons?name=bi
import { BiExpand,BiCollapse } from "react-icons/bi";

import CodeMirror from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-theme-aura";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import { Button,Select } from "./Forms";

export default function CodeBlock(props) {
  return (
    <div className="code">
      <div className="code-header">
        <Select
          name={props.name}
          id={props.name}
          value={props.type}
          onChange={props.setType}
          values={props.values}
        />
        <div className="code-header-right">
          <Button onClick={props.expand}>
              {props.active ? (<BiExpand />) : <BiCollapse />}
          </Button>
        </div>
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
