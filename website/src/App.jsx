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
  BiLogoGithub,
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

  const [bin,setBin] = React.useState({
    key: "",
    title: `Unlited ${today()}`,
    public: false,
    created: "",
    cssLinks: "",
    jsLinks: "",
    htmlContent: "",
    cssContent:"",
    jsContent: "",
    htmlContentType: "html",
    cssContentType: "css",
    jsContentType: "javascript",
  })

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
  const toggleModalSettings = () => setIsOpenSettings((prevState) => !prevState);

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
        cssContent:data.css_code || "*{box-sizing:border-box}",
        jsContent: data.js_code || "console.log('ready')",
        htmlContentType: data.html_type || "html",
        cssContentType: data.css_type || "css",
        jsContentType: data.js_type || "javascript",
      }

      setBin((prevState) => {
        return { ...prevState, ...obj };
      });

      setLoadingFrame(true);
      setIsNew(false);
      setRefresh(false);
      setIframeUrl(`${location.origin}/api/preview/${data.key}`);
    }
  };



  // Toggle to new code
  const toggleToNewCode = () => {
    // Set data
    let obj = {
      key: "",
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
    }

    setBin((prevState) => {
      return { ...prevState, ...obj };
    });

    // hide drawer
    setIsOpen(false);
    setIsNew(true);
    setLoadingFrame(true);
    setIframeUrl("");
  };


  // Save New Modal
  async function handleCreateNewCode() {
    // Objects
    let obj = {
      title: bin.title || `Untitled ${today()}`,
      html_code: bin.htmlContent,
      html_type: bin.htmlContentType,
      css_code: bin.cssContent,
      css_type: bin.cssContentType,
      css_links: bin.cssLinks,
      js_code: bin.jsContent,
      js_type: bin.jsContentType,
      js_links: bin.jsLinks,
      public: bin.public,
      create_at: today(),
      update_at: today(),
    };

    const request = await CreateNewBin(obj);
    if (request.success) {
      // Show info
      toast.success(lang.successsave, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // clear inputs
      updateBin("title","");
      setIsNew(false);
      handleOpenBin(request.data.key);
    }
  }

  // Save code
  async function handleUpdateCode() {
    // Objects
    let obj = {
      title: bin.title || `Untitled ${today()}`,
      html_code: bin.htmlContent,
      html_type: bin.htmlContentType,
      css_code: bin.cssContent,
      css_type: bin.cssContentType,
      css_links: bin.cssLinks || "",
      js_code: bin.jsContent,
      js_type: bin.jsContentType,
      js_links: bin.jsLinks || "",
      public: bin.public || false,
      create_at: bin.created,
      update_at: today(),
    };
    // Update data
    const request = await UpdateBin(bin.key, obj);
    if (request.success) {
      // refresh
      setRefresh(true);
      // Reload frame
      refIframe.current.contentWindow.location.reload(true);
      // Show info
      toast.info(lang.successupdated, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Show preloader
      let w = setTimeout(() => {
        // refresh
        setRefresh(false);
        clearTimeout(w);
      }, 800);
    } else {
      // Show info
      toast.error(lang.errorupdated);
    }
  }


  function updateBin(name, val) {
    setBin({
      ...bin,
      [name]: val
    });
  };

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
              value={bin.title}
              onChange={(e) => updateBin("title",e.target.value)}
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
              href="https://github.com/nakome/agasallo"
              title="Github"
            >
              <BiLogoGithub />
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
                  content={bin.htmlContent}
                  setContent={(value, viewUpdate) => updateBin("htmlContent",value)}
                  type={bin.htmlContentType || "html"}
                  setType={(evt) => updateBin("htmlContentType",evt.target.value)}
                  values={["html", "markdown"]}
                />
                <CodeBlock
                  name="cssfield"
                  active={isExpanded}
                  expand={() => toggleCollapseBlocks(1)}
                  content={bin.cssContent}
                  setContent={(value, viewUpdate) => updateBin("cssContent",value)}
                  type={bin.cssContentType || "css"}
                  setType={(evt) => updateBin("cssContentType",evt.target.value)}
                  values={["css", "sass"]}
                />
                <CodeBlock
                  name="jsfield"
                  active={isExpanded}
                  expand={() => toggleCollapseBlocks(2)}
                  content={bin.jsContent}
                  setContent={(value, viewUpdate) => updateBin("jsContent",value)}
                  type={bin.jsContentType || "javascript"}
                  setType={(evt) => updateBin("jsContentType",evt.target.value)}
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
            error={bin.cssLinks.length > 150 ? "error" : ""}
            onChange={(e) => updateBin("cssLinks",e.target.value)}
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
            onChange={(e) => updateBin("jsLinks",e.target.value)}
            placeholder={lang.putyourlinks}
            value={bin.jsLinks}
            label={lang.jslinks}
            style={{ height: "7rem" }}
          />
          <Switch
            name="public"
            ischecked={bin.public ? "on" : "off"}
            value={bin.public}
            onChange={() => updateBin("public",!bin.public)}
            title={lang.publiccode}
          />
        </ModalView>
        <ToastContainer theme="dark" />
      </MainApp>
    </React.Suspense>
  );
}
