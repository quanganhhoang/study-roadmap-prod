import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Tag, Tooltip, Button, Row, Col, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

import api from '../api'


class CreateRoadmap extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        
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

    onChangeMilestoneTitle = (e, milestoneId) => {
        e.preventDefault();
        const { value } = e.target;
        const { milestones } = this.state;
        milestones[milestoneId].title = value;

        this.setState({
            milestones
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
    handleSave = (e) => {
        e.preventDefault();
        const token = this.props.token;
        let transactionSuccess = true;
        // TODO(qahoang): rollback transaction if anything fails here
        api.post(`api/roadmaps/`, {
            "author": this.props.authorId,
            "title": this.state.roadmapTitle,
            "description": this.state.roadmapDescription,
            "level": this.state.roadmapLevel,
            "discipline": this.state.roadmapCategory,
        }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(res => {
            const roadmapId = res.data.id

            for (let i = 0; i < this.state.numMilestones; i++) {
                let milestone = this.state.milestones[i];
    
                api.post(`api/milestones/`, {
                    "title": milestone.title,
                    "link": milestone.link,
                    "content": milestone.content,
                    "order_num": milestone.id,
                    "roadmap_id": roadmapId,
                }, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }).then(res => {
                    console.log(res)
                    // TODO(qahoang): wrap in a transaction, rollback if any error 
                }).catch(err => {
                    transactionSuccess = false;
                    console.log(err)
                })
            }
            
        }).catch(err => {
            console.log(err)
            transactionSuccess = false;
        })

        if (transactionSuccess) {
            this.props.history.push('/roadmaps');
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
                                        onChange={e => {
                                            this.onChangeMilestoneTitle(e, i)
                                        }}
                                    />
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
                                            this.setState(prevState => ({
                                                milestones: {
                                                    ...prevState.milestones,
                                                    [prevState.milestones[i].link]: e.target.value
                                                }
                                            }))
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
                            <Option key="Business" value="Business">Business</Option>
                            <Option key="Finance" value="Finance">Sports</Option>
                            <Option key="Life Hack" value="Life Hack">Life Hack</Option>
                            <Option key="Culinary" value="Culinary">Culinary</Option>
                            <Option key="Entrepreneurship" value="Entrepreneurship">Entrepreneurship</Option>
                            <Option key="Education" value="Education">Education</Option>
                            <Option key="Health" value="Health">Health</Option>
                            <Option key="Other" value="Other">Other</Option>
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
        token: state.auth.token,
        username: state.auth.username,
        authorId: state.auth.userId,
    };
};

export default connect(mapStateToProps)(CreateRoadmap)