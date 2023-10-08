import { createContext, useReducer } from "react";

export const GrievancesContext = createContext();

export const grievancesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GRIEVANCES':
            return {
                ...state,
                grievances: action.payload
            };
        case 'CREATE_GRIEVANCE':
            return {
                ...state,
                grievances: [action.payload, ...state.grievances]
            };
        case 'DELETE_GRIEVANCE':
            return {
                ...state,
                grievances: state.grievances.filter((g) => g._id !== action.payload._id)
            };
        case 'UPDATE_GRIEVANCE':
            return {
                ...state,
                grievances: state.grievances.map((g) =>
                    g._id === action.payload._id ? { ...g, status: action.payload.status, reply: action.payload.reply } : g
                )
            };
        default:
            return state;
    }
}

export const GrievancesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(grievancesReducer, {
        grievances: null
    });

    return (
        <GrievancesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GrievancesContext.Provider>
    );
}
