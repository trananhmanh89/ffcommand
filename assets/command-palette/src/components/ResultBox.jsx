import { computed, defineComponent } from 'vue';
import {
    matchedActions,
    activeIndex,
} from '../services/action';

export default defineComponent({
    name: 'ResultBox',
    setup() {
        const activeIdx = activeIndex;
        const actions = matchedActions;
        const listItem = computed(() => actions.value.map((task, idx) => {
            const className = ['result-item'];

            if (activeIdx.value === idx) {
                className.push('active');
            }

            return <li className={className.join(' ')} key={task.id}>{task.title}</li>
        }));

        return () => (
            <div className="result-box">
                <ul className="result-list">
                    {listItem.value}
                </ul>
            </div>
        )
    }
})