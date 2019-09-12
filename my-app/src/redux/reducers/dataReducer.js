import { SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SCREAM: {
        let index = state.screams.findIndex(
            scream => scream.screamId === action.payload
        );
        let mutatedScreams = state.screams.slice();
        mutatedScreams.splice(index, 1);
        return {
            ...state,
            screams: [...mutatedScreams]
        };
    }
    
    default:
      return state;
  }
}