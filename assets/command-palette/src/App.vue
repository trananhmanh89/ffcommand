<script>
import SearchBox from "./components/SearchBox.vue";
import ResultBox from "./components/ResultBox.vue";

export default {
    components: {
        SearchBox,
        ResultBox,
    }
}
</script>

<template>
    <div class="app-wrapper">
        <search-box></search-box>
        <result-box></result-box>
    </div>
</template>

<style lang="scss">
.app-wrapper {
    width: 100%;
    max-width: 700px;
    margin-top: 15vh;
    margin-left: auto;
    margin-right: auto;
}
</style>
