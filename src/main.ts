import "./style.css";

const key = import.meta.env.VITE_ACCESS_KEY;

const unsplashSearch = async (searchQuery: string) => {
  const fetchResult = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${key}`
  );
  const data = await fetchResult.json();
  return data;
};

unsplashSearch("bird").then((result) => {
  console.log(result);
});
