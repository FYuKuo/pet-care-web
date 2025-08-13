<template>
    <div class="record-modal-container">
        <div class="record-modal-main">
            <div class="record-modal-content">

                <!-- Header -->
                <div class="record-modal-header">
                    <div class="record-modal-header-text">
                        新增寵物紀錄
                    </div>
                    <div class="record-modal-header-button" @click="closeModal">
                        <font-awesome-icon :icon="['fas', 'xmark']" />
                    </div>
                </div>

                <!-- Step 1: 選擇寵物與 record type -->
                <div v-if="!step2" class="record-modal-inputs">
                    <div class="pet-selection">
                        <div v-for="pet in pets" :key="pet.petId" class="pet-card"
                            :class="{ selected: petId === pet.petId }" @click="petId = pet.petId">
                            <img class="pet-image" :src="pet.img || defaultPetImg" alt="pet" />
                            <div class="pet-name">{{ pet.name }}</div>
                        </div>
                    </div>

                    <div class="record-type-selection">
                        <div v-for="type in recordTypes" :key="type.id" class="record-type-icon"
                            @click="selectRecordType(type)">
                            <font-awesome-icon :icon="['fas', type.icon]" size="2x" />
                            <div>{{ type.label }}</div>
                        </div>
                    </div>
                </div>

                <!-- Step 2: 填寫表單 -->
                <div v-else class="record-modal-inputs">
                    <!-- 顯示選擇的寵物和 type -->
                    <div class="current-selection">
                        <span class="back-button" @click="backSelectRecordType()">
                            <font-awesome-icon :icon="['fas', 'arrow-left']" />
                        </span>
                        <span>{{ currentPet.name }}</span> <span style="color: #8c8c94"><font-awesome-icon
                                :icon="['fas', 'angle-right']" /></span>
                        <span>{{ currentRecordType.label }}</span>
                    </div>

                    <!-- 日期 -->
                    <div class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label for="date">日期</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="datetime-local" id="date" v-model="datetime" class="form-control"
                                min="1970-01-01T00:00" />
                        </div>
                    </div>

                    <!-- 根據 type 顯示對應欄位 -->
                    <div v-if="currentRecordType.id === 'weight'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label for="weight">體重</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="number" id="weight" v-model="weight" class="form-control" min="0" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'temperature'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label for="temperature">體溫</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="number" id="temperature" v-model="temperature" class="form-control" min="0" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'stool'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>大便</label>
                        </div>
                        <div class="record-modal-input-answer record-modal-input-check">
                            <div v-for="option in stoolOptions" :key="option.value"
                                class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :id="option.id" :value="option.value"
                                    v-model="stool">
                                <label class="form-check-label" :for="option.id">{{ option.label }}</label>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'stool'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>大便描述</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <textarea v-model="stoolDetail" class="form-control" rows="5" cols="50"></textarea>
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'urine'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>小便</label>
                        </div>
                        <div class="record-modal-input-answer record-modal-input-check">
                            <div v-for="option in urineOptions" :key="option.value"
                                class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :id="option.id" :value="option.value"
                                    v-model="urine">
                                <label class="form-check-label" :for="option.id">{{ option.label }}</label>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'urine'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>小便描述</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="text" v-model="urineDetail" class="form-control" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'waterIntake'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>水量</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="number" v-model="waterIntake" class="form-control" min="0" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'foodIntake'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>食量</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="number" v-model="foodIntake" class="form-control" min="0" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'mentalState'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>精神</label>
                        </div>
                        <div class="record-modal-input-answer record-modal-input-check">
                            <div v-for="option in mentalStateOptions" :key="option.value"
                                class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :id="option.id" :value="option.value"
                                    v-model="mentalState">
                                <label class="form-check-label" :for="option.id">{{ option.label }}</label>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'mentalState'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>精神描述</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="text" v-model="mentalStateDetail" class="form-control" />
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'appetite'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>食慾</label>
                        </div>
                        <div class="record-modal-input-answer record-modal-input-check">
                            <div v-for="option in appetiteOptions" :key="option.value"
                                class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" :id="option.id" :value="option.value"
                                    v-model="appetite">
                                <label class="form-check-label" :for="option.id">{{ option.label }}</label>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentRecordType.id === 'appetite'" class="record-modal-input">
                        <div class="record-modal-input-title">
                            <label>食慾描述</label>
                        </div>
                        <div class="record-modal-input-answer">
                            <input type="text" v-model="appetiteDetail" class="form-control" />
                        </div>
                    </div>

                    <CommonErrorMessage :message="errorMessage" />

                    <div class="record-modal-buttons">
                        <Button :label="'儲存'" :clickAction="saveRecord" btnType="primary" :fullWidth="false" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/Button.vue'
import CommonErrorMessage from '@/components/CommonErrorMessage.vue'

const defaultPetImg = 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=80&q=80' // 預設狗狗圖

// pets 裡面加個 img 屬性，如果沒有就使用 defaultPetImg
const pets = ref([
    { name: "酸菜", petId: '1ac233b6-f3bf-43c8-9f2e-9901a8c346cc', img: '' },
    { name: "Una", petId: '2471e667-a75e-46a2-a4b7-b2d7fc4cbd8a', img: '' },
    { name: "Uni", petId: '5351f2ee-66cc-42a5-81d0-5a17051ec267', img: '' },
    { name: "黑嚕", petId: '650c3bf2-4ef7-4524-8d61-7438e20e49a1', img: '' },
    { name: "囧", petId: 'bbed9342-40a6-4d1e-9e6e-6c0c5a8750a9', img: '' },
])
const petId = ref(null)
if (pets.value.length > 0) petId.value = pets.value[0].petId

const datetimeTimestamp = ref(Date.now())
const datetime = computed({
    get() {
        const d = new Date(datetimeTimestamp.value)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hour = String(d.getHours()).padStart(2, '0')
        const minute = String(d.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hour}:${minute}`
    },
    set(val) {
        datetimeTimestamp.value = new Date(val).getTime()
    }
})


const weight = ref(null)
const temperature = ref(null)
const waterIntake = ref(null)
const foodIntake = ref(null)
const stoolDetail = ref(null)
const urineDetail = ref(null)
const mentalStateDetail = ref(null)
const appetiteDetail = ref(null)

const stool = ref(null)
const urine = ref(null)
const mentalState = ref(null)
const appetite = ref(null)

const stoolOptions = [
    { value: 0, label: '正常排便', id: 'stool-normal' },
    { value: 1, label: '偏軟', id: 'stool-soft' },
    { value: 2, label: '偏硬', id: 'stool-hard' },
    { value: 3, label: '沒排便', id: 'stool-no-stool' },
    { value: 4, label: '血便', id: 'stool-bloody' },
    { value: 99, label: '其他', id: 'stool-other' }
]

const urineOptions = [
    { value: "0", label: '正常排尿', id: 'urine-normal' },
    { value: "1", label: '混濁', id: 'urine-cloudy' },
    { value: "2", label: '少尿', id: 'urine-oliguria' },
    { value: "3", label: '沒排尿', id: 'urine-anuria' },
    { value: "4", label: '血尿', id: 'urine-bloody' },
    { value: "99", label: '其他', id: 'urine-other' }
]

const mentalStateOptions = [
    { value: "0", label: '有活力', id: 'mental-active' },
    { value: "1", label: '沮喪', id: 'mental-depressed' },
    { value: "2", label: '焦慮', id: 'mental-anxious' },
    { value: "3", label: '平靜', id: 'mental-calm' },
    { value: "99", label: '其他', id: 'mental-other' }
]

const appetiteOptions = [
    { value: "0", label: '良好', id: 'appetite-good' },
    { value: "1", label: '較少', id: 'appetite-reduced' },
    { value: "2", label: '沒進食', id: 'appetite-none' },
    { value: "3", label: '過多', id: 'appetite-excessive' },
    { value: "99", label: '其他', id: 'appetite-other' }
]

const selectedRecordType = ref(null)
const recordTypes = [
    { id: 'weight', label: '體重', icon: 'weight-scale' },
    { id: 'temperature', label: '溫度', icon: 'temperature-empty' },
    { id: 'stool', label: '排便', icon: 'poop' },
    { id: 'urine', label: '小便', icon: 'toilet' },
    { id: 'waterIntake', label: '水量', icon: 'glass-water' },
    { id: 'foodIntake', label: '食量', icon: 'bone' },
    { id: 'mentalState', label: '精神', icon: 'face-smile' },
    { id: 'appetite', label: '食慾', icon: 'utensils' },
]

const requiredFieldsMap = {
    weight: ['weight'],
    temperature: ['temperature'],
    waterIntake: ['waterIntake'],
    foodIntake: ['foodIntake'],
    stool: ['stool'],
    urine: ['urine'],
    mentalState: ['mentalState'],
    appetite: ['appetite'],
}

const step2 = ref(false)
const currentPet = computed(() => pets.value.find(p => p.petId === petId.value) || {})
const currentRecordType = ref(null)

const selectRecordType = (type) => {
    currentRecordType.value = type
    step2.value = true
}

const resetForm = () => {
    weight.value = null
    temperature.value = null
    waterIntake.value = null
    foodIntake.value = null
    stoolDetail.value = null
    urineDetail.value = null
    mentalStateDetail.value = null
    appetiteDetail.value = null
    stool.value = null
    urine.value = null
    mentalState.value = null
    appetite.value = null
}

const backSelectRecordType = () => {
    currentRecordType.value = null
    step2.value = false
    resetForm()
}

const errorMessage = ref('')

const saveRecord = () => {

    console.log('儲存資料:', {
        petId: petId.value,
        type: currentRecordType.value.id,
        datetime: datetime.value,
        weight: weight.value,
        temperature: temperature.value,
        waterIntake: waterIntake.value,
        foodIntake: foodIntake.value,
        stool: stool.value,
        stoolDetail: stoolDetail.value,
        urine: urine.value,
        urineDetail: urineDetail.value,
        mentalState: mentalState.value,
        mentalStateDetail: mentalStateDetail.value,
        appetite: appetite.value,
        appetiteDetail: appetiteDetail.value
    })

    const type = currentRecordType.value.id
    const requiredFields = requiredFieldsMap[type]

    const missingFields = requiredFields.filter(field => {
        return !eval(field + '.value') // 檢查 ref 是否有值
    })

    if (missingFields.length > 0) {
        errorMessage.value = "請填寫完整資料"
        return
    }

}

const emit = defineEmits(['close'])

const closeModal = () => {
    step2.value = false
    selectedRecordType.value = null

    emit('close')
}

</script>

<style scoped>
.record-modal-container {
    position: fixed;
    width: calc(100vw - 150px);
    height: calc(100svh - 80px);
    background-color: rgba(70, 70, 70, 0.412);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

}

.record-modal-main {
    width: 90%;
    height: 90%;
    background-color: white;
    border-radius: 10px;


}

.record-modal-content {
    height: 100%;
    padding: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.record-modal-header {
    display: flex;
    margin: 15px 0;
    position: relative;

}

.record-modal-inputs {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    overflow-y: auto;
    margin-bottom: 5px;
    align-items: center;
    padding: 10px 0;
}

.record-modal-buttons {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.record-modal-input {
    width: 95%;
    display: flex;
}

.record-modal-input select,
input {
    width: 100%;
}

.record-modal-input-check input {
    width: 16px;
}

.record-modal-input-title {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 38px;
}

.record-modal-input-answer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.record-modal-input-check {
    justify-content: start;
}

.record-modal-buttons button {
    border-radius: 25px !important;
    width: 50%;
}

.record-modal-header-text {
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 18px;

}

.record-modal-header-button {
    position: absolute;
    cursor: pointer;
    right: 1%;
}

.record-type-selection {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
}

.record-type-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    border-radius: 15px;
    transition: 0.2s;
    margin: 10px;
    padding: 15px;
    color: #4AA3A1;
}

.record-type-icon:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
}

.pet-selection {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.pet-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
    margin: 10px;
    padding: 15px;
    border-radius: 15px;
}

.pet-card.selected {
    transform: scale(1.1);
    border: 2px solid #233D4D;
}

.pet-card:hover:not(.pet-card.selected) {
    transform: scale(1.1);
    background-color: #f0f0f0;
}

.pet-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.pet-name {
    margin-top: 25px;
    font-weight: bold;
}

.current-selection {
    width: 95%;
    margin-bottom: 10px;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.current-selection span {
    font-weight: bold;
}

.back-button {
    cursor: pointer;
    color: #555;
}


@media (max-width: 1010px) {
    .record-modal-container {
        height: 100svh;
        width: 100vw;
        align-items: end;
    }

    .record-modal-main {
        height: 95%;
        width: 100%;
        border-radius: 20px 20px 0 0;
    }

    .record-modal-input-check {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .record-modal-input-check .form-check-inline {
        width: 40%
    }
}
</style>