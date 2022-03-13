import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { ref, watch } from 'vue';

const devtoolData = ref({});

export function registerData(key, payload) {
    devtoolData.value[key] = payload;
}

function setupDevtools(app) {
    setupDevtoolsPlugin({
        id: 'my-awesome-devtools-plugin',
        label: 'My Awesome Plugin',
        packageName: 'my-awesome-plugin',
        homepage: 'https://vuejs.org',
        app,
    }, api => {
        const inspectorId = 'inspectorId';

        api.addInspector({
            id: inspectorId,
            label: 'Awesome!',
            icon: 'pets',
        })

        watch(devtoolData.value, () => {
            api.sendInspectorState(inspectorId);
        })

        api.on.getInspectorTree((payload, context) => {
            if (payload.inspectorId === inspectorId) {
                payload.rootNodes = [
                    {
                        id: 'root',
                        label: 'Awesome root',
                    },
                ];
            }
        })

        api.on.getInspectorState((payload, context) => {
            if (payload.inspectorId === inspectorId) {
                if (payload.nodeId === 'root') {
                    payload.state = {
                        'data': [],
                    }

                    for (const key in devtoolData.value) {
                        const element = devtoolData.value[key];
                        payload.state.data.push({
                            key,
                            value: element,
                        })
                    }
                }
            }
        })
    })
}

export const devtoolPlugin = {
    install(app, options = {}) {
        setupDevtools(app)
    }
}
