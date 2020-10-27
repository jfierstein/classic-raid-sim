const events = {
    stream: null
};

const eventMiddleware = store => next => action => {
    if (action.type === 'EVENT_STREAM') {
        events.stream = new EventSource(`/api/events/stream`);    
        events.stream.onmessage = (msg) => {
            const { type, data } = JSON.parse(msg.data);
            store.dispatch({ type, data });
        }
    }
    next(action);
};

export default eventMiddleware;