import createAuth0Client from "@auth0/auth0-spa-js";
import authConfig from "../authConfig";
import placeService from "../services/placesService";

const CONFIGURE_START = "CONFIGURE_START";
const CONFIGURE_SUCCESS = "CONFIGURE_SUCCESS";
const CONFIGURE_FAILURE = "CONFIGURE_FAILURE";
const LOGOUT = "LOGOUT";

const redirectUri = process.env.NODE_ENV === "production"
? "https://www.taukopaikat.fi/redirect"
: "http://localhost:3000/redirect";

const defaultState = {
  authClient: null,
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  errored: false,
  targetUrl: null
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONFIGURE_START:
      return { ...state, loading: true, errored: false };
    case CONFIGURE_SUCCESS:
      console.log("Configure success");
      return {
        ...state,
        loading: false,
        errored: false,
        authClient: action.authClient,
        user: action.user,
        token: action.token,
        isAuthenticated: action.isAuthenticated,
        targetUrl: action.targetUrl
      };
    case CONFIGURE_FAILURE:
      return {
        ...state,
        authClient: null,
        loading: false,
        errored: true,
        isAuthenticated: false,
        user: null,
        token: null,
        targetUrl: null
      };
    case LOGOUT:
      return {
        ...state,
        authClient: null,
        user: null,
        token: null,
        isAuthenticated: null,
        loading: false,
        errored: false,
        targetUrl: null
      };
    default:
      return state;
  }
};

export const initializeAuth = () => {
  return async (dispatch, getState) => {
    console.log("init auth");    
    dispatch({ type: CONFIGURE_START });
    try {
      const auth0 = await createAuth0Client(authConfig());
      const isIn = await auth0.isAuthenticated();      
      let targetUrl = null;
      if (window.location.search.includes("code=") && isIn === false) {
        console.log("Auth0 handleRedirect");        
        const { appState } = await auth0.handleRedirectCallback(); 
        targetUrl = appState.targetUrl;                 
      }
      const isAuthenticated = await auth0.isAuthenticated();
      let user = null;
      let token = null;      
      if (isAuthenticated) {
        user = await auth0.getUser();
        token = await auth0.getTokenSilently();
        placeService.setToken(token);
      }
      dispatch({
        type: CONFIGURE_SUCCESS,
        authClient: auth0,
        isAuthenticated: isAuthenticated,
        token: token,
        user: user,
        targetUrl: targetUrl
      });
    } catch (error) {
      dispatch({ type: CONFIGURE_FAILURE });
      console.log(error);
    }
  };
};

export const loginAction = () => {
  return async (dispatch, getState) => {
    console.log("login");
    dispatch({ type: CONFIGURE_START });
    try {
      const authClient = await createAuth0Client(authConfig());
      await authClient.loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
        redirect_uri: redirectUri
      });
    } catch (error) {
      dispatch({ type: CONFIGURE_FAILURE });
      console.log(error);
    }
  };
};

export const logoutAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: CONFIGURE_START });
    try {
      const authClient = getState().user.authClient;
      authClient.logout({
        returnTo: window.location.origin
      });
      dispatch({
        type: LOGOUT
      });
    } catch (error) {
      dispatch({ type: CONFIGURE_FAILURE });
      console.log(error);
      return;
    }
  };
};

export default userReducer;
