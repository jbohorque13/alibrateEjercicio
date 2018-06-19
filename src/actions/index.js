import { SAVE_USER } from  './ActionTypes';
import AuthService from '../provider/auth/AuthService';

export const saveUser = (user) => {
    return { type: 'SAVE_USER', payload:user };
}

export const saveRankingReaders = (readers) => {
    return { type: 'SAVE_RANKING_READERS', payload:readers};
}

export const saveRankingReviewers = (reviewers) => {
    return { type: 'SAVE_RANKING_REVIEWERS', payload:reviewers };
}
