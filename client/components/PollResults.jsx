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


    //lifecycle method after render
    
    // if poll null return

    // else kill the element, redraw

    // look up steven grider rallycoding vid + link in notes.txt


    render() {


        return (
            <div class="row">
                <div class="col-12">
                    d3 shit goes in here
                    {this.poll && "fdsgdsgsdgdsgds"}
                </div>
            </div>
        );
    }
};

export default PollResults;
