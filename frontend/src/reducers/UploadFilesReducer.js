


export default function reducer(state, action) {

    switch (action.type) {

        case "ADD_NEW_FILES":
            console.log(` ADD_NEW_FILES `)
            return {
                ...state, ...action.payload
            }

        case "REPLACE_ALL_FILES":
            return {
                ...action.payload
            }

        case "DELETE_ALL_FILES":
            return []

        default:
            return state

    }

}
