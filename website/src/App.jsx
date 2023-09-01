import React from "react";
//https://fkhadra.github.io/react-toastify/introduction
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// https://react-icons.github.io/react-icons/icons?name=bi
import {
  BiSave,
  BiPlus,
  BiCog,
  BiMenu,
  BiSolidSave,
  BiRocket,
} from "react-icons/bi";
//https://split.js.org/
import Split from "react-split";
// Components
import {
  MainApp,
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  MainContent,
} from "./components/Bones";

import { Input, Textarea, Button, Switch } from "./components/Forms";
import { Loader } from "./components/Loader";
// Api
import { GetDataKey } from "./api/GetData";
import { CreateNewBin, UpdateBin } from "./api/PostData";
// Utils
import { today } from "./utils/Date";
// Language
import lang from "./config/language.json";

const ModalView = React.lazy(() => import("./components/ModalView"));
const DrawerContainer = React.lazy(() =>
  import("./components/DrawerContainer")
);
const CodeBlock = React.lazy(() => import("./components/Code"));

// App
export default function App() {
  const [key, setKey] = React.useState("");
  const [title, setTitle] = React.useState("Untitled " + today());
  const [isPublic, setPublic] = React.useState(false);
  const [created, setCreated] = React.useState("");
  const [cssLinks, setCssLinks] = React.useState("");
  const [jsLinks, setJsLinks] = React.useState("");
  const [htmlContent, setHtmlContent] = React.useState("");
  const [cssContent, setCssContent] = React.useState("");
  const [jsContent, setJsContent] = React.useState("");
  const [htmlContentType, setHtmlContentType] = React.useState("html");
  const [jsContentType, setJsContentType] = React.useState("javascript");
  const [cssContentType, setCssContentType] = React.useState("css");
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
  const refVertSplit = React.useRef(null);
  // Modal and drawer handlers
  const toggleModalSettings = () =>
    setIsOpenSettings((prevState) => !prevState);
  // On toggle drawer load code
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);
  // Collapse blocks
  const toggleCollapseBlocks = (num) => {
    setIsExpanded((prevState) => !prevState);
    switch (num) {
      case 0:
        isExpanded
          ? refVertSplit.current.split.setSizes([100, 0, 0])
          : refVertSplit.current.split.setSizes([33.33, 33.33, 33.33]);
        break;
      case 1:
        isExpanded
          ? refVertSplit.current.split.setSizes([0, 100, 0])
          : refVertSplit.current.split.setSizes([33.33, 33.33, 33.33]);
        break;
      case 2:
        isExpanded
          ? refVertSplit.current.split.setSizes([0, 0, 100])
          : refVertSplit.current.split.setSizes([33.33, 33.33, 33.33]);
        break;
    }
  };
  // On press Ctrl+s save data
  const saveDataOnKeyPress = (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); // Prevenir el comportamiento predeterminado de Ctrl+S
      if (isNew) {
        handleCreateNewCode();
      } else {
        handleUpdateCode();
      }
    }
  };
  // On press Ctrl+s save data
  const saveDataOnKeyPressTitle = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevenir el comportamiento predeterminado de Ctrl+S
      if (isNew) {
        handleCreateNewCode();
      } else {
        handleUpdateCode();
      }
    }
  };
  // Open bin
  const handleOpenBin = async (key) => {
    // hide drawer
    setIsOpen(false);
    setRefresh(true);
    const response = await GetDataKey(key);
    if (response.success) {
      let data = response.data;
      // Set data
      setKey(data.key);
      setTitle(data.title || `Untitled ${today()}`);
      setPublic(data.public || false);
      setCssLinks(data.css_links || "");
      setJsLinks(data.js_links || "");
      setHtmlContent(data.html_code || "Empty Content");
      setCssContent(data.css_code || "*{box-sizing:border-box}");
      setJsContent(data.js_code || "console.log('ready')");
      setHtmlContentType(data.html_type || "html");
      setCssContentType(data.css_type || "css");
      setJsContentType(data.js_type || "javascript");
      setCreated(data.create_at || today());
      setLoadingFrame(true);
      setIsNew(false);
      setRefresh(false);
      setIframeUrl(`${location.origin}/api/preview/${data.key}`);
    }
  };
  // Toggle to new code
  const toggleToNewCode = () => {
    // Set data
    setKey("");
    setTitle(`Untitled ${today()}`);
    setPublic(false);
    setCssLinks("");
    setJsLinks("");
    setHtmlContent("<h1>Ready</h1>");
    setCssContent("*{box-sizing:border-box;}");
    setJsContent("console.log('ready')");
    setHtmlContentType("html");
    setCssContentType("css");
    setJsContentType("javascript");
    setCreated("");
    // hide drawer
    setIsOpen(false);
    setIsNew(true);
    setLoadingFrame(true);
    setIframeUrl("");
  };
  // Save New Modal
  async function handleCreateNewCode() {
    // Objects
    let arr = {
      title: title || `Untitled ${today()}`,
      html_code: htmlContent,
      html_type: htmlContentType,
      css_code: cssContent,
      css_type: cssContentType,
      css_links: cssLinks,
      js_code: jsContent,
      js_type: jsContentType,
      js_links: jsLinks,
      public: isPublic,
      create_at: today(),
      update_at: today(),
    };

    const request = await CreateNewBin(arr);
    if (request.success) {
      // Show info
      toast.success(lang.successsave, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // clear inputs
      setTitle("");
      setIsNew(false);
      handleOpenBin(request.data.key);
    }
  }
  // Save code
  async function handleUpdateCode() {
    // Objects
    let arr = {
      title: title || `Untitled ${today()}`,
      html_code: htmlContent,
      html_type: htmlContentType,
      css_code: cssContent,
      css_type: cssContentType,
      css_links: cssLinks || "",
      js_code: jsContent,
      js_type: jsContentType,
      js_links: jsLinks || "",
      public: isPublic || false,
      create_at: created,
      update_at: today(),
    };
    // Update data
    const request = await UpdateBin(key, arr);
    if (request.success) {
      setRefresh(true);
      // Reload frame
      refIframe.current.contentWindow.location.reload(true);
      // Show info
      toast.info(lang.successupdated, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Show preloader
      let w = setTimeout(() => {
        setRefresh(false);
        clearTimeout(w);
      }, 800);
    } else {
      // Show info
      toast.error(lang.errorupdated);
    }
  }
  return (
    <React.Suspense fallback={<Loader />}>
      <MainApp>
        <Header>
          <HeaderLeft>
            <Button onClick={toggleDrawer} title={lang.openmenu}>
              <BiMenu />
            </Button>
            <Input
              name="title"
              id="title"
              required={true}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lang.title}
              onKeyDown={saveDataOnKeyPressTitle}
            />
          </HeaderLeft>
          <HeaderCenter>
            <h3>{lang.appname}</h3>
          </HeaderCenter>
          <HeaderRight>
            <Button onClick={toggleToNewCode} title={lang.createnew}>
              <BiPlus />
            </Button>
            {isNew ? (
              <Button
                title={lang.savenew}
                className="button-warning"
                onClick={handleCreateNewCode}
              >
                <BiSolidSave />
              </Button>
            ) : (
              <Button title={lang.updatecode} onClick={handleUpdateCode}>
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
              href="https://monchovarela.es"
              title={lang.aboutus}
            >
              <BiRocket />
            </a>
          </HeaderRight>
        </Header>
        <MainContent>
          <Split
            sizes={[50, 50]}
            direction="horizontal"
            className="split-horizontal"
            minSize={1}
            onKeyDown={saveDataOnKeyPress}
          >
            <div className="split-vertical">
              <Split
                sizes={[33.33, 33.33, 33.33]}
                direction="vertical"
                className="split-vertical-code"
                minSize={1}
                ref={refVertSplit}
              >
                <CodeBlock
                  name="htmlfield"
                  active={isExpanded}
                  expand={() => toggleCollapseBlocks(0)}
                  content={htmlContent}
                  setContent={(value, viewUpdate) => setHtmlContent(value)}
                  type={htmlContentType || "html"}
                  setType={(evt) => setHtmlContentType(evt.target.value)}
                  values={["html", "markdown"]}
                />
                <CodeBlock
                  name="cssfield"
                  active={isExpanded}
                  expand={() => toggleCollapseBlocks(1)}
                  content={cssContent}
                  setContent={(value, viewUpdate) => setCssContent(value)}
                  type={cssContentType || "css"}
                  setType={(evt) => setCssContentType(evt.target.value)}
                  values={["css", "sass"]}
                />
                <CodeBlock
                  name="jsfield"
                  active={isExpanded}
                  expand={() => toggleCollapseBlocks(2)}
                  content={jsContent}
                  setContent={(value, viewUpdate) => setJsContent(value)}
                  type={jsContentType || "javascript"}
                  setType={(evt) => setJsContentType(evt.target.value)}
                  values={["javascript", "typescript"]}
                />
              </Split>
            </div>
            <div className="split-vertical" style={{ position: "relative" }}>
              {refresh ? (
                <Loader />
              ) : loadingFrame ? (
                <iframe
                  title={lang.preview}
                  src={iframSrc}
                  ref={refIframe}
                ></iframe>
              ) : (
                <section className="infoFrame">{lang.infoframe}</section>
              )}
            </div>
          </Split>
        </MainContent>
        <DrawerContainer
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          handleOpenBin={handleOpenBin}
        />
        <ModalView
          title={lang.settings}
          height={27}
          active={isOpenSettings}
          closeModal={toggleModalSettings}
        >
          <Textarea
            required={false}
            name="cssLinks"
            id="cssLinksid"
            className="no-resize"
            error={cssLinks.length > 150 ? "error" : ""}
            onChange={(e) => setCssLinks(e.target.value)}
            placeholder={lang.putyourlinks}
            value={cssLinks}
            label={lang.csslinks}
            style={{ height: "7rem" }}
          />
          <Textarea
            required={false}
            className="no-resize"
            name="jsLinks"
            id="jsLinksid"
            error={jsLinks.length > 150 ? "error" : ""}
            onChange={(e) => setJsLinks(e.target.value)}
            placeholder={lang.putyourlinks}
            value={jsLinks}
            label={lang.jslinks}
            style={{ height: "7rem" }}
          />
          <Switch
            name="public"
            ischecked={isPublic ? "on" : "off"}
            value={isPublic}
            onChange={() => setPublic(!isPublic)}
            title={lang.publiccode}
          />
        </ModalView>
        <ToastContainer theme="dark" />
      </MainApp>
    </React.Suspense>
  );
}
