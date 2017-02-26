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
                }) }
            </ul>
        );
    }
};

export default PollList;
