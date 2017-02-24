import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

@observer
class PollResults extends Component {

    @observable poll = null;


    constructor(props) {
        super(props);
        let pollId = this.props.params.pollId;
        axios.get('/api/poll?id=' + props.params.pollId)
            .then((response) => {
                this.poll = response.data.poll;
                console.log(response.data.poll);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {


        return (
            <div class="row">
                <div class="col-12">
                    d3 shit goes in here
                    {this.poll && <PollResultChart></PollResultChart>}
                </div>
            </div>
        );
    }
};

export default PollResults;


class PollResultChart extends Component {



    componentDidMount() {
        // call d3
    }

    shouldComponentUpdate(nextProps) {
        // call d3

        // return false
    }

    render() {
        return (
            <svg>
                <text y="20" fill="black">Hello, World!</text>
            </svg>
        );
    }
}



class PollOption {


   // maxVotes
   // totalVotes



    constructor(option, votes){
        this.option = option;
        this.votes = votes;
    }

    // computed percentage


    // sort
   static sort(a,b){
        return b.votes-a.votes || (a.option > b.option ? 1 : -1);
    }

}