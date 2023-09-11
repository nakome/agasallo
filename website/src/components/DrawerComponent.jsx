import React from "react";

//https://fkhadra.github.io/react-toastify/introduction
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// https://www.npmjs.com/package/react-modern-drawer
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { SearchData, GetAllData } from "../api/GetData";
import { DeleteBin } from "../api/PostData";

// Components
import { InputSearch } from "../ui/Forms";
import EmptyDb from "../ui/EmptyDb";
import Card from "../ui/Card";
import { Loader } from "../ui/Loader";

// language
import lang from "../config/language.json";

const DrawerHeader = (props) => (
  <header className="drawer-header" {...props}>
    {props.children}
  </header>
);
const DrawerBody = (props) => (
  <section className="drawer-body" {...props}>
    {props.children}
  </section>
);

export default function DrawerComponent(props) {
  // Search
  const [searchTitle, setSearchTitle] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // search input function
  const handleSearchDrawerData = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        loadDataOnDrawer();
      } else {
        loadSearchDataOnDrawer();
      }
    }
  };

  React.useEffect(() => {
    loadDataOnDrawer();
  }, [props.isOpen]);

  // Delete bin
  const handleDeleteBin = async (key) => {
    if (confirm(lang.areyousure)) {
      const request = await DeleteBin(key);
      if (request.success) {
        toast.success(lang.coderemoved, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        loadDataOnDrawer();
      } else {
        toast.error(lang.coderemovederr);
      }
    }
  };

  // Load data on open drawer
  async function loadDataOnDrawer() {
    setLoading(true);
    const response = await GetAllData();
    if (response.success) {
      setData(response.data);
      setLoading(false);
    }
  }

  // Search data on drawer
  async function loadSearchDataOnDrawer() {
    setLoading(true);
    const response = await SearchData(searchTitle);
    if (response.success) {
      setData(response.data);
      setLoading(false);
    }
  }

  return (
    <Drawer
      open={props.isOpen}
      onClose={props.toggleDrawer}
      direction="left"
      className="drawer-menu"
    >
      <DrawerHeader>
        <InputSearch
          id="Search"
          name="Search"
          required={true}
          value={searchTitle}
          onChange={(evt) => setSearchTitle(evt.target.value)}
          onKeyPress={handleSearchDrawerData}
          placeholder={lang.searchtitle}
        />
      </DrawerHeader>
      <DrawerBody>
        <section
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {loading ? (
            <Loader />
          ) : data.count > 0 ? (
            data.items.map((item, index) => (
              <Card
                openBin={() => props.handleOpenBin(item.key)}
                deleteBin={() => handleDeleteBin(item.key)}
                key={item.key}
                data={item}
              />
            ))
          ) : (
            <EmptyDb />
          )}
        </section>
      </DrawerBody>
    </Drawer>
  );
}
