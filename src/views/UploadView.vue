<script setup>
import { onMounted, ref } from 'vue';
import { holidayService } from '@/services/holidayServices';
import FileUploadComponent from '../components/FileUploadComponent.vue';

const holidays = ref([]);

const getUploadFileData = async () => {
  const res = await holidayService.getUploadFileData();
  const { returnData } = await res.data;
  holidays.value = [...returnData];
};

const uploadFileSaveChange = async (formData) => {
  console.log(formData);

  const res = await holidayService.uploadFile(formData);
  const { returnMessage } = res.data;
  console.log(returnMessage);
  await getUploadFileData();
};
</script>
<template>
  <div>
    <div class="mb-3">
      <label for="formFile" class="form-label">上傳csv檔</label>
      <FileUploadComponent @upload="uploadFileSaveChange"></FileUploadComponent>
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
  </div>
</template>
<style></style>
