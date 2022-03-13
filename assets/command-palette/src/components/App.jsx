import {
    defineComponent, ref,
} from "vue";
import SearchBox from "./SearchBox";
import ResultBox from "./ResultBox";

export default defineComponent({
    name: 'App',

    setup() {
        const show = ref(true);
        document.addEventListener('keyup', e => {
            if (e.key === '/') {
                show.value = !show.value;
            }
        })

        return () => (
            <>
                <div className="app-wrapper" v-show={show.value}>
                    <SearchBox />
                    <ResultBox />
                </div>
                <div className="app-backdrop" v-show={show.value}></div>
            </>
        )
    },
})