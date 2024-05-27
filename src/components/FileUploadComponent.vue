<script setup>
import { ref } from 'vue';

const emit = defineEmits(['upload']);
const selectedFile = ref(null);

const onFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
};

const uploadFile = () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    emit('upload', formData);
  } else {
    alert('Please select a file first.');
  }
};
</script>
<template>
  <div class="d-flex">
    <input
      ref="inputFileRef"
      class="form-control w-25 me-3"
      type="file"
      id="formFile"
      @change="onFileChange"
    />
    <button class="btn btn-primary" @click="uploadFile">確定</button>
  </div>
</template>
<style></style>
