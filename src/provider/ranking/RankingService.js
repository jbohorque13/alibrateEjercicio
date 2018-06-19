import Config from '../Config';
import Service from '../Service';
import Async from '../Storage/Async';

const topReaders = Config.topReaders;
const topReviewers = Config.topReviewers;

export default class RankingService {
	static getTopReaders(addPath, successCallback, errorCallback) {
		Service.get(topReaders+addPath).then((response) => {
      console.log('response ', response);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}

  static getTopReviewers(addPath, successCallback, errorCallback) {
		Service.get(topReviewers+addPath).then((response) => {
      console.log('response ', response);
			successCallback(response);
		}).catch((err) => {
			errorCallback(err);
			console.log('login error:', err);
		});
	}
}
