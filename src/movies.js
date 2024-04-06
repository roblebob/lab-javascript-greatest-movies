// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return Array.from(new Set(moviesArray.map((movie) => movie.director)));
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.reduce(
    (acc, curr) =>
      curr.director === "Steven Spielberg" && curr.genre.includes("Drama")
        ? acc + 1
        : acc,
    0
  );
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  return !moviesArray.length
    ? 0
    : Number(
        (
          moviesArray.reduce(
            (acc, curr) =>
              acc + (typeof curr.score === "number" ? curr.score : 0),
            0
          ) / moviesArray.length
        ).toFixed(2)
      );
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  return scoresAverage(
    moviesArray.filter((movie) => movie.genre.includes("Drama"))
  );
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray
    .slice()
    .sort((a, b) =>
      a.year !== b.year ? a.year - b.year : a.title.localeCompare(b.title)
    );
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const result = moviesArray
    .map((movie) => movie.title)
    .sort((a, b) => a.localeCompare(b));
  return result.length > 20 ? result.slice(0, 20) : result;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let deepCopy = JSON.parse(JSON.stringify(moviesArray));
  deepCopy = deepCopy.map((movie) => {
    movie.duration = durationToMinutes(movie.duration);
    return movie;
  });
  return deepCopy;
}

function durationToMinutes(durationString) {
  return durationString
    .split(/h *|min/)
    .filter((el) => el)
    .map((el) => Number(el))
    .reduce((acc, curr, index) => acc + (index === 0 ? curr * 60 : curr), 0);
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }

  const years = new Set(moviesArray.map((movie) => movie.year));

  let count = {};

  for (const year of years) {
    count[year] = scoresAverage(
      moviesArray.filter((movie) => movie.year === year)
    );
  }

  const maxAvg = Object.values(count).sort().reverse()[0];

  for (const year of years) {
    if (count[year] !== maxAvg) {
      delete count[year];
    }
  }

  let bestYears = Object.keys(count)
    .map((el) => Number(el))
    .sort();

  return `The best year was ${bestYears[0]} with an average score of ${maxAvg}`;
}
