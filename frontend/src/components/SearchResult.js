import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd'

import RoadmapList from '../components/RoadmapList'

class SearchResult extends Component {

    render() {
        const { searchTerm, searchResult } = this.props;
        const numResults = searchResult.length
        console.log('searchResult', searchResult)
        return (
            <div className="search-result-container">
                <Row type="flex">
                    <Col span={6} className="search-filter">
                        <p>FILTER RESULTS</p>
                    </Col>
                    <Col span={18} className="search-result">
                        <p>{numResults} results for '{searchTerm}'</p>
                        <RoadmapList data={ searchResult } /> 
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('search result state', state)
    return {
        searchTerm: state.roadmap.searchTerm,
        searchResult: state.roadmap.searchResult
    }
}

export default connect(mapStateToProps, null)(SearchResult)
