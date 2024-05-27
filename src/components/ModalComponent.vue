<script setup>
import { onMounted, ref, watch } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

const props = defineProps(['modalId', 'title', 'holidayInfo']);
const emit = defineEmits(['updatedData']);
const childHoildayInfo = ref({});
const model = ref(null);
const myModal = ref(null);

const saveChange = () => {
  emit('updatedData', childHoildayInfo.value);
};

watch(
  () => props.holidayInfo,
  (newHolidayInfo) => {
    childHoildayInfo.value = { ...newHolidayInfo };
  },
  { immediate: true }
);
const myModalShow = () => {
  myModal.value.show();
};
const myModalHide = () => {
  myModal.value.hide();
};
onMounted(() => {
  myModal.value = new Modal(model.value);
});

defineExpose({
  myModalShow,
  myModalHide
});
</script>

<template>
  <div
    ref="model"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ props.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">日期</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                v-model="childHoildayInfo.date"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">名稱</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                v-model="childHoildayInfo.name"
              />
            </div>
          </div>
          <div class="mb-3 row align-items-center">
            <label for="staticEmail" class="col-sm-2 col-form-label">是否為假日</label>
            <div class="col-sm-10">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="是"
                  v-model="childHoildayInfo.isHoliday"
                />
                <label class="form-check-label" for="inlineRadio1">是</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="否"
                  v-model="childHoildayInfo.isHoliday"
                />
                <label class="form-check-label" for="inlineRadio2">否</label>
              </div>
              {{ childHoildayInfo.isHoliday }}
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">種類</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                v-model="childHoildayInfo.holidayCategory"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">描述</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                id="staticEmail"
                v-model="childHoildayInfo.description"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="saveChange">儲存</button>
          <button @click="myModalHide">test</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
