jQuery(document).ready($ => {
    const $select = $('#jform_params_devmode');

    $select.on('change', () => {
        var val = $select.val();

        if (val === '1') {
            const ok = confirm(`This config is for dev only. If you don't know how it works, please don't touch it. Still wanna turn it on?`);
            if (!ok) {
                $select.val('0');
            };
        }
    })
})