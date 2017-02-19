import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

@inject("appState") @observer
class Poll extends Component {

    // somehow this magiically works without extendObservable
    @observable poll = null;
    @observable checkedIndex = null;

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
        
        // axios post /api/poll/id { index: 2, newOption: "string" }
        // protected route
        let token = "&token=" + localStorage.getItem('token');
        let vote = {};
        if (this.checkedIndex === 'newoption') {
            // get from refs
            vote.newOption = this.newOption.value;
        } else {
            vote.index = this.checkedIndex;
        }
        axios.post('/api/pollvote?id=' + this.poll._id + token, vote)
            .then((response) => {

                // router push /poll/:id/results
                // put in a function, call from onclick button
                this.context.router.push('/poll/'+this.poll._id+'/results');
            })
            .catch(error => {
                console.log(error);
            });
    }



    getRadioList = () => {
        let list = this.poll.options.map((option, i) => {
            return <li key={i} onClick={() => this.checkedIndex = i}><input type="radio" checked={i === this.checkedIndex} /><span>{option}</span></li>;
        });
        list.push(<li key={list.length} class="form-inline" onClick={() => this.checkedIndex = "newoption"}>
            <input type="radio" checked={'newoption' === this.checkedIndex} />
            <input
                ref={(input) => { this.newOption = input }}
                class="form-control" type="text" placeholder="new option" /></li>);
        return list;
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
                        disabled={!this.props.appState.loggedIn || !this.checkedIndex} class="indent">Vote</button>
                    <button
                        onClick={()=>this.context.router.push('/poll/'+this.poll._id+'/results')}>
                        Results</button>
                </div>
            </div>
        );
    }
};

export default Poll;
