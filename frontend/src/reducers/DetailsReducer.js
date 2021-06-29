export default function DetailsReducer(state, action) {

    switch (action.type) {

        case "SELECT_NEW_DIAGRAM":
            console.log(`  action.type in reducer  ${action.type}  `);
            console.log(` action.payload   ${JSON.stringify(action.payload)}  `);
            return action.payload;

        default:
            return state;
    }

}