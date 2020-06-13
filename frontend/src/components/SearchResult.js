import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd'

import RoadmapList from '../components/RoadmapList'

class SearchResult extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.roadmap.searchTerm !== this.props.roadmap.searchTerm
    }

    render() {
        const { searchTerm, searchResult } = this.props;
        console.log('searchResult', searchResult)
        return (
            <div className="search-result-container">
                <Row type="flex">
                    <Col span={6} className="search-filter">
                        <p>FILTER RESULTS</p>
                    </Col>
                    <Col span={18} className="search-result">
                        <p>120 results for '{searchTerm}'</p>
                        <RoadmapList data={ searchResult } /> 
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchTerm: state.roadmap.searchTerm,
        searchResult: state.roadmap.searchResult
    }
}

export default connect(mapStateToProps, null)(SearchResult)
