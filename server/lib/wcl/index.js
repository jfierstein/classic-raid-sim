const axios = require('axios');
const config = require('config/env');
const moment = require('moment');
const baseUrl = 'https://classic.warcraftlogs.com'
const apiBasePath = '/v1'
const apiKey = config.wclApiKey;

const chunk = (requests, chunk_size) => Array(Math.ceil(requests.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => requests.slice(begin, begin + chunk_size));

const wclRequest = async (path, params) => {
    let url = `${baseUrl}${apiBasePath}${path}`;
    if(!params) {
        url = `${url}?api_key=${apiKey}`
    }
    else {
        for(let [idx, key] of Object.keys(params).entries()) {
            url = `${url}${!idx ? '?' : '&'}${key}=${params[key]}`
        }
        url = `${url}&api_key=${apiKey}`    
    }
    const result = await axios.get(url);
    return result.data;
}

const getZones = async () => {
    return await wclRequest('/zones');
}

const getReports = async (params) => {
    const reports = await wclRequest(`/reports/guild/${params.guild}/${params.realm}/${params.region}`);
    const results = (params.zone ? reports.filter(r => r.zone.toString() === params.zone.toString()) : (reports || []));
    const zones = await getZones();
    results.forEach(r => {
        r.zoneName = zones.find(z => z.id == r.zone).name;        
        r.startDate = new Date(r.start).toISOString();
        r.endDate = new Date(r.end).toISOString();
    });
    const filtered = results.filter(r => moment(r.start).isAfter(moment().subtract(1, 'month')));
    const unique = {};
    for(let report of filtered) {
        const key = moment(report.start).format("ddd, MMM D");
        if(key.toLowerCase().startsWith('wed')) {
            unique[key] = report;
        }
    }
    return Object.values(unique).sort((a, b) => b.start-a.start);
}

const getFights = async (reportId) => {
    const { fights } = await wclRequest(`/report/fights/${reportId}`);
    const requests = [];
    for(let [idx, fight] of fights.entries()) {
        requests.push(wclRequest(`/report/tables/damage-done/${reportId}`, { start: fight.start_time, end: fight.end_time }));        
        ///const htResult = await wclRequest(`/report/tables/healing/${reportId}`, { start: fight.start_time, end: fight.end_time });
        //fight.healingTables = htResult.entries;
    }
    console.log('Fetching', requests.length, 'fights...');
    let fightResults = [];
    const batches = chunk(requests, 10);
    for(let batch of batches) {
        fightResults.push(...await Promise.all(batch));
        console.log('Pausing for WCL shit API...');
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    for(let [idx, fightResult] of fightResults.entries()) {
        fights[idx].damageTables = fightResult.entries;
    }
    
    return fights;
}

module.exports = {
    getZones,
    getReports,
    getFights
}