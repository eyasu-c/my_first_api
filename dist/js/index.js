let previewWindow = document.getElementById("resultsLists");
let searchQuery = document.getElementById("searchQuery");
let jsonFileSrc = "dist/json/index.json";

searchQuery.oninput = (ev) => handleQuery(ev);

function handleQuery(event) {
  event.preventDefault();
  let result = event.target.value;

  let FileValue = async () => {
    let file = await fetch(jsonFileSrc);
    let data = await file.json();

    const match = data.filter((item) => {
      let regex = new RegExp(`^${result}`, "gi");
      return item.name.match(regex) || item.abbr.match(regex);
    });
    result.length > 0
      ? (previewWindow.innerHTML = returnOutput(match))
      : (previewWindow.innerHTML = " ");
  };
  FileValue();
}
function returnOutput(value) {
  return value.map(
    (item, idx) =>
      `<div key=${idx} class="results">
        <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgb(58, 58, 58)"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path
            d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
              ></path>
            </svg>
          </div>
          <div>
        <span>${item.name}</span>
         </div>
         <div>
        <code>${item.abbr}</code>
      </div>
    </div>`
  );
}
