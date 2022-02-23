import { defineComponent } from "vue";
import SearchBox from "./SearchBox";
// import ResultBox from "./ResultBox";

import '../style/App.scss';

export default defineComponent({
    name: 'App',

    setup() {

        return () => (
            <div className="app-wrapper">
                <SearchBox />
                {/* <ResultBox /> */}
            </div>
        )
    },
})