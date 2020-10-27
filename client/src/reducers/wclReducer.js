export default function reducer(state = {   
}, action) {
  switch (action.type) {
    case 'WCL_GET_ZONES': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'WCL_GET_ZONES_SUCCESS': {
      return {
        ...state,
        fetching: false,
        zones: action.payload
      }
    }
    case 'WCL_GET_ZONES_ERROR': {
      return {
        ...state,
        fetching: false
      }
    }
    case 'WCL_GET_REPORTS_SUCCESS': {
      return {
        ...state,
        fetching: false,
        reports: action.payload
      }
    }
    case 'WCL_GET_REPORTS_ERROR': {
      return {
        ...state,
        fetching: false
      }
    }
    case 'WCL_GET_STATS_SUCCESS': {
      return {
        ...state,
        fetching: false,
        stats: action.payload
      }
    }
    case 'WCL_GET_STATS_ERROR': {
      return {
        ...state,
        fetching: false
      }
    }
    default: {
      return { ...state }
    }
  }
}