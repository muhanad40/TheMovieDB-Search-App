import React from "react"

export default function() {
    return <div>
        <div className="row align-center">
            <div className="column medium-7">
                <h1 className="text-center">The Movie DB</h1>

                <input type="text" onChange={ this.onChange.bind(this) } placeholder="Search for a movie, tv show, person..." />
            </div>
        </div>
    </div>
}