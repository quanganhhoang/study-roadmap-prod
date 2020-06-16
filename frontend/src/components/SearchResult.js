import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Radio } from 'antd'

import RoadmapList from '../components/RoadmapList'

class SearchResult extends Component {
    state = {
        voteValue: 1,
        feedbackValue: 1,
    };

    onVoteFilterChange = e => {
        this.setState({
            voteValue: e.target.value,
        });
    };

    onFeedbackFilterChange = e => {
        this.setState({
            feedbackValue: e.target.value,
        })
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const { searchTerm, searchResult } = this.props;
        const numResults = searchResult.length

        return (
            <div className="search-result-container">
                <Row type="flex" gutter={16}>
                    <Col span={6} className="search-filter">
                        <p styles={{}}>FILTER RESULTS</p>
                        <div className="filter-vote">
                            <p><strong>Number of votes</strong></p>
                            <Radio.Group 
                                onChange={this.onVoteFilterChange} 
                                value={this.state.voteValue}
                            >
                                <Radio style={radioStyle} value={1}>
                                    &lt;100
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    100-200
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    &gt;200
                                </Radio>
                                {/* <Radio style={radioStyle} value={4}>
                                    Enter min number of votes
                                    {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                </Radio> */}
                            </Radio.Group>
                        </div>
                        <div className="filter-feedback">
                            <p><strong>Number of feedback</strong></p>
                            <Radio.Group 
                                onChange={this.onFeedbackFilterChange} 
                                value={this.state.feedbackValue}
                            >
                                <Radio style={radioStyle} value={1}>
                                    &lt;100
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    100-200
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    &gt;200
                                </Radio>
                                {/* <Radio style={radioStyle} value={4}>
                                    Enter min number of votes
                                    {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                </Radio> */}
                            </Radio.Group>            
                        </div>
                    </Col>
                    <Col span={18} className="search-result">
                        <p>{numResults} results for &apos;{searchTerm}&apos;</p>
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
