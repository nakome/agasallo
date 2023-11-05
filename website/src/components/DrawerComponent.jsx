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

export default function DrawerComponent(props) {
  // Search
  const [searchTitle, setSearchTitle] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadDataOnDrawer();
  }, [props.isOpen]);

  // search input function
  const handleSearchDrawerData = React.useCallback((event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        loadDataOnDrawer();
      } else {
        loadSearchDataOnDrawer();
      }
    }
  });

  // Delete bin
  const handleDeleteBin = React.useCallback(async (key) => {
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
  });

  // Function to load data
  async function loadDataOnDrawer() {
    if(props.isOpen) {
      setLoading(true);
      // Call GetAllData with the current number of items to load.
      const response = await GetAllData();
      if (response.success) {
        setData(response.data);
        setLoading(false);
      }
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
      <header className="drawer-header">
        <InputSearch
          id="Search"
          name="Search"
          required={true}
          value={searchTitle}
          onChange={(evt) => setSearchTitle(evt.target.value)}
          onKeyPress={handleSearchDrawerData}
          placeholder={lang.searchtitle}
        />
      </header>
      <section className="drawer-body">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((item, index) => (
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
    </Drawer>
  );
}
