import {
    computed,
    ref,
} from "vue";
import md5 from "md5";
import { registerDevtoolData } from "./devtool";

const _activeIndex = ref(0);
const _keyword = ref('');
const activeIndex = computed(() => _activeIndex.value);
const registered = {};
const actions = ref([]);
const ffactions = Joomla.getOptions('ff_actions');

function registerAction(data, parentid) {
    parentid = parentid || md5('-');

    const id = md5(parentid + ' > ' + data.title);

    if (registered[id]) {
        return;
    }

    registered[id] = 1;

    actions.value.push({
        id,
        parentid,
        title: data.title,
        endpoint: data.endpoint,
        action: data.action,
    });

    if (data.children && Array.isArray(data.children)) {
        data.children.forEach(kid => registerAction(kid, id));
    }
}

ffactions.forEach(act => {
    registerAction(act);
})

const matchedActions = computed(() => {
    return actions.value;
})

function setKeyword(str) {
    _keyword.value = str;
    _activeIndex.value = 0;
}

function setIndex(dir) {
    const numItem = matchedActions.value.length;
    const current = _activeIndex.value;

    if (dir === 'up' && current > 0) {
        _activeIndex.value--;
    }

    if (dir === 'down' && current < numItem - 1) {
        _activeIndex.value++;
    }
}

const ffcommand = {
    registerAction,
};

registerDevtoolData('activeIndex', activeIndex);
registerDevtoolData('actions', actions);

window.ffcommand = ffcommand;

export {
    setKeyword,
    setIndex,
    activeIndex,
    matchedActions,
}