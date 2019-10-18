import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize('G-48XPBWNCJ6');
}

// Initialize google analytics page view tracking
export const PageView = () => {
    ReactGA.pageview(window.location.pathname +
        window.location.search);
}


