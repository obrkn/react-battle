import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import "./common.css";

import { setting } from '../actions';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      attack: this.props.attack
    };
    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  doChange(e){
    let attack = this.state.attack
    let element = Number(e.target.id.slice(-1))
    if (e.target.type === 'text'){
      attack[element][0] = e.target.value
    } else {
      attack[element][1] = e.target.value
    }
    this.setState({
      attack: attack
    })
  }

  doAction(e){
    e.preventDefault();
    let action = setting(this.state.attack);
    this.props.dispatch(action);
  }

  render(){
    let formBox;
    formBox = this.state.attack.map((value, key) => (
      <React.Fragment key={key}>
        <input key={'move' + key} id={'move-' + key} type="text" onChange={this.doChange} defaultValue={value[0]} />
        <input key={'damage' + key} id={'damage-' + key} type="number" onChange={this.doChange} defaultValue={value[1]} />
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <h1>チーム登録</h1>
        <form onSubmit={this.doAction}>
          {formBox}
          <input type="submit" value="設定する" />
        </form>
        <Link to="/battle" >バトル画面へ</Link>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  attack: state.battle.hero.attack
})

// const mapDispatchToProps = ({ setting })

export default connect(mapStateToProps)(Registration)
// export default connect(mapStateToProps, mapDispatchToProps)(Registration)