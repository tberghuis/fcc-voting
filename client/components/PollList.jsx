import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { Link } from 'react-router'

@observer
class PollList extends Component {




    render() {

        return (
            <ul class="poll-list list-group">
                { this.props.polls.map((poll,i)=>{
                    return <li class="list-group-item" key={i}><Link to={"/poll/"+poll._id}>{poll.title}</Link></li>
                    //return <li class="list-group-item" key={i}><a href={"/poll/"+poll._id}>{poll.title}</a></li>
                }) }
            </ul>
        );
    }
};

export default PollList;

// <Link to="/" class="navbar-brand">FCC Voting App</Link>