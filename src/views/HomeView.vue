<script setup>
import { onMounted, ref, computed } from 'vue';
import { holidayService } from '@/services/holidayServices';
import PaginationItem from '../components/PaginationItem.vue';
import ModalComponent from '../components/ModalComponent.vue';
//import { returnCodeEnum } from '@/utils/enums';

const holidays = ref([]);

const pageSize = ref(10);
const currentPage = ref(1);
const updateHolidayInfo = ref({});
const currentHolidayData = ref({});
const modal = ref(null);

//呼叫get api
const getHoliday = async () => {
  const res = await holidayService.get();
  //解構賦值，參數命名須與回傳的陣列名稱一樣
  const { returnData } = await res.data;
  returnData.forEach((x) => (x.isHoliday = x.isHoliday === true ? '是' : '否'));
  holidays.value = [...returnData];
};

const changePageParent = (page) => {
  currentPage.value = page;
};

//總比數
const holidaysCount = computed(() => {
  return holidays.value.length;
});

//分頁
const holidaysFilterBySliced = computed(() => {
  const skipCount = (currentPage.value - 1) * pageSize.value;
  const data = holidays.value.slice(skipCount, skipCount + pageSize.value);
  return data;
});

//編輯按鈕觸發
const updateBtnClicked = (holiday) => {
  let selectedHoliday = { ...holiday };
  currentHolidayData.value = selectedHoliday;
  modal.value.myModalShow();
};

//modal組件中觸法儲存事件
const updateSaveChange = async (holidayInfo) => {
  let holidayInfoFromChild = { ...holidayInfo };
  console.log(holidayInfoFromChild);
  const result = await updateToDb(holidayInfoFromChild);
  modal.value.myModalHide();
  alert(result);
  await getHoliday();
};

//呼叫update api
const updateToDb = async (payload) => {
  const res = await holidayService.update(payload);
  const { returnMessage } = await res.data;
  return returnMessage;
};

onMounted(async () => {
  await getHoliday();
});
</script>

<template>
  <hr />
  <table class="table table-hover">
    <thead class="table-light">
      <tr>
        <th scope="col" class="w-auto">日期</th>
        <th scope="col" class="w-auto">名稱</th>
        <th scope="col" class="w-auto">是否為假日</th>
        <th scope="col" class="w-auto">種類</th>
        <th scope="col" class="w-50">描述</th>
        <th scope="col" class="w-auto"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in holidaysFilterBySliced" :key="item.id">
        <th scope="col">{{ item.date }}</th>
        <th scope="col">{{ item.name }}</th>
        <th scope="col">{{ item.isHoliday }}</th>
        <th scope="col">{{ item.holidayCategory }}</th>
        <th scope="col">{{ item.description }}</th>
        <th scope="col">
          <div class="d-flex">
            <button type="button" class="btn btn-primary btn-sm" @click="updateBtnClicked(item)">
              編輯</button
            >&ensp;
            <button class="btn btn-danger btn-sm">刪除</button>
          </div>
        </th>
      </tr>
    </tbody>
  </table>

  <PaginationItem :totalData="holidaysCount" :pageSize="pageSize" @changePage="changePageParent">
  </PaginationItem>

  <!--彈出視窗-->
  <ModalComponent
    ref="modal"
    modalId="update"
    title="編輯資料"
    :holidayInfo="currentHolidayData"
    @updatedData="updateSaveChange"
  ></ModalComponent>
</template>
