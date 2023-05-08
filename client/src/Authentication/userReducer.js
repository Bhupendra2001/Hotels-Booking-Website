const initialState = {
    isAuthenticated: false,
    user:null,
    error: null,
    booked: null,
  };
  
  export const userActionTypes = {
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    BOOKING_SUCCESS : 'BOOKING_SUCCESS',
    BOOKING_FAILURE : 'BOOKING_FAILURE'
  };

  export const bookingSuccess = (booked) => ({
  type : userActionTypes.BOOKING_SUCCESS,
  payload : booked,
  })
  export const bookingFailure = (booked) => ({
  type : userActionTypes.BOOKING_FAILURE,
  payload : error,
  })

  export const signupSuccess = (user) => ({
    type: userActionTypes.SIGNUP_SUCCESS,
    payload: user,
  });
  
  export const signupFailure = (error) => ({
    type: userActionTypes.SIGNUP_FAILURE,
    payload: error,
  });

  export const loginSuccess = (user) => ({
    type: userActionTypes.LOGIN_SUCCESS,
    payload: user,
  });
  
  export const loginFailure = (error) => ({
    type: userActionTypes.LOGIN_FAILURE,
    payload: error,
  });

  export const logout = () => ({
    type: userActionTypes.LOGOUT,
  });

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case userActionTypes.SIGNUP_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
        case userActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case userActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

      case userActionTypes.LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case userActionTypes.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
       case userActionTypes.BOOKING_SUCCESS :
        return {
          ...state,
          isAuthenticated : true,
          booked : action.payload,
          errer : null,
        }

        case userActionTypes.BOOKING_FAILURE :
          return {
            ...state ,
            isAuthenticated : true,
            booked : null,
            error : action.payload
          };
          
        default:
      return state;
  }
};

export default userReducer;
