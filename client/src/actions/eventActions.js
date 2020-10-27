export function eventStream(data) {
    return function(dispatch) { 
          dispatch({type: 'EVENT_STREAM', payload: data });
    }
}
