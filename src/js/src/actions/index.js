import themoviedb from '../themoviedb'

// NOTE: This is bad. In a proper production application,
// this should be stored in an environment variable and
// inserted in a variable on the page
themoviedb.common.api_key = 'd8c0f9e129780554d39905018e863c97'

export function storeResults(results) {
    return {
        type: 'STORE_RESULTS',
        results
    }
}

export function clearResults() {
    return {
        type: 'CLEAR_RESULTS'
    }
}

export function search(keywords) {
    return dispatch => {
        dispatch({
            type: 'SEARCH',
            keywords
        })

        themoviedb.search.getMulti({"query": keywords}, function onSearchSuccess(res) {
            let parsedRes = JSON.parse(res)

            dispatch(storeResults(parsedRes))
        }, function onSearchError() {})
    }
}