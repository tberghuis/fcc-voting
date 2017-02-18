import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';

//@inject("viewState", "appState") @observer
@inject("appState") @observer
class Poll extends Component {

    // TODO add new options


    constructor(props) {
        super(props);

        console.log(props);
        //axios.get
        let pollId = props.params.pollId;

        axios.get('/api/poll?id=' + props.params.pollId)
            .then((response) => {
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            })
            .catch((error)=>{
                // display 404
                // alert error
                // redirect home
            });


    }

    handleSubmit = (event) => {


    }

    render() {



        return (
            <div>
                hello world
            </div>
        );
    }

};

export default Poll;
