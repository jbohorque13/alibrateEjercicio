import Config from '../Config';
import Service from '../Service';
import Async from '../Storage/Async';

const userID = Config.userID;

export default class UserService {
	static getUser(addPath, successCallback, errorCallback) {
		Service.get(userID + addPath).then((response) => {
      console.log('response ', response);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}
}
