import React from "react";
// https://react-icons.github.io/react-icons/icons?name=bi
import {
  BiExpand,
  BiCollapse,
  BiCodeCurly,
  BiX,
  BiLinkExternal,
  BiCode
} from "react-icons/bi";

import CodeMirror from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-theme-aura";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import { Button, Select } from "../ui/Forms";

import { MarkdownToHtml, ScssToCss, TypeScriptToJs,BabelToJs } from "../api/Converter";

import Lang from "../config/language.json";

export default function CodeBlock(props) {
  const [preview, setPreview] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [type, setType] = React.useState("html");

  const handlePreview = async () => {
    setActive(!active);
    setPreview(Lang.loading);

    if (!active) {
      let newType, newPreview;

      switch (props.type) {
        case "markdown":
          newType = "markdown";
          newPreview = await MarkdownToHtml(props.content);
          break;
        case "html":
          newPreview = Lang.selectmdfirst;
          break;
        case "sass":
          newType = "sass";
          newPreview = await ScssToCss(props.content);
          break;
        case "css":
          newPreview = Lang.selectsassfirst;
          break;
        case "typescript":
          newType = "typescript";
          newPreview = await TypeScriptToJs(props.content);
          break;
        case "babel":
          newType = "babel";
          newPreview = await BabelToJs(props.content);
          break;
        case "javascript":
          newPreview = Lang.selecttsfirst;
          break;
        default:
          break;
      }

      setType(newType || props.type);
      setPreview(newPreview);
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
          {props.isPublic && (
            <a
              rel="noopener"
              target="_blank"
              href={`${location.origin}/api/share/${props.idkey}/${props.type}`}
            >
              <BiLinkExternal />
            </a>
          )}

          <Button
            onClick={props.formatCode}
            className={active ? "button-active" : ""}
            title={Lang.formatcode}
          >
             <BiCode />
          </Button>

          <Button
            onClick={handlePreview}
            className={active ? "button-active" : ""}
            title={Lang.convertcode}
          >
            {active ? <BiX /> : <BiCodeCurly />}
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
            extensions={[loadLanguage((type === "babel" ? "javascript" : type))]}
            theme={aura}
          />
        ) : (
          <CodeMirror
            value={props.content}
            height="100%"
            extensions={[loadLanguage((props.type === "babel" ? "javascript" : props.type))]}
            theme={aura}
            onChange={props.setContent}
          />
        )}
      </div>
    </div>
  );
}
