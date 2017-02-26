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

        // include token
        let token = localStorage.getItem("token");

        //fetch all polls
        axios.get('/api/mypolls?token='+token)
            .then((response) => {
                //this.poll = response.data.poll;
                console.log(response.data.polls);

                this.polls = response.data.polls;
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {

        return (
            <div class="text-center">
                <h1>Select a Poll to vote or see results.</h1><br/>
                {this.polls && <PollList polls={this.polls} />}
                
            </div>
        );
    }
};

export default MyPolls;

