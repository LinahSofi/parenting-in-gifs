console.log("JS connected!");

const form = document.getElementById("gif-form");
const searchInput = document.getElementById("search");
const limitInput = document.getElementById("limit");
const gifResults = document.getElementById("gif-results");

const API_KEY = "DSCCbDJgc6bpT9ncvcxIin8WZVPZMk4p"; // your real key

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();
  const limit = limitInput.value;

  if (!searchTerm) {
    alert("Please enter a search term!");
    return;
  }

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=${limit}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    gifResults.innerHTML = ""; // clear previous results

    if (data.data.length === 0) {
      gifResults.innerHTML = "<p>No results found 😢</p>";
      return;
    }

    data.data.forEach(gif => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      img.loading = "lazy";
      gifResults.appendChild(img);
    });
  } catch (err) {
    console.error("Error fetching from Giphy:", err);
    gifResults.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }

  form.reset();
});