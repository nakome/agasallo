// import
import { Base } from "https://cdn.deta.space/js/deta@latest/deta.mjs";

// Connect to or create a Base
const db = Base("bins");

/** ---------------------------------
 * - Import Json file
 * ----------------------------------- */
const input_import = document.getElementById("input-import");
const btn_import = document.getElementById("btn-import");
btn_import.addEventListener("click", handleImport, false);

function handleImport(evt) {
  evt.preventDefault();
  btn_import.textContent = "Importing...";
  if (input_import.value !== "") {
    // Disabled bottons
    btn_import.setAttribute("disabled", true);
    btn_import.classList.add("button-loading");
    // Import json
    importJson(input_import.files[0]).then((r) => {
      alert(r.msg);
      btn_import.textContent = "Import";
      btn_import.removeAttribute("disabled");
      btn_import.classList.remove("button-loading");
    });
  }
  return false;
}

/**
 * Import Json file
 *
 * @param {file} file
 * @returns
 */
async function importJson(file) {
  const lector = new FileReader();
  const outputPromise = new Promise((resolve) => {
    lector.onload = () => {
      const data = JSON.parse(lector.result);
      resolve(sendFile(data));
    };
  });
  lector.readAsText(file);
  const output = await outputPromise;
  return output;
}

/**
 * Send file with params
 *
 * @param {object} params
 * @returns
 */
async function sendFile(params) {
  const url = `${location.origin}/api/import/data`;
  const options = {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await fetch(url, options);
  const output = await response.json();
  return output;
}

/** ---------------------------------
 * - Import raw url
 * ----------------------------------- */
const rawUrl = document.getElementById("rawUrl");
const importRawUrl = document.getElementById("importRawUrl");
importRawUrl.addEventListener("click", handleImportRawUrl);

/**
 * Import handler
 */
function handleImportRawUrl(evt) {
  evt.preventDefault();
  let url = rawUrl.value;
  if (url.length) {
    // Disabled input & add class button
    rawUrl.setAttribute("disabled", true);
    importRawUrl.classList.add("button-loading");
    // Import url raw
    ImportRawUrl(url).then((response) => {
      rawUrl.removeAttribute("disabled");
      rawUrl.value = "";
      importRawUrl.textContent = "Import url";
      importRawUrl.classList.remove("button-loading");
      if (response !== undefined && response !== null) {
        // Values you want to check in the array
        const expectedValues = [
          "create_at",
          "css_code",
          "css_links",
          "css_type",
          "html_code",
          "html_type",
          "js_code",
          "js_links",
          "js_type",
          "key",
          "public",
          "title",
          "update_at",
        ];
        // Check values
        const checkValuesIfExists = expectedValues.every((val) =>
          Object.prototype.hasOwnProperty.call(response, val)
        );
        // If error show msg
        if (!checkValuesIfExists) {
          alert("Some objects in the array do not contain expected values.");
          return false;
        }
        // Insert response
        db.insert(response)
          .then((r) =>
            r.title ? alert("Success to import data, check result in app.") : ""
          )
          .catch((r) => alert(r));
      }
      return false;
    });
  }
}

/**
 * Fetch data and check if response is valid
 *
 * @param {string} url
 * @returns
 */
async function ImportRawUrl(url) {
  try {
    const response = await fetch(url);
    console.log(response);
    const result = await response.json();
    if (result && result.success) {
      if (result.data === null) {
        alert("Error on retrive url, check if url contains correct data.");
      }
      return result.data;
    } else {
      alert("Error on retrieve URL, check the response format.");
      return null;
    }
  } catch (error) {
    alert("Error while fetching or parsing data");
    console.error("Error while fetching or parsing data:", error);
    return null;
  }
}

/** ---------------------------------
 * - Export to Json
 * ----------------------------------- */
document.getElementById("export").addEventListener("click", exportJson);

/**
 * Export Json file
 */
async function exportJson() {
  const response = await db.fetch();
  const output = response.items;
  const json = JSON.stringify(output);
  const blob = new Blob([json], { type: "application/json" });
  if (navigator.msSaveBlob) {
    // Para Internet Explorer
    navigator.msSaveBlob(blob, "backup.json");
  } else {
    // Create element link
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "backup.json");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
