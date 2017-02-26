import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

import PollList from './PollList.jsx';

@observer
class MyPolls extends Component {

    @observable polls;

    constructor(props) {
        super(props);

        let token = localStorage.getItem("token");
        axios.get('/api/mypolls?token=' + token)
            .then((response) => {
                console.log(response.data.polls);
                this.polls = response.data.polls;
            })
            .catch((error) => {
                console.log(error);
            });

    }

    handleDelete = (pollId) => () => {
        // axios delete

        let token = localStorage.getItem("token");
        axios.delete('/api/poll/' + pollId + '?token=' + token)
            .then((response) => {
                console.log(response);
                this.polls = this.polls.filter((poll)=>{
                    return poll._id !== pollId;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {

        return (
            <div class="text-center">
                <h1>Select a Poll to vote or see results.</h1><br />
                {this.polls && <PollList
                    delete={true}
                    polls={this.polls}
                    handleDelete={this.handleDelete} />}
            </div>
        );
    }
};

export default MyPolls;
