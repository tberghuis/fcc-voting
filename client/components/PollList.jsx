import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { Link } from 'react-router';
import axios from 'axios';

@observer
class PollList extends Component {

    render() {

        return (
            <div class="row">
                <div class="col-10 push-1">
                    <ul class="poll-list list-group">
                        {this.props.polls.map((poll, i) => {
                            return <li class="list-group-item" key={i}>
                                <Link to={"/poll/" + poll._id}>{poll.title}</Link>
                                {this.props.delete && <button onClick={this.props.handleDelete(poll._id)}>Delete</button>}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
};

export default PollList;
