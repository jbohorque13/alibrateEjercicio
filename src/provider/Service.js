import axios from 'axios';
import Async from './Storage/Async';

class Service {
	constructor() {
		const service = axios.create({
			timeout: 100000,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			},
		});
		this.service = service;
	}

	setToken(token) {
		this.service.defaults.headers['Authorization'] = 'Bearer ' + token;
	}

	getUserInfo(path, token) {
		return new Promise((resolve, reject) => {
			this.service.request({
				method: 'GET',
				url: path,
			}).then((response) => {
				// console.log('get info: ', response);
				resolve(response);
			}).catch((err) => {
				console.log('get error: ', err);
				if (err.message === 'Network Error') {
					reject('No hay conexión.');
				} else if (err.response) {
					let msg = '';
					if (err.response.data.message) {
						msg = err.response.data.message;
					} else {
						msg = err.response.data;
					}
					console.log('Service GET error:', err.response);
					reject(msg);
				} else {
					reject(err);
				}
			});
		});
	}

	get(path) {
		return new Promise((resolve, reject) => {
			this.service.request({
				method: 'GET',
				url: path,
			}).then((response) => {
				resolve(response);
			}).catch((err) => {
				if (err.message === 'Network Error') {
					reject('No hay conexión. - GET error');
				} else if (err.response) {
					let msg = '';
					if (err.response.data.message) {
						msg = err.response.data.message;
					} else {
						msg = err.response.data;
					}
					console.log('Service GET error:', err.response);
					reject(msg);
				} else {
					reject(err);
				}
			});
		});
	}


	post(path, payload) {
		return new Promise((resolve, reject) => {
			this.service.request({
					method: 'POST',
					url: path,
					data: payload,
				}).then((response) => {
					resolve(response);
				}).catch((err) => {
					// change acordingly
					if (err.message === 'Network Error') {
						reject('No hay conexión.');
					} else if (err.response) {
						let msg = '';
						if (err.response.data.message) {
							msg = err.response.data.message;
						} else {
							msg = err.response.data;
						}
						console.log('Service POST error:', err.response);
						reject(msg);
					} else {
						reject(err);
					}
			});
	});
}

}

export default new Service();
