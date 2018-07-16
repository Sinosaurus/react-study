import React, { Component } from 'react'


class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStr: '111',
            _timerId: 'null'

        }
    }
    
    componentWillMount () {
        this.state._timerId = setInterval(() => {
            this._updateCommentTime()
        }, 5000)
        this._updateCommentTime()
    }

    componentWillUnmount () {
        clearInterval(this.state._timerId)
    }
    _updateCommentTime () {
        const {createdTime } = this.props.item
        let res = (+new Date() - createdTime) / 1000
        const timeStr = res > 60 ? Math.round(res / 60) + '分钟前' : Math.round(Math.max(res, 1)) + '秒钟前'
        this.setState({
            timeStr,
        })
        
    }
    
    _getChangeStr (val) {
        return val
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDelete () {

        if (this.props.deleteItem) {
            this.props.deleteItem(this.props.item.createdTime)
        }
    }

    render () {
        return (
            <div className="comment_item">
                <div className="comment_user">
                   <span className="right-5">{this.props.item.userName}</span>
                   :
                </div>
                <p className = "comment_content" dangerouslySetInnerHTML={{__html:  this._getChangeStr(this.props.item.content)}}></p>
                <span className="comment_clear" onClick={this.handleDelete.bind(this)}>删除</span>
                <span className="comment_time">{this.state.timeStr}</span>
            </div>
        )
    }
}

class CommentList extends Component {
    sendDeleteItem (val) {
        if (this.props.deleteI) {
            this.props.deleteI(val)
        }
    }
    render () {
        return (
            <div className="comment_list">
              {this.props.msgList.map( (item, i) => <CommentItem key={i} item={item} deleteItem={this.sendDeleteItem.bind(this)} />)}
            </div>
        )
    }
}

export default CommentList