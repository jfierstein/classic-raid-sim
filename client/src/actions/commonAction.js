export function showToast(data) {
    return function(dispatch) { 
          dispatch({type: 'SHOW_TOAST', payload: data });
    }
}
