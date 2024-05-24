<script setup>
import { onMounted, ref } from 'vue';
import { holidayService } from '@/services/holidayServices';
import { returnCodeEnum } from '@/utils/enums';

const holidays = ref([]);
const getHoliday = async () => {
  const res = await holidayService.get();
  //解構賦值，參數命名須與回傳的陣列名稱一樣
  const { returnData } = await res.data;
  returnData.forEach((x) => (x.isHoliday = x.isHoliday === true ? '是' : '否'));
  holidays.value = [...returnData];
};
onMounted(async () => {
  await getHoliday();
});
</script>

<template>
  <div class="d-flex">
    <h3>假日驗證</h3>
    <input type="date" />
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
    <tbody>
      <tr v-for="item in holidays" :key="item.id">
        <th scope="col">{{ item.date }}</th>
        <th scope="col">{{ item.name }}</th>
        <th scope="col">{{ item.isHoliday }}</th>
        <th scope="col">{{ item.holidayCategory }}</th>
        <th scope="col">{{ item.description }}</th>
      </tr>
    </tbody>
  </table>
</template>
