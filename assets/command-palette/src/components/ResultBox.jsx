import { defineComponent } from 'vue';
import { getTasks, getActive } from '../services/action';
import '../style/ResultBox.scss';

export default defineComponent({
    name: 'ResultBox',

    setup() {
        const tasks = getTasks;
        const activeIdx = getActive;

        return {
            tasks,
            activeIdx,
        }
    },

    render() {
        const {
            tasks,
            activeIdx,
        } = this;

        const listItem = tasks.map((task, idx) => {
            const className = ['result-item'];

            if (activeIdx === idx) {
                className.push('active');
            }

            return <li className={className.join(' ')} key={task.title}>{task.title}</li>
        })

        return (
            <div className="result-box">
                <ul className="result-list">
                    {listItem}
                </ul>
            </div>
        )
    }
})