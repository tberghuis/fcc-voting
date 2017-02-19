import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

//@inject("viewState", "appState") @observer
@inject("appState") @observer
class Poll extends Component {

    // TODO add new options

    //@observable poll = {};
    @observable poll = null;

    @observable checkedIndex = null;


    constructor(props) {
        super(props);

        console.log(props);
        //axios.get
        let pollId = props.params.pollId;

        axios.get('/api/poll?id=' + props.params.pollId)
            .then((response) => {
                console.log(response.data); // ex.: { user: 'Your User'}
                //console.log(response.status); // ex.: 200

                //this.poll = observable(response.data.poll);
                this.poll = response.data.poll;
                //this.poll


                //extendObservable(this.poll, response.data.poll);
                //this.forceUpdate();
            })
            .catch((error) => {
                // display 404
                // alert error
                // redirect home
            });


    }


    submitVote = () => {
        console.log("submit");

        // axios post /api/poll/id { index: 2, newoption: "string" }
        // protected route
    }



    getRadioList = () => {
        let list = this.poll.options.map((option,i)=>{
            return <li key={i} onClick={()=>this.checkedIndex=i}><input type="radio" checked={i===this.checkedIndex} /><span>{option}</span></li>;
        });
        list.push(<li key={list.length} class="form-inline" onClick={()=>this.checkedIndex="newoption"}><input type="radio" checked={'newoption'===this.checkedIndex} /><input class="form-control" type="text" placeholder="new option" /></li>);
        return list;
    }

    render() {

        if (!this.poll) return <div>loading</div>;

        return (
            <div class="row single-poll">
                <div class="col-6 push-3">

                    <h1>{this.poll.title}</h1>
                    <ul class="list-unstyled">

                        { this.getRadioList() }

                    </ul>
                    <button 
                        onClick={this.submitVote}
                        disabled={!this.props.appState.loggedIn || !this.checkedIndex} class="indent">Vote</button> if not logged in, alert, please log in to vote. but make
                    <button>Results</button>
                    if show results true, put



                <button onClick={() => { this.poll.title = "new title"; }}>click me</button>

                </div>



            </div>
        );
    }

};

export default Poll;
