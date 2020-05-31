import React from 'react'

const DisciplineCard = (props) => {
    const disciplineThumbnail = props.thumbnail || "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/517_240659_tech.hero.jpg"
    return (
        <div className="dashboard-discipline-container">
            <img src={disciplineThumbnail} width="270" height="140"></img>
            <div className="text_over_image">Welcome to my Sandbox</div>
        </div>
    )
}

export default DisciplineCard

