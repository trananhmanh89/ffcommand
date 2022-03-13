import {
    defineComponent,
} from 'vue';
import {
    setIndex,
    setKeyword,
} from '../services/action';

export default defineComponent({
    name: 'SearchBox',

    setup(props) {

        const updateKeyword = event => {
            setKeyword(event.target.value);
        }

        const onKeyDown = event => {
            const { code } = event;
            if (code === 'ArrowUp' || code === 'ArrowDown') {
                event.preventDefault();

                const dir = code === 'ArrowUp' ? 'up' : 'down';
                setIndex(dir);
            }
        }

        return () => (
            <div className="search-box">
                <input type="text" onKeydown={onKeyDown} onInput={updateKeyword} />
            </div>
        )
    },
})