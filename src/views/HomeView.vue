<script setup>
import { onMounted, ref, computed } from 'vue';
import { holidayService } from '@/services/holidayServices';
import PaginationItem from '../components/PaginationItem.vue';
import ModalComponent from '../components/ModalComponent.vue';
//import { returnCodeEnum } from '@/utils/enums';

const holidays = ref([]);

const pageSize = ref(10);
const currentPage = ref(1);

const currentHolidayData = ref({});

//宣告modal
const updateModal = ref(null);
const deleteModal = ref(null);
const insertModal = ref(null);

//呼叫get api
const getHoliday = async () => {
  const res = await holidayService.get();
  //解構賦值，參數命名須與回傳的陣列名稱一樣
  const { returnData } = await res.data;
  //returnData.forEach((x) => (x.isHoliday = x.isHoliday === true ? '是' : '否'));
  holidays.value = [...returnData];
};

const changePageParent = (page) => {
  currentPage.value = page;
};

//總筆數
const holidaysCount = computed(() => {
  return holidays.value.length;
});

//分頁
const holidaysFilterBySliced = computed(() => {
  const skipCount = (currentPage.value - 1) * pageSize.value;
  const data = holidays.value.slice(skipCount, skipCount + pageSize.value);
  return data;
});

////新增
const showInsertModal = () => {
  insertModal.value.myModalShow();
};

const insertSaveChange = async (holidayInfo) => {
  let holidayInfoFromChild = { ...holidayInfo };
  const result = await insertHoliday(holidayInfoFromChild);
  insertModal.value.myModalHide();
  alert(result);
  await getHoliday();
};

const insertHoliday = async (payload) => {
  const res = await holidayService.insert(payload);
  const { returnMessage } = await res.data;
  return returnMessage;
};

////編輯
//編輯按鈕觸發
const showUpdateModal = (holiday) => {
  let selectedHoliday = { ...holiday };
  currentHolidayData.value = selectedHoliday;
  updateModal.value.myModalShow();
};

//modal組件中觸發儲存事件
const updateSaveChange = async (holidayInfo) => {
  let holidayInfoFromChild = { ...holidayInfo };
  console.log(holidayInfoFromChild);
  //呼叫update api
  const result = await updateHoliday(holidayInfoFromChild);
  //關閉modal
  updateModal.value.myModalHide();
  alert(result);
  await getHoliday();
};

//update api
const updateHoliday = async (payload) => {
  const res = await holidayService.update(payload);
  const { returnMessage } = await res.data;
  return returnMessage;
};

////刪除
const showDeleteModal = (holiday) => {
  let selectedHoliday = { ...holiday };
  currentHolidayData.value = selectedHoliday;
  deleteModal.value.myModalShow();
};

//modal組件中觸發刪除事件
const deleteSaveChange = async (holidayInfo) => {
  let holidayInfoFromChild = { ...holidayInfo };
  console.log(holidayInfoFromChild.id);
  const result = await deleteHoliday(holidayInfoFromChild.id);
  deleteModal.value.myModalHide();
  alert(result);
  await getHoliday();
};
//delete api
const deleteHoliday = async (id) => {
  const res = await holidayService.delete(id);
  const { returnMessage } = await res.data;
  return returnMessage;
};

onMounted(async () => {
  await getHoliday();
});
</script>

<template>
  <div class="d-flex justify-content-between m-2">
    <div></div>
    <button type="button" class="btn btn-success btn-sm" @click="showInsertModal()">新增</button>
  </div>

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
            <button type="button" class="btn btn-primary btn-sm" @click="showUpdateModal(item)">
              編輯</button
            >&ensp;
            <button class="btn btn-danger btn-sm" @click="showDeleteModal(item)">刪除</button>
          </div>
        </th>
      </tr>
    </tbody>
  </table>

  <PaginationItem :totalData="holidaysCount" :pageSize="pageSize" @changePage="changePageParent">
  </PaginationItem>

  <!--彈出視窗-->

  <ModalComponent
    ref="insertModal"
    modalId="insert"
    title="新增資料"
    btnName="新增"
    @btnEvent="insertSaveChange"
  ></ModalComponent>

  <ModalComponent
    ref="updateModal"
    modalId="update"
    title="編輯資料"
    btnName="儲存"
    v-model="currentHolidayData"
    :holidayInfo="currentHolidayData"
    @btnEvent="updateSaveChange"
  ></ModalComponent>

  <ModalComponent
    ref="deleteModal"
    modalId="delete"
    title="刪除資料"
    btnName="刪除"
    :holidayInfo="currentHolidayData"
    @btnEvent="deleteSaveChange"
  ></ModalComponent>
</template>
