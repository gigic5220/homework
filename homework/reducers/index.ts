import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import resourceSlice from "./resource";

import _ from "lodash";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE: {
      return _.merge(action.payload, state);
    }
    default: {
      const combinedReducer = combineReducers({
        resource: resourceSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
