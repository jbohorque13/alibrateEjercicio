import Config from '../Config';
import Service from '../Service';
import Async from '../Storage/Async';

const followUser = Config.followUser;
const unfollowUser = Config.unfollowUser;

export default class FollowsService {
	static followUser(data, successCallback, errorCallback) {
		Service.post(followUser, data).then((response) => {
      console.log('response ', response);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}

  static unfollowUser(data, successCallback, errorCallback) {
		Service.post(unfollowUser, data).then((response) => {
      console.log('response ', response);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}
}
