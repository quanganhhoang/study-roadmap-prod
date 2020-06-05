import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Input, Tag, Tooltip, Button, Row, Col, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const CategoryEnum = {
    "Engineering": 0,
    "Business": 1,
    "Finance": 2,
    "Sports": 3,
    "Life Hack": 4,
    "Culinary": 5,
    "Entrepreneurship": 6,
    "Education": 7,
    "Health": 8,
    "Other": 9
}

class CreateRoadmap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            authorId: null,
            roadmapDescription: '',
            // tags
            tags: ['software', 'engineer', 'hobby'],
            visible: true,
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
            // tags
            
            // roadmap
            roadmapTitle: '',
            roadmapDescription: '',
            roadmapCategory: "OTHER",
            roadmapLevel: 0,
            // roadmap

            // roadmap steps
            numMilestones: 1,
            milestones: [{
                title: "",
                content: "",
                link: "",
                id: 1
            }],
        }
    }

    // functions for handling tags
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };
    
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };
    
    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };
    
    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };
    
    saveInputRef = input => (this.input = input);

    saveEditInputRef = input => (this.editInput = input);

    onChangeNewTag = (e) => {
        this.setState(() => {
            return {
                inputValue: e.target.value
            }
        });
    };

    // functions for handling tags

    // functions for saving roadmap details
    onChangeRoadmapTitle = (e) => {
        e.preventDefault();
        const { value } = e.target
        this.setState(() => {
            return {
                roadmapTitle: value
            }
        })
    }

    onChangeRoadmapDescription = (e) => {
        e.preventDefault();
        const { value } = e.target
        this.setState(() => {
            return {
                roadmapDescription: value
            }
        })
    }

    onChangeRoadmapCategory = (value) => {
        this.setState(() => {
            return {
                roadmapCategory: value.toUpperCase()
            }
        })
    }

    onChangeRoadmapLevel = (value) => {
        this.setState(() => {
            return {
                roadmapLevel: value
            }
        })
    }

    // functions for saving roadmap details

    // functions for adding roadmap steps
    handleAddMilestone = (e) => {
        e.preventDefault();
        const { numMilestones, milestones } = this.state

        milestones.push({
            title: "",
            content: "",
            link: "",
            id: numMilestones+1,
        });

        this.setState({
            numMilestones: numMilestones+1,
            milestones,
        })
    }

    onChangeMilestoneContent = (e, milestoneId) => {
        e.preventDefault();
        const { value } = e.target
        const { milestones } = this.state
        milestones[milestoneId].content = value

        this.setState({
            milestones,
        })
    }
    // functions for adding roadmap steps
    
    // save and publish roadmap
    fetchAuthorId = (username) => {
        axios.get(`http://localhost:8000/api/users/username/${username}/`)
            .then(res => {
                this.setState({
                    authorId: res.data.id
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSave = (e) => {
        e.preventDefault();
        
        // TODO(qahoang): rollback transaction if anything fails here
        axios.post('http://localhost:8000/api/roadmaps/', {
            "author": this.state.authorId,
            "title": this.state.roadmapTitle,
            "description": this.state.roadmapDescription,
            "level": this.state.roadmapLevel,
            "discipline": this.state.roadmapCategory,
        }).then(res => {
            const roadmapId = res.data.id

            for (let i = 0; i < this.state.numMilestones; i++) {
                let milestone = this.state.milestones[i];
    
                axios.post('http://localhost:8000/api/milestones/', {
                    "title": milestone.title,
                    "link": milestone.link,
                    "content": milestone.content,
                    "order_num": milestone.id,
                    "roadmap_id": roadmapId
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            this.props.history.push('/roadmaps');
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.username) {
            const username = newProps.username
            this.setState({
                username: username
            })
            this.fetchAuthorId(username)
        }
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                "Authorization": newProps.token
            }
        }
    }

    componentDidMount() {
        
    }

    render() {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;

        let milestonesDivs = [];
        for (let i = 0; i < this.state.milestones.length; i++) {
            milestonesDivs.push(
                <div className="container-fluid" key={i}>
                    <Row>
                        <Col span={16}>
                            <Row className="milestone-card">
                                <Col span={2}>
                                    <h4 className="milestone-id">
                                        {this.state.milestones[i].id}
                                    </h4>
                                </Col>
                                <Col span={22}>
                                    <Input
                                        className="milestone-title"
                                        placeholder="Title"
                                        onChange={(e) => {
                                            this.state.milestones[i].title = e.target.value
                                        }}
                                    />
                                    {/* <div className="form-group">
                                        <label>Existing milestones Id (contribute to a published milestone):</label>
                                        <input type="text" className="form-control"  onChange={(e) => {
                                            this.milestones[i].id = e.target.value;
                                            this.milestones[i].id = this.milestones[i].milestonesId === "" ? null : this.milestones[i].milestonesId;
                                        }}/>
                                    </div> */}
                                    <TextArea
                                        className="milestone-content"
                                        value={this.state.milestones[i].content}
                                        onChange={(e) => {
                                            this.onChangeMilestoneContent(e, i)
                                        }}
                                        placeholder="Content"
                                        allowClear
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                    <Input
                                        className="milestone-link"
                                        placeholder="Link"
                                        onChange={(e) => {
                                            this.state.milestones[i].link = e.target.value
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </div>
            )
        }

        let levelOptions = []
        for (let i = 1; i <= 3; i++) {
            levelOptions.push(
                <Option key={i} value={i}>{i}</Option>
            )
        }

        return (
            <div className="container-fluid">
                <div>
                    <h3>Create &amp; Share a new Roadmap</h3>
                    <Input
                        className="create-roadmap-title" 
                        placeholder="Roadmap Title"
                        value={this.state.roadmapTitle}
                        onChange={this.onChangeRoadmapTitle}
                    />
                    <TextArea
                        className="create-roadmap-description"
                        value={this.state.roadmapDescription}
                        onChange={this.onChangeRoadmapDescription}
                        placeholder="Roadmap description"
                        allowClear
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </div>

                <div>
                    <div>
                        <Select
                            className="category-dropdown" 
                            placeholder="Category"
                            style={{ width: 120 }} 
                            onChange={this.onChangeRoadmapCategory}
                        >
                            <Option key="Engineering" value="Engineering">Enginering</Option>
                            <Option key="Finance" value="Finance">Finance</Option>
                            <Option key="Sports" value="Sports">Sports</Option>
                        </Select>

                        <Select
                            className="level-dropdown" 
                            placeholder="Level"
                            style={{ width: 120 }} 
                            onChange={this.onChangeRoadmapLevel}
                        >
                            {levelOptions}
                        </Select>
                    </div>
  
                    {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                            return (
                                <Input
                                    ref={this.saveEditInputRef}
                                    key={tag}
                                    size="small"
                                    className="tag-input"
                                    value={editInputValue}
                                    onChange={this.handleEditInputChange}
                                    onBlur={this.handleEditInputConfirm}
                                    onPressEnter={this.handleEditInputConfirm}
                                />
                            );
                        }

                        const isLongTag = tag.length > 20;

                        const tagElem = (
                            <Tag
                                className="edit-tag"
                                key={tag}
                                visible={this.state.visible}
                                closable
                                onClose={() => this.handleClose(tag)}
                            >
                                <span
                                    onDoubleClick={e => {
                                        if (index !== 0) {
                                            this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                                this.editInput.focus();
                                            });
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </span>
                            </Tag>
                        );

                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) 
                        : 
                        (
                            tagElem
                        );
                    })}

                        {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                className="tag-input"
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag className="site-tag-plus" onClick={this.showInput}>
                                <PlusOutlined /> AddTag
                            </Tag>
                        )}
 
                        <Button 
                            size="small" 
                            onClick={() => this.setState({ visible: !this.state.visible })}
                        >
                            {this.state.visible ? 'Hide tags' : 'Show tags'}
                        </Button>
                </div>

                <div>
                    <h3>Roadmap Milestones</h3>
                    {milestonesDivs}
                    <div className="create-roadmap-btn">
                        <Button
                            id="add-new-milestone-btn"
                            onClick={this.handleAddMilestone}
                        >
                            Add a new step
                        </Button>
                        <div>
                            <Button
                                styles={{margin: "0 10px"}}
                                size="large"
                                onClick={this.handleSave}
                            >
                                Save &amp; Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        username: state.username
    };
};

export default connect(mapStateToProps)(CreateRoadmap)