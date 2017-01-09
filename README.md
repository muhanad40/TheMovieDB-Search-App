## How to run
1) Clone repo
```bash
git clone git@github.com:muhanad40/TheMovieDB-Search-App.git
```
2) `cd TheMovieDB-Search-App`
3) `npm open`

## Future improvements:

- Possibly link the titles to their actual pages on TMDB
- Ideally the API key should be stored in an environment variable. That way it stays outside the codebase.
- Either include the API key in a variable on the page (via Express) or store in a cookie
- It could really use a good design instead of Foundation :/
- Implement pagination or infinite scrolling to show more results
- Load default image if no `backdrop_path` is available
- Fix two failing tests