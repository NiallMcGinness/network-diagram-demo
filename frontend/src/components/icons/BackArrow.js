import React from "react";

export default class BackArrow extends React.Component {
    render() {
        return (
            <svg width="24" height="24">
                <rect width="24" height="24" fill="none" rx="0" ry="0" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#2596d4" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.65895C12 6.2012 11.4359 5.9841 11.129 6.32374L6.30291 11.6648C6.13088 11.8552 6.13088 12.1448 6.30291 12.3352L11.129 17.6763C11.4359 18.0159 12 17.7988 12 17.341V14.5H16C16.5523 14.5 17 14.0523 17 13.5V10.5C17 9.94771 16.5523 9.49999 16 9.49999H12V6.65895Z" fill="#0f0f0f" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.65895C12 6.2012 11.4359 5.9841 11.129 6.32374L6.30291 11.6648C6.13088 11.8552 6.13088 12.1448 6.30291 12.3352L11.129 17.6763C11.4359 18.0159 12 17.7988 12 17.341V14.5H16C16.5523 14.5 17 14.0523 17 13.5V10.5C17 9.94771 16.5523 9.49999 16 9.49999H12V6.65895Z" fill="undefined" fill-opacity="undefined" />
            </svg>
        );
    }
}