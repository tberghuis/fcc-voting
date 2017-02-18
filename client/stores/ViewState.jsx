import {observable} from 'mobx';
//import { ALL_TODOS } from '../constants';

export default class ViewState {
	@observable signupModal = false;
	@observable loginModal = false;
}