import React from "react";

// https://react-icons.github.io/react-icons/icons?name=bi
import { BiExpand, BiCollapse, BiCodeCurly, BiX } from "react-icons/bi";

import CodeMirror from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-theme-aura";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import { Button, Select } from "./Forms";

import { MarkdownToHtml, ScssToCss, TypeScriptToJs } from "../api/Converter";

import Lang from "../config/language.json";


export default function CodeBlock(props) {
  const [preview, setPreview] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [type, setType] = React.useState("html");

  const handlePreview = async () => {
    setActive(!active);
    setPreview(Lang.loading);
    if (!active) {
      switch (props.type) {
        case "markdown":
          setType("markdown");
          setPreview(await MarkdownToHtml(props.content));
          break;
        case "html":
          setPreview(Lang.selectmdfirst);
          break;
        case "sass":
          setType("sass");
          setPreview(await ScssToCss(props.content));
          break;
        case "css":
          setPreview(Lang.selectsassfirst);
          break;
        case "typescript":
          setType("typescript");
          setPreview(await TypeScriptToJs(props.content));
          break;
        case "javascript":
          setPreview(Lang.selecttsfirst);
          break;
      }
    }
  };

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
          <Button
            onClick={handlePreview}
            className={active ? "button-active" : ""}
            title={Lang.convertcode}
          >
            {active ? <BiX/> : <BiCodeCurly />}
          </Button>
          <Button onClick={props.expand} title={Lang.expandblock}>
            {props.active ? <BiExpand /> : <BiCollapse />}
          </Button>
        </div>
      </div>
      <div className="code-body">
        {active ? (
          <CodeMirror
            readOnly={true}
            value={preview}
            height="100%"
            extensions={[loadLanguage(type)]}
            theme={aura}
          />
        ) : (
          <CodeMirror
            value={props.content}
            height="100%"
            extensions={[loadLanguage(props.type)]}
            theme={aura}
            onChange={props.setContent}
          />
        )}
      </div>
    </div>
  );
}
