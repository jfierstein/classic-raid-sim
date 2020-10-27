import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './ToastContainer.css';

function mapStoreStateToProps(store) {
    return {
        toastData: store.common.toast.toastData
    }
}

class ToastContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            toasts: [
                { shown: false, render: false }, 
                { shown: false, render: false }, 
                { shown: false, render: false }, 
                { shown: false, render: false },
                { shown: false, render: false },
                { shown: false, render: false }
            ],
            showToasts: false
        };
    }

    hideToast = (i) => {
        let { toasts } = this.state;
        toasts[i].shown = false;
        this.setState({ ...this.state, toasts }, () => {
            setTimeout(() => {
                toasts[i].render = false;
                this.setState({ ...this.state, toasts, showToasts: !toasts.every(t => !t.shown) });
            }, 2000);
            
        });
    }

    componentWillReceiveProps(props) {
        const { toastData } = props;
        let { index, toasts } = this.state;
        index = toasts.findIndex(t => !t.shown);
        if(index < 0) {
            toasts = [
                { shown: false, render: false }, 
                { shown: false, render: false }, 
                { shown: false, render: false }, 
                { shown: false, render: false },
                { shown: false, render: false },
                { shown: false, render: false }
            ]
            index = 0;
        }

        toasts[index] = {
            ...toastData,
            render: true,
            shown: true,
            timestamp: moment()
        };
        this.setState({
            ...this.state,
            showToasts: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    toasts,
                    index
                });
            }, 1000);
        });
    }

    renderToast(i) {
        const { toasts } = this.state;
        toasts[i].placement = toasts[i].placement ? toasts[i].placement : 'top-right';
        return (
        toasts[i].render ?
        <Toast className={toasts[i].shown ? `${toasts[i].placement} slide-down-fade-in` : `${toasts[i].placement} slide-up-fade-out`} style={{width: '300px'}} key={`toast${i}`} show={toasts[i].shown} onClose={e => this.hideToast(i)} delay={toasts[i].delay || 4500} autohide={!toasts[i].persist}>
            <Toast.Header>
                <i className="fa fa-bell app-icon" />
                <strong className="mr-auto">{toasts[i].title}</strong>
                { toasts[i].showTimestamp ? <small>{moment(toasts[i].timestamp).fromNow()}</small> : null }
            </Toast.Header>
            <Toast.Body className={`alert-${toasts[i].type}`}>
                {toasts[i].message ? <div>{toasts[i].message}<br /></div> : null }
                {toasts[i].component ? toasts[i].component : null }                   
            </Toast.Body>
        </Toast> : null);
    }

    render() {
        const { toasts, showToasts } = this.state;
        let toastList = [];
        toasts.forEach((toast, i) => toastList.push(this.renderToast(i)));
        return ( showToasts ?
            <div>
                {toastList}
            </div> : null
        );
    }
}

export default connect(mapStoreStateToProps)(ToastContainer);