const axios = require('axios');
const qs = require('query-string');

export function getZones(data, params) {
    return function(dispatch) {
      dispatch({type: 'WCL_GET_ZONES' });
      axios.get(`/api/wcl/zones`)
        .then(response => {
          dispatch({type: 'WCL_GET_ZONES_SUCCESS', payload: response.data});
        })
        .catch(err => {
          dispatch({type: 'WCL_GET_ZONES_ERROR', payload: err });
        });
    }
}

export function getReports(params) {
  return function(dispatch) {
    dispatch({type: 'WCL_GET_REPORTS' });
    axios({
      method: 'get',
      url: `/api/wcl/reports`,
      params })
      .then(response => {
        dispatch({type: 'WCL_GET_REPORTS_SUCCESS', payload: response.data});
      })
      .catch(err => {
        dispatch({type: 'WCL_GET_REPORTS_ERROR', payload: err });
      });
  }
}

export function getStats(data) {
  return function(dispatch) {
    dispatch({type: 'WCL_GET_STATS' });
    axios({
      method: 'post',
      url: `/api/wcl/stats`,
      data })
      .then(response => {
        dispatch({type: 'WCL_GET_STATS_SUCCESS', payload: response.data});
      })
      .catch(err => {
        dispatch({type: 'WCL_GET_STATS_ERROR', payload: err });
      });
  }
}