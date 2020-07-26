import React, { Component } from 'react';
import { connect } from 'react-redux';

import { start, hero_attack, enemy_attack } from '../actions';

class App extends Component {
  render(){
    const props = this.props;
    let scene;
    switch(props.scene){
      case 0: scene = '戦闘開始'; break;
      case 1: scene = '主人公のターン'; break;
      case 2: scene = '相手のターン'; break;
      case 3: scene = '戦闘に勝利'; break;
      case 4: scene = '戦闘に敗北'; break;
    }
    let log;
    log = props.log.map((value) => (
      <li>{value}</li>
    ));

    return (
      <React.Fragment>
        <div>場面: { scene }</div>
        <div>サイコロの目: { props.dice + 1 } </div>
        <div>主人公の体力: { props.hero } </div>
        <div>敵の体力: { props.enemy } </div>
        <button onClick={ props.start } disabled={ props.scene === 0 ? false : true }>戦闘開始</button>
        <button onClick={ props.hero_attack } disabled={ props.scene === 1 ? false : true }>攻撃</button>
        <button onClick={ props.enemy_attack } disabled={ props.scene === 1 ? false : true }>次へ</button>
        <ul>{ log }</ul>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  hero: state.battle.hero.vitality,
  enemy: state.battle.enemy.vitality,
  dice: state.battle.dice,
  scene: state.battle.scene,
  log: state.battle.log,
})

const mapDispatchToProps = ({ start, hero_attack, enemy_attack })

export default connect(mapStateToProps, mapDispatchToProps)(App)