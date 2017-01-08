import React from "react"

export default function() {
    let data      = this.props.data,
        typesMap  = {
            "tv": "TV",
            "movie": "Movie"
        },
        mediaType = typesMap[data.media_type]

    return (
        <div>
            <div className="result row align-center">
                <div className="column medium-2">
                    <img className="result__img" src={ `${this.props.configuration.images.base_url}${this.props.configuration.images.logo_sizes[2]}${data.poster_path}` } />
                </div>

                <div className="column medium-5">
                    <h4 className="result__title">{ data.title }</h4>

                    <span className="result__type label">{ mediaType }</span>

                    <p className="result__overview">{ data.overview }</p>
                </div>
            </div>

            <div className="row align-center">
                <div className="column medium-7">
                    <hr/>
                </div>
            </div>
        </div>
    )
}