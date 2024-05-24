<script setup>
import { onMounted, ref } from 'vue';
import { holidayService } from '@/services/holidayServices';
import { returnCodeEnum } from '@/utils/enums';

const holidays = ref([]);
const selectedDate = ref('');

const getHoliday = async () => {
  const res = await holidayService.get();
  //解構賦值，參數命名須與回傳的陣列名稱一樣
  const { returnData } = await res.data;
  returnData.forEach((x) => (x.isHoliday = x.isHoliday === true ? '是' : '否'));
  holidays.value = [...returnData];
};

const getHolidayByDate = async (date) => {
  const res = await holidayService.getByDate(date);
  const { returnData } = await res.data;
  if (!returnData) {
    alert(`${date} 為平日!!!`);
    //selectedDate.value = '';
    return;
  }
  returnData.isHoliday = returnData.isHoliday === true ? '是' : '否';
  holidays.value = returnData;
};
onMounted(async () => {
  await getHoliday();
});
</script>

<template>
  <div class="d-flex justify-content-between">
    <h3>假日驗證</h3>
    <div class="d-flex align-items-center">
      <span class="w-25">選取日期: </span>&ensp;
      <input type="date" class="form-control w-50" v-model="selectedDate" />&ensp;
      <button class="btn btn-primary w-25" @click="getHolidayByDate(selectedDate)">查詢</button>
    </div>
  </div>

  <hr />
  <table class="table table-hover">
    <thead class="table-light">
      <tr>
        <th scope="col" class="w-auto">日期</th>
        <th scope="col" class="w-auto">名稱</th>
        <th scope="col" class="w-auto">是否為假日</th>
        <th scope="col" class="w-auto">種類</th>
        <th scope="col" class="w-50">描述</th>
      </tr>
    </thead>
    <tbody v-if="Array.isArray(holidays)">
      <tr v-for="item in holidays" :key="item.id">
        <th scope="col">{{ item.date }}</th>
        <th scope="col">{{ item.name }}</th>
        <th scope="col">{{ item.isHoliday }}</th>
        <th scope="col">{{ item.holidayCategory }}</th>
        <th scope="col">{{ item.description }}</th>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <th scope="col">{{ holidays.date }}</th>
        <th scope="col">{{ holidays.name }}</th>
        <th scope="col">{{ holidays.isHoliday }}</th>
        <th scope="col">{{ holidays.holidayCategory }}</th>
        <th scope="col">{{ holidays.description }}</th>
      </tr>
    </tbody>
  </table>
</template>
