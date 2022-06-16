/* eslint-disable no-undef */
const BASEURL = process.env.REACT_APP_BASE_URL;
const APIKEY = process.env.REACT_APP_API_KEY;

export async function startGuestSession() {
  if (!localStorage.getItem('guestSessionId')) {
    const guestUrl = `${BASEURL}/authentication/guest_session/new?api_key=${APIKEY}`;
    const response = await fetch(guestUrl);
    if (!response.ok) {
      throw new Error(`Failed to load guest session with status: ${response.status}`);
    }
    const guestSession = await response.json();
    localStorage.setItem('guestSessionId', guestSession.guest_session_id);
    return localStorage.getItem('guestSessionId');
  } else {
    return localStorage.getItem('guestSessionId');
  }
}

export async function fetchGenres() {
  const genresUrl = `${BASEURL}/genre/movie/list?api_key=${APIKEY}`;
  const response = await fetch(genresUrl);
  if (!response.ok) {
    throw new Error(`Failed to load genre list with status: ${response.status}`);
  }
  const genres = await response.json();
  return genres;
}

export async function rateMovie(movie, rate, guestId) {
  if (rate > 0) {
    const url = new URL(`
    ${BASEURL}/movie/${movie.id}/rating?api_key=${APIKEY}&guest_session_id=${guestId}`);
    const body = {
      value: rate,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
  }
  if (rate === 0) {
    const url = new URL(`
    ${BASEURL}/movie/${movie.id}/rating?api_key=${APIKEY}&guest_session_id=${guestId}`);
    return await fetch(url, {
      method: 'DELETE',
    });
  }
}

export async function fetchRatedMovies() {
  const guestId = localStorage.getItem('guestSessionId');
  const response = await fetch(`${BASEURL}/guest_session/${guestId}/rated/movies?api_key=${APIKEY}`);
  if (!response.ok) {
    throw new Error(`Error with Status code: ${response.status}`);
  }
  const movies = await response.json();
  return movies;
}

export async function fetchSearchMovies(pageNumber, searchQuery) {
  const query = searchQuery === '' ? 'return' : encodeURIComponent(searchQuery);
  const response = await fetch(`${BASEURL}/search/movie?api_key=${APIKEY}&query=${query}&page=${pageNumber}`);
  if (!response.ok) {
    throw new Error(`Error with Status code: ${response.status}`);
  }
  const movies = await response.json();
  return movies;
}
