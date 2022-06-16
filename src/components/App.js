import React, { Component } from 'react';
import { connect } from 'react-redux';

import { attack, next } from '../actions';

class App extends Component {
  render(){
    const props = this.props

    return (
      <React.Fragment>
        <div>主人公の体力: { props.hero } </div>
        <div>敵の体力: { props.enemy } </div>
        <button onClick={ props.attack }>攻撃</button>
        <button onClick={ props.next }>次へ</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ hero: state.battle.hero.vitality , enemy: state.battle.enemy.vitality })

const mapDispatchToProps = ({ attack, next })

export default connect(mapStateToProps, mapDispatchToProps)(App)