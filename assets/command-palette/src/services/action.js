import { computed, ref } from "vue";

const active = ref(0);
const keyword = ref('');
const setKeyword = (str) => {
    keyword.value = str;
    active.value = 0;
}

const actions = Joomla.getOptions('ff_actions');

const ffcommands = {
    addAction(payload) {

    }
};

window.ffcomands = window.ffcomands || ffcommands;

export {
    setKeyword,
}