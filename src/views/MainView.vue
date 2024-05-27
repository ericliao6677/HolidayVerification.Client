<script setup>
import { ref } from 'vue';
import HomeView from './HomeView.vue'
import SearchView from './SearchView.vue'
const currentTab = ref('清單');


</script>
<template>
  <div>
    <h3 class="mb-4">假日驗證</h3>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{
            active: currentTab === '清單',
            'text-light': currentTab === '清單',
            'text-dark': currentTab !== '清單'
          }"
          aria-current="page"
          href="#"
          @click="
            {
              currentTab = '清單';
            }
          "
          >清單</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{
            active: currentTab === '查詢',
            'text-light': currentTab === '查詢',
            'text-dark': currentTab !== '查詢'
          }"
          href="#"
          @click="
            {
              currentTab = '查詢';
            }
          "
          >查詢</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
        
          :class="{
            active: currentTab === '上傳檔案',
            'text-light': currentTab === '上傳檔案',
            'text-dark': currentTab !== '上傳檔案'
          }"
          href="#"
          @click="
            {
              currentTab = '上傳檔案';
            }
          "
          >上傳檔案</a
        >
      </li>
    </ul>
    <hr />
    <div>
      <HomeView v-if="currentTab === '清單'"></HomeView>
      <SearchView v-if="currentTab === '查詢'"></SearchView>
    </div>
  </div>
</template>
<style></style>
