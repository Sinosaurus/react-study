import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            msgList: []
        }
    }
    componentWillMount () {
        const msgList = this._getCommentList()
        this.setState({
            msgList,
        })

    }
    _saveCommentList (comments) {
        localStorage.setItem('commentList', JSON.stringify(comments))
    }
    _getCommentList () {
      const comments = JSON.parse(localStorage.getItem('commentList')) || []
      return comments
    }

    getInputList (val) {
        const res = this.state.msgList.push(val)
        this._saveCommentList(this.state.msgList)
        this.setState({magList: res})
    }
    
    removeMsgList (val) {
        const res = this.state.msgList
        let index = null
        res.forEach((item, index) => {
            if (item.createdTime === val) {
                index = index
            }
        })

        res.splice(index, 1)
        this._saveCommentList(res)
        this.setState({
            msgList: res
        })
    }
    render () {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.getInputList.bind(this)} />
                <CommentList msgList={this.state.msgList} deleteI={this.removeMsgList.bind(this)}/>
            </div>
        )
    }
}

export default Comment