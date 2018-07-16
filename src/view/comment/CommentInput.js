import React, { Component } from 'react'

class CommentInput extends Component {
  constructor() {
      super()
      this.state = {
          userName: '',
          content: '',
      }
      this.txt = React.createRef()
  }
  componentWillMount () {
      this.handleUserName()
  }
  componentDidMount () {
      this.txt.current.focus()
  }

  // 存用户名 在失焦时
  _saveUserName (e) {
      console.log(e.target.value)
    localStorage.setItem('userName', e.target.value)
  }
  handleUserName () {
      const userName = localStorage.getItem('userName') || ''
      this.setState({
          userName,
      })
  }
  changeName (e) {
      this.setState({
          userName: e.target.value
      })
  }

  changeContent (e) {
      this.setState({
          content: e.target.value
      })
  }

  sendList () {
      const { userName, content } = this.state

      if (!userName) {
          alert('用户名不能为空')
          return
      }

      if (!content) {
          alert('内容不能为空')
          return
      }

      if (this.props.onSubmit) {
          const { userName, content } = this.state
          this.props.onSubmit({
              userName,
              content,
              createdTime: +new Date()
          })
      }

      this.setState( { content: '' } )
  }

  render () {
      return (
          <div className="comment_input">
              <div className="comment_top">
                <span className="comment_in">用户名：</span>
                <div className="input_style">
                    < input className = "in"
                    type = "text"
                    value = {
                        this.state.userName
                    }
                    onChange = {
                        this.changeName.bind(this)
                    }
                    onBlur = {
                        this._saveUserName.bind(this)
                    }
                />
                </div>
              </div>
              <div className="comment_middle">
                <span className = "comment_in" >评论内容： </span>
                <div className = "input_style" >
                   <textarea ref={this.txt} className="in" value = {this.state.content} onChange={this.changeContent.bind(this)}> </textarea>
                </div>
              </div>
              <div className="comment_bottom">
                <button className="btn" onClick={this.sendList.bind(this)}>发布</button>
              </div>
          </div>
      )
  }
}

export default CommentInput