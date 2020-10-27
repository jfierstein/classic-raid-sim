import { combineReducers } from 'redux';

import common from './commonReducer';
import events from './eventReducer';
import wcl from './wclReducer';

export default combineReducers({
    common,
    events,
    wcl
});