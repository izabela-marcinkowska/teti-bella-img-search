import "./style.css";

const key = import.meta.env.VITE_ACCESS_KEY;

const searchForm = document.querySelector("#searchForm") as HTMLFormElement;
console.log(searchForm);

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

  console.log(searchResult);
});

// unsplashSearch("bird").then((result) => {
//   console.log(result);
// });
