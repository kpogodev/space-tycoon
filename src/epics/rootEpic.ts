import { combineEpics } from "redux-observable";
import authEpic from "./authEpic";
import accountAgentEpic from "./accountAgentEpic";

export const rootEpic = combineEpics(
    authEpic,
    accountAgentEpic,
);

export default rootEpic;