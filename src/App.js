import React, { Component } from 'react';
import Comment from './view/comment/Comment'
import './App.css';

import PropTypes from 'prop-types'

const users = [{
    username: 'Jerry',
    age: 21,
    gender: 'male'
  },
  {
    username: 'Tomy',
    age: 22,
    gender: 'male'
  },
  {
    username: 'Lily',
    age: 19,
    gender: 'female'
  },
  {
    username: 'Lucy',
    age: 20,
    gender: 'female'
  }
]

class User extends Component {
  static propTypes = {
    users: PropTypes.object
  }
  render() {
    const { user } = this.props
    return (
     <div>
      <div> 姓名： {user.username} </div> 
      <div> 年龄： { user.age } </div> 
      <div> 性别： {user.gender} </div> 
      <hr />
     </div>
    )
  }
}

class ShowUser extends Component {
  render () {
    return (
      <div>
         {users.map( (user, i) => < User user = {user} key={i} /> ) } 
      </div>
    )
  }
}

class LikeButton extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }

  constructor() {
    super()
    this.state = {
      isLiked: false
    }
  }

  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return ( 
      < button onClick = {this.handleClickOnLikeButton.bind(this)} > 
       {this.state.isLiked ? this.props.likedText : this.props.unlikedText}👍 
      </button>
    )
  }
}


class Index extends Component {
  render() {
    return ( 
      <div>
        <LikeButton wordings = {{likedText: '已赞',unlikedText: '赞' }}/>  
      </div>
    )
  }
}

/**
 * 测试生命周期函数
 *
 * @class Lifecycle
 * @extends {Component}
 */
class Lifecycle extends Component {
  constructor(props) {
    super(props);
    console.log('constructor')
  }
  
  componentWillMount () {
    console.log('componentWillMount')
  }
  componentDidMount () {
    console.log('componentDidMount')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  // componentDidUnmount () {
  //   console.log('componentDidUnmount')
  // }
  render () {
    console.log('render')
    return (
      <div className="lifecycle">声明周期函数</div>
    )
  }
}

class App extends Component {
  constructor(params) {
    super()
    this.state = {
      show: true
    }
  }

  changeState () {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <div className="App">
          <Comment />
          <h1 className="App-title" onClick={this.changeState.bind(this)}>花开世界</h1>
        <LikeButton />
        <Index />
        <ShowUser />
        <hr/>
        {this.state.show ? <Lifecycle /> : null}
      </div>
    );
  }
}





export default App;
