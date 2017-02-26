import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import axios from 'axios';

@observer
class PollResults extends Component {

    @observable poll = null;
    // these should actually be computed
    @observable totalVotes = 0;
    @observable pollOptionsSorted = [];

    constructor(props) {
        super(props);
        let pollId = this.props.params.pollId;
        axios.get('/api/poll?id=' + props.params.pollId)
            .then((response) => {
                this.poll = response.data.poll;
                console.log(response.data.poll);
                // calc total votes
                this.totalVotes = response.data.poll.votes.reduce(function (a, b) { return a + b; }, 0);
                let pollOptions = response.data.poll.options.map((option, i) => {
                    return new PollOption(option, response.data.poll.votes[i]);
                });
                this.pollOptionsSorted = pollOptions.sort(PollOption.sort);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <div>
                    {this.poll &&
                        <PollResultChart
                            pollOptions={this.pollOptionsSorted}
                            totalVotes={this.totalVotes}
                            title={this.poll.title}></PollResultChart>}
            </div>
        );
    }
};

export default PollResults;

class PollResultChart extends Component {
    render() {
        console.log(this.props);

        let maxVotes = this.props.pollOptions[0] ? this.props.pollOptions[0].votes : 0;
        console.log("maxVotes", maxVotes);
        let width = 100;
        let scaleFactor = maxVotes ? width / maxVotes : 0;
        let tableRows = this.props.pollOptions.map((pollOption, i) => {
            return (
                <div style={ {backgroundColor:i%2==0 && "lightgrey"}} class="row" key={i}>
                    <div>{pollOption.option}</div>
                    <div><div class="bar-chart-row" style={{ width: (scaleFactor * pollOption.votes) + "%" }} ></div></div>
                    <div>{pollOption.votes}</div>
                    <div>{Math.round(100 * pollOption.votes / this.props.totalVotes)} %</div>
                </div>
            );
        });

        return (

            <div class="poll-result-chart">
                <h1>{this.props.title}</h1><br/>
                <div className="row font-weight-bold">
                    <div>Option</div>
                    <div></div>
                    <div>Votes</div>
                    <div>%</div>
                </div>
                {tableRows}
            </div >
        );
    }
}

class PollOption {

    constructor(option, votes) {
        this.option = option;
        this.votes = votes;
    }

    static sort(a, b) {
        return b.votes - a.votes || (a.option > b.option ? 1 : -1);
    }

}