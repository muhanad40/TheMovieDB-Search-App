import themoviedb from '../themoviedb'

let searchTimer

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

export function storeConfiguration(configuration) {
    return {
        type: 'STORE_CONFIGURATION',
        configuration
    }
}

export function search(keywords) {
    return dispatch => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
            dispatch({
                type: 'SEARCH',
                keywords
            })

            themoviedb.search.getMulti({"query": keywords}, function onSearchSuccess(res) {
                let parsedRes = JSON.parse(res)

                dispatch(storeResults(parsedRes.results))
            }, function onSearchError() {})
        }, 300)
    }
}

export function fetchConfiguration() {
    return dispatch => {
        dispatch({
            type: 'FETCH_CONFIGURATION'
        })

        themoviedb.configurations.getConfiguration(function onConfigurationFetchSuccess(res) {
            let parsedRes = JSON.parse(res)

            dispatch(storeConfiguration(parsedRes))
        }, function onConfigurationFetchError() {})
    }
}