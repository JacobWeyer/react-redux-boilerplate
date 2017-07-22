import { combineReducers } from 'redux';
import sample from './services/sample/reducer';

const rootReducer = combineReducers({
    sample,
});

export default rootReducer;
