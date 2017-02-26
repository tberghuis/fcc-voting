import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';

@inject("appState") @observer
class CreatePoll extends Component {

    @observable title = "";
    @observable option1 = "";
    @observable option2 = "";
    @observable optionX = [];

    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: React.PropTypes.object
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.checkFormValidated() == "disabled") return;

        //strip out empty options from optionX
        let options = this.optionX.filter((option) => { return option.trim() != ""; });

        options = [this.option1, this.option2, ...options];
        console.log(options);

        let post = {
            title: this.title,
            options
        };

        // should be moved into service class but meh        
        let token = "?token="+localStorage.getItem('token');
        axios.post('/api/createpoll'+token, post)
            .then((response) => {
                console.log('new poll created');
                console.log(response.data);
                this.context.router.push('/poll/' + response.data.poll._id);
            })
            .catch(error => {
                console.log(error);
            });
    }

    checkFormValidated = () => {
        if (this.title.trim() == "" || this.option1.trim() == "" || this.option2.trim() == "") {
            return "disabled";
        }
    }


    render() {
        let extraOptions = this.optionX.map((option, i) => {
            return (
                <div key={i} class="form-group row">
                    <label class="col-2 col-form-label text-right">Option {i + 3}</label>
                    <div class="p-0 input-group col-10">
                        <input type="text" class="form-control"
                            value={this.optionX[i]}
                            onChange={(e) => { this.optionX[i] = e.target.value; }} />
                        <div class="input-group-addon"
                            role="button"
                            onClick={() => { this.optionX.splice(i, 1); }}>X</div>
                    </div>
                </div>
            );

        });

        return (
            <div>
                <h1 class="text-center">New Poll</h1><br />
                <div class="row">
                    <div class="col-10">
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group row">
                                <label class="col-2 col-form-label text-right">Title</label>
                                <input type="text" class="form-control col-10"
                                    value={this.title}
                                    onChange={(e) => { this.title = e.target.value; }} />
                            </div>
                            <div class="form-group row">
                                <label class="col-2 col-form-label text-right">Option 1</label>
                                <input type="text" class="form-control col-10"
                                    value={this.option1}
                                    onChange={(e) => { this.option1 = e.target.value; }} />
                            </div>
                            <div class="form-group row">
                                <label class="col-2 col-form-label text-right">Option 2</label>
                                <input type="text" class="form-control col-10"
                                    value={this.option2}
                                    onChange={(e) => { this.option2 = e.target.value; }} />
                            </div>

                            {extraOptions}

                            <div class="row">
                                <div class="push-2 col-10 pl-0">
                                    <button role="button" type="button" class="btn mr-2"
                                        onClick={() => { this.optionX.push(""); }}>Add Option</button>
                                    <button role="button" type="submit" class={"btn btn-primary " + this.checkFormValidated()}>Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }

};

export default CreatePoll;
