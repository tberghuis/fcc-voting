import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

@inject("appState") @observer
class Poll extends Component {
    // somehow this magiically works without extendObservable
    @observable poll = null;
    @observable checkedIndex = null;
    @observable newOption = "";

    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        // to be abstracted to service class
        // do it later
        let pollId = this.props.params.pollId;
        axios.get('/api/poll?id=' + props.params.pollId)
            .then((response) => {
                this.poll = response.data.poll;
            })
            .catch((error) => {
                // display 404
                // alert error
                // redirect home
            });
    }

    submitVote = () => {

        let token = "&token=" + localStorage.getItem('token');
        let vote = {};
        if (this.checkedIndex === 'newoption') {
            vote.newOption = this.newOption.trim();
        } else {
            vote.index = this.checkedIndex;
        }

        // very messy
        var url = '/api/pollvote?id=' + this.poll._id + token;
        if (!this.props.appState.loggedIn) {
            url = '/api/pollvoteanon/' + this.poll._id;
        }

        axios.post(url, vote)
            .then((response) => {
                this.context.router.push('/poll/' + this.poll._id + '/results');
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status === 412) {
                    // need better than this alert shit
                    alert("You have already voted in this poll.");
                }
            });
    }

    getRadioList = () => {
        let list = this.poll.options.map((option, i) => {
            return <li key={i} onClick={() => this.checkedIndex = i}><input type="radio" checked={i === this.checkedIndex} /><span>{option}</span></li>;
        });
        list.push(<li key={list.length} class="form-inline" onClick={() => this.checkedIndex = "newoption"}>
            <input type="radio" checked={'newoption' === this.checkedIndex} />
            <input
                onChange={this.handleNewOptionChange}
                class="form-control" type="text" placeholder="new option" /></li>);
        return list;
    }

    voteButtonDisabled() {
        //if (!this.props.appState.loggedIn) return true;
        if (this.checkedIndex == null) return true;
        if ('newoption' === this.checkedIndex && this.newOption.trim() === "") return true;
        return false;
    }

    handleNewOptionChange = (event) => {
        this.newOption = event.target.value;
    }

    render() {
        if (!this.poll) return <div>loading</div>;

        return (
            <div class="row single-poll">
                <div class="col-6 push-3">
                    <h1>{this.poll.title}</h1>
                    <ul class="list-unstyled">
                        {this.getRadioList()}
                    </ul>
                    <button
                        onClick={this.submitVote}
                        disabled={this.voteButtonDisabled()} class="indent">Vote</button>
                    <button
                        onClick={() => this.context.router.push('/poll/' + this.poll._id + '/results')}>
                        Results</button>
                    <br /><br />
                    Share this poll by copying the URL in the address bar.
                </div>
            </div>
        );
    }
};

export default Poll;
