import React from "react";

import { Textarea, Switch } from "../ui/Forms";
import { Loader } from "../ui/Loader";
const ModalView = React.lazy(() => import("../ui/ModalView"));

// Language
import lang from "../config/language.json";

import { BinContext } from "../ui/Context";

export default function ModalComponent(props) {
  const bin = React.useContext(BinContext);

  return (
    <React.Suspense fallback={<Loader />}>
      <ModalView
        title={lang.settings}
        height={27}
        active={props.isOpenSettings}
        closeModal={props.toggleModalSettings}
      >
        <Textarea
          required={false}
          name="cssLinks"
          id="cssLinksid"
          className="no-resize"
          error={bin.cssLinks.length > 150 ? "error" : ""}
          onChange={(e) => props.updateBin("cssLinks", e.target.value)}
          placeholder={lang.putyourlinks}
          value={bin.cssLinks}
          label={lang.csslinks}
          style={{ height: "7rem" }}
        />
        <Textarea
          required={false}
          className="no-resize"
          name="jsLinks"
          id="jsLinksid"
          error={bin.jsLinks.length > 150 ? "error" : ""}
          onChange={(e) => props.updateBin("jsLinks", e.target.value)}
          placeholder={lang.putyourlinks}
          value={bin.jsLinks}
          label={lang.jslinks}
          style={{ height: "7rem" }}
        />
        <Switch
          name="public"
          ischecked={bin.public ? "on" : "off"}
          onChange={() => props.updateBin("public", !bin.public)}
          title={lang.publiccode}
        />

        <a href={`${location.origin}/api/settings`} style={{color: "var(--light)"}}>{lang.moresettings}</a>
      </ModalView>
    </React.Suspense>
  );
}
