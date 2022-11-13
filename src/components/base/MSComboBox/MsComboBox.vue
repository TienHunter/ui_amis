<template>
      <div class="combobox">           
        <input class="input" type="text" :value="selectedItem" readonly :tabindex="tabIndex">
        <span v-if="errorMess" class="input-error-mess">{{errorMess}}</span>
        <div class="combobox-button" @click="toggleList">
            <div class="icon icon--chervon-down"></div>
        </div>
        <div class="combobox-data" :class="className" v-if="isShowList">
            <div v-for="(item,index) in dataList" :key="index" class="data-item" :class="{'checked': selectedItem == item}" @click="emitItem(item)">{{item}}</div>
        </div>
    </div>
</template>

<script>
export default {
   name:"BaseCombobox",
    props:["selectedItem","className","dataList","errorMess","tabIndex"],
}
</script>

<style>

</style>