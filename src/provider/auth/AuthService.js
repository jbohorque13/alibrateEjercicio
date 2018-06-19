import Config from '../Config';
import Service from '../Service';
import Async from '../Storage/Async';

const loginUrl = Config.loginUrl;

export default class AuthService {
	static login(data, successCallback, errorCallback) {
		Service.post(loginUrl, data).then((response) => {
			Async.setItem('token', response.data.access_token);
			Service.setToken(response.data.access_token);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}
}
