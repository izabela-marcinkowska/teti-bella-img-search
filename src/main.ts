import "./style.css";

const key = import.meta.env.VITE_ACCESS_KEY;

const searchForm = document.querySelector("#searchForm") as HTMLFormElement;
console.log(searchForm);
const resultsContainer = document.querySelector("#results") as HTMLElement;

const unsplashSearch = async (searchQuery: string) => {
  const fetchResult = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${key}`
  );
  const data = await fetchResult.json();
  return data;
};

const storeSearchQuery = (searchQuery: string) => {
  const storedSearchQuery = localStorage.getItem("prevSearches");
  const parsedQueries = JSON.parse(storedSearchQuery as string) || [];
  parsedQueries.push(searchQuery);
  localStorage.setItem("prevSearches", JSON.stringify(parsedQueries));
};

const getPrevSearches = () => {
  const storedSearchQuery = localStorage.getItem("prevSearches");
  const parsedQueries = JSON.parse(storedSearchQuery as string) || [];
  return parsedQueries;
};

const searches = getPrevSearches();
console.log(searches);

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const searchQuery = formData.get("searchQuery") as string;
  const searchResult = await unsplashSearch(searchQuery);
  storeSearchQuery(searchQuery);
  populateResults(searchResult.results);
  console.log(searchResult);
});

const populateResults = (results: any[]) => {
  results.forEach((item) => {
    const imageElement = document.createElement("img");
    imageElement.src = item.urls.small;
    imageElement.alt = item.description;
    resultsContainer.appendChild(imageElement);
  });
};
// unsplashSearch("bird").then((result) => {
//   console.log(result);
// });
