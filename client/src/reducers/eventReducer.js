export default function reducer(state = {
    fetchProgress: null,
    error: null
  }, action) {
    switch (action.type) {
      case 'FETCH_PROGRESS': {    
        return {
          ...state,
          fetchProgress: action.data.progress
        }
      }
      default: {
        return { ...state }
      }
    }
  }