import React from "react";

import * as prettier from "https://unpkg.com/prettier@3.0.3/standalone.mjs";
import prettierPluginBabel from "https://unpkg.com/prettier@3.0.3/plugins/babel.mjs";
import prettierPluginEstree from "https://unpkg.com/prettier@3.0.3/plugins/estree.mjs";
import prettierPluginHtml from "https://unpkg.com/prettier@3.0.3/plugins/html.mjs";
import prettierPluginPostCss from "https://unpkg.com/prettier@3.0.3/plugins/postcss.mjs";
import prettierPluginTypescript from "https://unpkg.com/prettier@3.0.3/plugins/typescript.mjs";
import prettierPluginMarkdown from "https://unpkg.com/prettier@3.0.3/plugins/markdown.mjs";

import {
  BiSave,
  BiPlus,
  BiCog,
  BiMenu,
  BiSolidSave,
  BiLogoGithub,
} from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Split from "react-split";

import 'winbox/dist/css/winbox.min.css'; // required
import WinBox from 'react-winbox';

// Components
import { Input, Button, Textarea, Switch } from "./ui/Forms";
import { BinContext } from "./ui/Context";
import { Loader } from "./ui/Loader";

// Api
import { GetDataKey } from "./api/GetData";
import { CreateNewBin, UpdateBin } from "./api/PostData";

// Utils
import { today } from "./utils/Date";

// Language
import lang from "./config/language.json";

const DrawerComponent = React.lazy(() => import("./ui/DrawerComponent"));
const CodeBlock = React.lazy(() => import("./ui/CodeBlockComponent"));

// App
export default function App() {

  let arrayOfStates = {
    key: "1234",
    title: `Untitled ${today()}`,
    public: false,
    created: today(),
    cssLinks: "",
    jsLinks: "",
    htmlContent: "Empty Content",
    cssContent: "*{box-sizing:border-box}",
    jsContent: "console.log('ready')",
    htmlContentType: "html",
    cssContentType: "css",
    jsContentType: "javascript",
  };

  const [bin, setBin] = React.useState(arrayOfStates);

  // Check if is new code or if exists
  const [isNew, setIsNew] = React.useState(true);

  // Modal and drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenSettings, setIsOpenSettings] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Frames
  const [iframSrc, setIframeUrl] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);
  const [loadingFrame, setLoadingFrame] = React.useState(false);

  // Refs
  const refIframe = React.useRef(null);
  const refHorSplit = React.useRef(null)
  const refVertSplit = React.useRef(null);

  const codeBlocks = [
    {
      key: bin.key,
      public: bin.public,
      name: "htmlfield",
      active: isExpanded,
      expand: () => toggleCollapseBlocks(0),
      content: bin.htmlContent,
      setContent: (value, viewUpdate) => updateBin("htmlContent", value),
      type: bin.htmlContentType || "html",
      setType: (evt) => updateBin("htmlContentType", evt.target.value),
      values: ["html", "markdown"],
      formatCode: () => formatCode(bin.htmlContentType || "html")
    },
    {
      key: bin.key,
      public: bin.public,
      name: "cssfield",
      active: isExpanded,
      expand: () => toggleCollapseBlocks(1),
      content: bin.cssContent,
      setContent: (value, viewUpdate) => updateBin("cssContent", value),
      type: bin.cssContentType || "css",
      setType: (evt) => updateBin("cssContentType", evt.target.value),
      values: ["css", "sass"],
      formatCode: () => formatCode(bin.cssContentType || "css")
    },
    {
      key: bin.key,
      public: bin.public,
      name: "jsfield",
      active: isExpanded,
      expand: () => toggleCollapseBlocks(2),
      content: bin.jsContent,
      setContent: (value, viewUpdate) => updateBin("jsContent", value),
      type: bin.jsContentType || "javascript",
      setType: (evt) => updateBin("jsContentType", evt.target.value),
      values: ["babel", "javascript", "typescript"],
      formatCode: () => formatCode(bin.jsContentType || "javascript")
    },
  ];

  // Modal and drawer handlers
  const toggleModalSettings = React.useCallback(() => {
    setIsOpenSettings(!isOpenSettings);
  }, [isOpenSettings]);

  // On toggle drawer load code
  const toggleDrawer = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  // On press Ctrl+enter save data
  const saveBinOnKeyPressTitle = React.useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevenir el comportamiento predeterminado de Ctrl+S
        createOrUpdate();
      }
    },
    [createOrUpdate]
  );

  const sendCodeOnEnter = React.useCallback((evt) => {
    if (evt.ctrlKey && evt.key === "s") {
        evt.preventDefault();
        evt.stopPropagation();
        createOrUpdate();
        return false;
    }
  },[createOrUpdate])

  // Format code
  async function formatCode(type) {
    switch (type) {
      case "javascript":
      case "babel":
        try {
          let output = await prettier.format(bin.jsContent, {
            parser: "babel",
            plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
          });
          updateBin("jsContent", output);
          //sendNotification(lang.successformat,true);
        } catch (err) {
          console.log(err);
          sendNotification(lang.errorformat,false);
        }
        break;
      case "typescript":
        try {
          let output = await prettier.format(bin.jsContent, {
            parser: "typescript",
            plugins: [prettierPluginTypescript, prettierPluginEstree, prettierPluginHtml],
          });
          updateBin("jsContent", output);
          //sendNotification(lang.successformat,true);
        } catch (err) {
          console.log(err);
          sendNotification(lang.errorformat,false);
        }
        break;
      case "css":
      case "sass":
        try {
          let output = await prettier.format(bin.cssContent, {
            parser: "css",
            plugins: [prettierPluginPostCss],
          });
          //sendNotification(lang.successformat,true);
          updateBin("cssContent", output);
        } catch (err) {
          console.log(err);
          sendNotification(lang.errorformat,false);
        }
        break;
      case "html":
        try {
          let output = await prettier.format(bin.htmlContent, {
            parser: "html",
            plugins: [prettierPluginHtml],
          });
          //sendNotification(lang.successformat,true);
          updateBin("htmlContent", output);
        } catch (err) {
          console.log(err);
          sendNotification(lang.errorformat,false);
        }
        break;
      case "markdown":
        try {
          let output = await prettier.format(bin.htmlContent, {
            parser: "markdown",
            plugins: [prettierPluginHtml, prettierPluginMarkdown],
          });
          //sendNotification(lang.successformat,true);
          updateBin("htmlContent", output);
        } catch (err) {
          console.log(err);
          sendNotification(lang.errorformat,false);
        }
        break;
    }
  }

  function sendNotification(msg,status) {
    if(status) {
      toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
    }else{
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  // If isNew create else update
  function createOrUpdate() {
    if (isNew) {
      createHandler();
    } else {
      updateHandler();
    }
  }

  // Toogle to new code
  function toggleToNewCode() {
    // Set the new data object as the current bin
    setBin(arrayOfStates);

    // Hide the drawer
    setIsOpen(false);

    // Set isNew to true to indicate that it's a new bin
    setIsNew(true);

    // Set loading frame to true
    setLoadingFrame(true);

    // Clear the iframe URL
    setIframeUrl("");
  }

  // Toggle blocks
  function toggleCollapseBlocks(num) {
    setIsExpanded((prevState) => !prevState);
    let sizes = [33.33, 33.33, 33.33];
    switch (num) {
      case 0:
        sizes = isExpanded ? [100, 0, 0] : [33.33, 33.33, 33.33];
        break;
      case 1:
        sizes = isExpanded ? [0, 100, 0] : [33.33, 33.33, 33.33];
        break;
      case 2:
        sizes = isExpanded ? [0, 0, 100] : [33.33, 33.33, 33.33];
        break;
    }
    refVertSplit.current.split.setSizes(sizes);
  }

  // Update bin
  function updateBin(name, val) {
    setBin({
      ...bin,
      [name]: val,
    });
  }

  // Open bin code
  async function openHandler(key) {
    // hide drawer
    setIsOpen(false);
    // refresh
    setRefresh(true);
    // get data bin
    const response = await GetDataKey(key);
    if (response.success) {
      let data = response.data;
      let obj = {
        key: data.key,
        title: data.title || `Untitled ${today()}`,
        public: data.public || false,
        created: data.create_at || today(),
        cssLinks: data.css_links || "",
        jsLinks: data.js_links || "",
        htmlContent: data.html_code || "Empty Content",
        cssContent: data.css_code || "*{box-sizing:border-box}",
        jsContent: data.js_code || "console.log('ready')",
        htmlContentType: data.html_type || "html",
        cssContentType: data.css_type || "css",
        jsContentType: data.js_type || "javascript",
      };
      setBin(obj);
      setLoadingFrame(true);
      setIsNew(false);
      setRefresh(false);
      setIframeUrl(`${location.origin}/api/preview/${data.key}`);
    }
  }

  // Create new bin code
  async function createHandler() {
    // Get the current date
    const currentDate = today();

    // Create an object with the data to save
    const obj = {
      title: bin.title || `Untitled ${currentDate}`,
      html_code: bin.htmlContent,
      html_type: bin.htmlContentType,
      css_code: bin.cssContent,
      css_type: bin.cssContentType,
      css_links: bin.cssLinks,
      js_code: bin.jsContent,
      js_type: bin.jsContentType,
      js_links: bin.jsLinks,
      public: bin.public,
      create_at: currentDate,
      update_at: currentDate,
    };

    // Save the data on the server
    const request = await CreateNewBin(obj);

    // Check if the save was successful
    if (request.success) {
      // Show a success message
      sendNotification(lang.successsave,true);

      // Clear input values
      updateBin("title", "");

      // Set isNew to false
      setIsNew(false);

      // Open the newly created bin
      openHandler(request.data.key);
    }
  }

  // Update bin code
  async function updateHandler() {
    // Get the current date
    const currentDate = today();

    // Create an object with the data to update
    const obj = {
      title: bin.title || `Untitled ${currentDate}`,
      html_code: bin.htmlContent,
      html_type: bin.htmlContentType,
      css_code: bin.cssContent,
      css_type: bin.cssContentType,
      css_links: bin.cssLinks,
      js_code: bin.jsContent,
      js_type: bin.jsContentType,
      js_links: bin.jsLinks,
      public: bin.public,
      create_at: bin.create_at,
      update_at: currentDate,
    };
    // Update the data on the server
    const request = await UpdateBin(bin.key, obj);

    // Check if the update was successful
    if (request.success) {
      // Activate the refresh indicator
      setRefresh(true);
      // Send code
      refIframe.current.contentWindow.postMessage(obj,"*");
      // Show a success message after a delay
      setTimeout(() => {
        // Deactivate the refresh indicator
        setRefresh(false);
        // Show a success message
        sendNotification(lang.successupdated,true);
      }, 800);
    } else {
      // Show an error message in case of failure
      sendNotification(lang.errorupdated,false);
    }
  }

  return (
    <BinContext.Provider value={bin}>
      <React.Suspense fallback={<Loader />}>
        <main className="app">
          <header className="app-header">
            <section className="app-header-left">
              <Button onClick={toggleDrawer} title={lang.openmenu}>
                <BiMenu />
              </Button>
              <Input
                name="title"
                id="title"
                required={true}
                type="text"
                value={bin.title}
                onChange={(e) => updateBin("title", e.target.value)}
                placeholder={lang.title}
                onKeyDown={saveBinOnKeyPressTitle}
              />
            </section>
            <section className="app-header-center">
              <h3>{lang.appname}</h3>
            </section>
            <section className="app-header-right">
              <Button onClick={toggleToNewCode} title={lang.createnew}>
                <BiPlus />
              </Button>
              {isNew ? (
                <Button
                  title={lang.savenew}
                  className="button-warning"
                  onClick={createOrUpdate}
                >
                  <BiSolidSave />
                </Button>
              ) : (
                <Button title={lang.updatecode} onClick={createOrUpdate}>
                  <BiSave />
                </Button>
              )}
              <Button onClick={toggleModalSettings} title={lang.modalsettings}>
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
            </section>
          </header>
          <section className="app-content">
            <Split
              sizes={[50, 50]}
              direction="horizontal"
              className="split-horizontal"
              minSize={1}
              onKeyDown={sendCodeOnEnter}
              ref={refHorSplit}
              gutterSize={2}
            >
              <div className="split-vertical">
                <Split
                  sizes={[33.33, 33.33, 33.33]}
                  direction="vertical"
                  className="split-vertical-code"
                  minSize={1}
                  ref={refVertSplit}
                  gutterSize={2}
                >
                  {codeBlocks.map((block, index) => (
                    <CodeBlock
                      key={index} // Cambia a una clave única si es necesario
                      idkey={block.key}
                      isPublic={block.public}
                      name={block.name}
                      active={block.active}
                      expand={block.expand}
                      content={block.content}
                      setContent={block.setContent}
                      type={block.type}
                      setType={block.setType}
                      values={block.values}
                      formatCode={block.formatCode}
                    />
                  ))}
                </Split>
              </div>
              <div className="split-vertical" style={{ position: "relative" }}>
                {refresh ? (
                  <Loader />
                ) : loadingFrame ? (
                  <iframe id="framePreview" title={lang.preview} src={iframSrc} ref={refIframe}></iframe>
                ) : (
                  <section className="infoFrame">
                      <img src={'./api/icons/512.png'} alt="" />
                      {lang.infoframe}
                  </section>
                )}
              </div>
            </Split>
          </section>

          <DrawerComponent
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            handleOpenBin={openHandler}
          />

          {isOpenSettings && (
          <WinBox
            noFull
            title={lang.settings}
            x="center"
            y="center"
            width={Math.min(document.body.clientWidth, 700)}
            height={Math.min(document.body.clientHeight, 420)}
            onClose={() => setIsOpenSettings(!isOpenSettings)}
          >
            <div style={{padding: '10px'}}>
              <Textarea
                required={false}
                name="cssLinks"
                id="cssLinksid"
                className="no-resize"
                error={bin.cssLinks.length > 150 ? "error" : ""}
                onChange={(e) => updateBin("cssLinks", e.target.value)}
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
                onChange={(e) => updateBin("jsLinks", e.target.value)}
                placeholder={lang.putyourlinks}
                value={bin.jsLinks}
                label={lang.jslinks}
                style={{ height: "7rem" }}
              />
              <Switch
                name="public"
                ischecked={bin.public ? "on" : "off"}
                onChange={() => updateBin("public", !bin.public)}
                title={lang.publiccode}
              />

              <a href={`${location.origin}/api/settings`} style={{color: "var(--light)"}}>{lang.moresettings}</a>
            </div>
          </WinBox>
          )}


          <ToastContainer theme="dark" />
        </main>
      </React.Suspense>
    </BinContext.Provider>
  );
}
