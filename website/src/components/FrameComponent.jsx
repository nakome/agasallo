import React from "react";

import { Loader } from "../ui/Loader";
// Language
import lang from "../config/language.json";

const FrameComponent = React.forwardRef((props, ref) =>
  props.refresh ? (
    <Loader />
  ) : props.loadingFrame ? (
    <iframe id="framePreview" title={lang.preview} src={props.iframSrc} ref={props.myRef}></iframe>
  ) : (
    <section className="infoFrame">{lang.infoframe}</section>
  )
);

export default FrameComponent;
