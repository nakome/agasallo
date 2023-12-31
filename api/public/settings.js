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
    // Disable buttons
    btn_import.setAttribute("disabled", true);
    btn_import.classList.add("button-loading");

    importJson(input_import.files[0]).then(() => {
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
 * @param {file} file - The JSON file to import
 * @returns {Promise} A promise that resolves with the imported data
 */
async function importJson(file) {
  // Create a new FileReader object
  const reader = new FileReader();

  // Create a promise that resolves when the file is loaded
  const fileLoadedPromise = new Promise((resolve) => {
    // Set the onload event handler for the reader
    reader.onload = () => {
      // Parse the loaded data as JSON
      const data = JSON.parse(reader.result);

      // Resolve the promise with the imported data
      resolve(sendFile(data));
    };
  });

  // Read the file as text
  reader.readAsText(file);

  // Wait for the file to be loaded and return the output
  const output = await fileLoadedPromise;
  return output;
}

// Function to send the file
async function sendFile(data) {
  // Get element with id "import_msg".
  let info = document.getElementById("import_msg");
  let count = 0;

  // Add import message
  info.innerHTML += `<div class="info_success">Please wait, importing data 20 by 20...</div>`;

  // Verify if the imported file is an array
  if (!Array.isArray(data)) {
    info.innerHTML += '<div class="info_error">Error, the import file is not an array..</div>';
  }

  // Values to be checked in the array
  const expectedValues = ["create_at", "css_code", "css_links", "css_type", "html_code", "html_type", "js_code", "js_links", "js_type", "key", "public", "title", "update_at"];

  // Check if all objects in the array contain the expected values
  const areValuesPresentInAllObjects = data.every(obj =>
    expectedValues.every(key => obj.hasOwnProperty(key))
  );

  // Show error message if not all expected values are found in the objects.
  if (!areValuesPresentInAllObjects) {
    info.innerHTML += '<div class="info_error">Some objects in the array do not contain the expected values..</div>';
  }

  // Insert objects 20 at a time
  const groupOfElements = [];
  for (let i = 0; i < data.length; i += 20) {
    count = i + 20;
    groupOfElements.push(data.slice(i, count));
  }

  // Insert objects into the database
  for (const group of groupOfElements) {
    try {
      let output = await db.putMany([...group]);
      if (output.processed) {
        let total = output.processed.items.length;
        info.innerHTML += `<div class="info_success">Successful data import, total: ${total} objects</div>`;
      }
    } catch (error) {
      console.error('Error al insertar elementos:', error);
      info.innerHTML += `<div class="info_error">Error inserting elements into the database.</div>`;
    }
  }

  // Show import completion message
  info.innerHTML += '<div class="info_success">Completion of data import</div>';
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
  let info = document.getElementById('import_url_msg');
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
          info.innerHTML += '<div class="info_error">Some objects in the array do not contain expected values.</div>';
          return false;
        }
        // Insert response
        db.insert(response)
          .then((r) =>
            r.title
              ? (info.innerHTML +=
                  '<div class="info_success">Success to import data, check result in app.</div>')
              : ""
          )
          .catch(
            (r) => (info.innerHTML += `<div class="info_error">${r}</div>`)
          );
        info.innerHTML += `<div class="info_success">Finish import raw.</div>`
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
  let info = document.getElementById('import_url_msg');
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result && result.success) {
      if (result.data === null) {
        info.innerHTML += '<div class="info_error">Error on retrive url, check if url contains correct data.</div>';
      }
      return result.data;
    } else {
      info.innerHTML += '<div class="info_error">Error on retrieve URL, check the response format.</div>';
      return null;
    }
  } catch (error) {
    info.innerHTML += '<div class="info_error">Error while fetching or parsing data.</div>';
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
