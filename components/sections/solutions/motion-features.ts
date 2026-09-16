// Framer Motion's animation features (incl. layout, for the tab fill's
// layoutId), split into their own chunk: SolutionsTabs is below the fold, so
// its <LazyMotion> fetches this after hydration instead of shipping the
// animation engine in the page's first-load JS.
import { domMax } from "framer-motion";

export default domMax;
