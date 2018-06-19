const _env = 'dev';

class Config {
  static get env() {
    return _env;
  }

  static set env(value) {
    _env = value;
  }

  static get loginUrl() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/auth/local';
        break;
      case 'prod':
        barcodeUrl = '';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/auth/local​';
    }
    return barcodeUrl;
  }
  static get topReaders() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReaders';
        break;
      case 'prod':
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReaders';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReaders';
    }
    return barcodeUrl;
  }
  static get topReviewers() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReviewers';
        break;
      case 'prod':
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReviewers';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/rankings/topReviewers';
    }
    return barcodeUrl;
  }
  static get followUser() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/follower/follow';
        break;
      case 'prod':
        barcodeUrl = 'https://api.alibrate.com/v1/follower/follow';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/follower/follow';
    }
    return barcodeUrl;
  }
  static get unfollowUser() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/follower/unfollow';
        break;
      case 'prod':
        barcodeUrl = 'https://api.alibrate.com/v1/follower/unfollow';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/follower/unfollow';
    }
    return barcodeUrl;
  }
  static get userID() {
    switch (_env) {
      case 'dev':
        barcodeUrl = 'https://api.alibrate.com/v1/user/';
        break;
      case 'prod':
        barcodeUrl = 'https://api.alibrate.com/v1/user/';
        break;
      default:
        barcodeUrl = 'https://api.alibrate.com/v1/user/';
    }
    return barcodeUrl;
  }
}

module.exports = Config;
