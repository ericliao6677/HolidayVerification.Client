<script setup>
import { ref } from 'vue';
import { holidayService } from '@/services/holidayServices';

const selectedDate = ref('');
const holidayInfo = ref({});

const getHolidayByDate = async (date) => {
    const res = await holidayService.getByDate(date);
    const { returnData } = await res.data;
    if (!returnData) {
        alert(`${date} 為平日!!!`);
        //selectedDate.value = '';
        return;
    }
    returnData.isHoliday = returnData.isHoliday === true ? '是' : '否';
    holidayInfo.value = returnData;
};
</script>

<template>
    <div class="container">
        <div class="d-flex justify-content-center align-items-start">

            <div class="d-flex align-items-center m-3">
                <span class="w-25">選取日期: </span>&ensp;
                <input type="date" class="form-control w-50" v-model="selectedDate" />&ensp;
                <button class="btn btn-primary w-25" @click="getHolidayByDate(selectedDate)">查詢</button>
            </div>
            <div class="card mb-3" style="max-width: 20rem;min-width: 20rem" v-if="Object.keys(holidayInfo).length !== 0">
                <div class="card-header">查詢結果</div>
                <div class="card-body text-dark">
                    <h4 class="card-title mb-3">{{ holidayInfo.date }}</h4>                   
                    <p class="card-text"><strong>假日名稱: </strong>{{holidayInfo.name }}</p>
                    <p class="card-text"><strong>是否為假日: </strong> {{holidayInfo.isHoliday }}</p>
                    <p class="card-text"><strong>種類: </strong> {{holidayInfo.holidayCategory }}</p>
                    <p class="card-text"><strong>描述: </strong> {{holidayInfo.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<style></style>