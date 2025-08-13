<template>
    <div class="calendar-container">


        <div class="calendar-main">
            <div class="calendar-main-content">
                <div class="calendar-header">
                    <div class="calendar-header-button" @click="prevMonth">
                        <font-awesome-icon :icon="['fas', 'angle-left']" />
                    </div>
                    <div class="calendar-header-text">
                        {{ months[month] }} {{ year }}
                    </div>
                    <div class="calendar-header-button" @click="nextMonth">
                        <font-awesome-icon :icon="['fas', 'angle-right']" />
                    </div>

                    <div class="calendar-header-add-button" @click="onAdd">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </div>
                </div>
                <div class="calendar-weeks">
                    <div v-for="week in weeks" :key="week" class="calendar-week calendar-grid">
                        {{ week }}
                    </div>
                </div>

                <div class="calendar-dates">
                    <div v-for="day in days" :key="day" class="calendar-date calendar-grid" @click="selectDate(day)">
                        <template v-if="day">
                            <div class="calendar-date-background" @click="selectDate(day)">
                                <div class="calendar-date-text" :class="{
                                    'calendar-date-today': isTodayCell(day),
                                    'calendar-date-selected': day === selectedDate
                                }">
                                    {{ day }}
                                </div>
                                <div class="calendar-date-detail" v-show="day === 20">
                                    <div class="calendar-date-detail-item">
                                        <div class="calendar-date-detail-icon">
                                            <font-awesome-icon :icon=petRecords[0].type />
                                        </div>
                                        <div class="calendar-date-detail-text">
                                            {{ petRecords[0].text }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="calendar-date-background empty-cell"></div>
                        </template>
                    </div>
                </div>

            </div>
        </div>

        <AddRecordModal v-if="showAddModal" @close="closeAddModal" />

        <div class="calendar-details" v-if="selectedDate" :class="{ expanded: isExpanded }"
            :style="{ height: isMobile ? currentHeight + 'svh' : null }">
            <div class="calendar-details-buttons">
                <div class="calendar-details-dragbar" @click="onClickDesktop" ref="targetButton"
                    @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                    <div class="calendar-details-dragbar-button">
                    </div>
                </div>
                <div class="calendar-details-close" @click="selectedDate = null"><font-awesome-icon
                        :icon="['fas', 'xmark']" />
                </div>
            </div>
            <div class="calendar-details-date">
                {{ year }} 年 {{ month + 1 }} 月 {{ selectedDate }} 日 ({{ weeks[new Date(year, month,
                    selectedDate).getDay()]
                }})
            </div>
            <div class="calendar-details-pet-records">
                <div v-for="petRecord in petRecords" :key="petRecord" class="calendar-details-pet-record">
                    <font-awesome-icon :icon=petRecord.type /> {{ petRecord.text }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddRecordModal from '@/components/AddRecordModal.vue'


const isMobile = ref(false)


onMounted(() => {
    console.log('UA:', navigator.userAgent)
    isMobile.value = /Mobi|Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    console.log('isMobile', isMobile.value);

    document.body.classList.add('noscroll');
});

onUnmounted(() => {
    document.body.classList.remove('noscroll');

});


const startY = ref(0)
const currentHeight = ref(30)
const maxHeight = 65
const minHeight = 30

function handleTouchStart(e) {
    startY.value = e.touches[0].clientY
    console.log('start');

}

function handleTouchMove(e) {

    e.preventDefault();

    const deltaY = startY.value - e.touches[0].clientY; // 手指往上移是正值
    const newHeight = currentHeight.value + (deltaY / window.innerHeight) * 100;

    if (newHeight > maxHeight) currentHeight.value = maxHeight;
    else if (newHeight < minHeight) currentHeight.value = minHeight;
    else currentHeight.value = newHeight;

    // 更新 startY 為最新位置，否則拖動會跳動
    startY.value = e.touches[0].clientY;

    console.log(currentHeight.value);

}

function handleTouchEnd() {

    if (currentHeight.value >= (maxHeight + minHeight) / 2) {
        currentHeight.value = maxHeight
        isExpanded.value = true
    }
    if (currentHeight.value <= (maxHeight + minHeight) / 2) {
        currentHeight.value = minHeight
        isExpanded.value = false

    }

    
    console.log('end isExpanded', isExpanded.value);
}

const isExpanded = ref(false)
const onClickDesktop = () => {
    if (!isMobile.value) {
        console.log('點到了');
        isExpanded.value = !isExpanded.value
    }
}

const route = useRoute()
const router = useRouter()

const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const today = new Date()
const todayYear = today.getFullYear()
const todayMonth = today.getMonth()
const todayDate = today.getDate()

const parseQueryNumber = (value, fallback, min, max = Infinity) => {
    const num = parseInt(value)
    if (isNaN(num) || num < min || num > max) return fallback
    return num
}


const year = computed(() => parseQueryNumber(route.query.year, todayYear, 1970))
const month = computed(() => parseQueryNumber(route.query.month, todayMonth, 0, 11))
const date = computed(() => parseQueryNumber(route.query.date, todayDate, 1, 31))

const selectedDate = ref(todayDate)

const days = computed(() => {
    const totalDays = new Date(year.value, month.value + 1, 0).getDate()
    const firstDay = new Date(year.value, month.value, 1).getDay()

    const result = []
    for (let i = 0; i < firstDay; i++) result.push(null)
    for (let i = 1; i <= totalDays; i++) result.push(i)
    return result
})

const isTodayCell = (day) => {

    return (
        day === todayDate &&
        month.value === todayMonth &&
        year.value === todayYear
    )
}

const nextMonth = () => {
    let nextMonthValue = month.value + 1
    let nextYear = year.value
    if (nextMonthValue > 11) {
        nextMonthValue = 0
        nextYear++
    }

    let nextDate = selectedDate.value ?? todayDate

    router.replace({
        query: {
            year: nextYear,
            month: nextMonthValue,
            date: nextDate
        }
    })
}

const prevMonth = () => {
    let prevMonthValue = month.value - 1
    let prevYear = year.value

    if (prevMonthValue < 0) {
        prevMonthValue = 11
        prevYear--
    }

    let nextDate = selectedDate.value ?? todayDate

    router.replace({
        query: {
            year: prevYear,
            month: prevMonthValue,
            date: nextDate
        }
    })
}

const showAddModal = ref(false)

const onAdd = () => {
    console.log("新增按鈕被點擊");
    selectedDate.value = null
    showAddModal.value = true
}

const closeAddModal = () => {
    showAddModal.value = false
}

const selectDate = (day) => {
    if (day !== null) {
        selectedDate.value = day
    }
}

// 監聽 query 變化，確保畫面更新
watch(() => route.query, (newQuery, oldQuery) => {
}, { deep: true })

const petRecords = ref([
    { type: ['fas', 'star'], text: 'asdwr' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
    { type: ['fas', 'paw'], text: '123213123412' },
])


</script>


<style scoped>
.calendar-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #F8FAF9;
    overflow: hidden;
}

.calendar-details {
    width: clamp(300px, 70%, 400px);
    background-color: white;
    max-height: calc(100svh - 80px);
    overflow-y: auto;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;
    display: flex;
    flex-direction: column;
}

.calendar-details-buttons {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}

.calendar-details-close {
    width: 20px;
    cursor: pointer;
    text-align: center;
}

.calendar-details-date {
    margin: 0px 40px 15px;
    font-weight: bold;
}

.calendar-details-pet-records {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.calendar-details-pet-record {
    padding: 10px 20px;
    background-color: #F8FAF9;
    border-radius: 10px;
    margin: 0 20px;
}

.calendar-main {
    flex-grow: 1;
    max-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    overflow-y: auto;
}

.calendar-main-content {
    margin: 30px 0;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

}

.calendar-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    gap: 2rem;
    position: relative;
}


.calendar-header-add-button {
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    z-index: 2;
    width: 30px;
    height: 30px;
    background-color: #4AA3A1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.calendar-header-add-button:hover {
    background-color: #3A8684;
}

.calendar-header-text {
    color: #3A8684;
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: bolder;
    font-style: normal;
}

.calendar-header-button {
    font-size: 18px;
    width: 25px;
    color: #9E9E9E;
}

.calendar-header-button:hover {
    cursor: pointer;
    font-size: 22px;
    color: #4AA3A1;
}

.calendar-header-button:active {
    color: #3A8684;
}

.calendar-weeks {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;
    justify-items: center;
    gap: 2px;
}

.calendar-dates {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    justify-items: center;
}

.calendar-week {
    aspect-ratio: 2.5 / 1;
    width: 100%;
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    color: #4AA3A1;
}

.calendar-grid {
    display: flex;
    justify-content: center;
    align-items: center;
}

.calendar-date {
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
}

.calendar-date::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.empty-cell {
    cursor: auto;
}


.calendar-date-background {
    width: 95%;
    height: 95%;
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
}

.calendar-date-selected {
    border: 2px solid #4AA3A1;
}

.calendar-date-text {
    color: #4A4A4A;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 3px;
    border-radius: 50%;
}

.calendar-date-today {
    background-color: #4AA3A1;
    color: #FFFFFF;
}

.calendar-date-text:not(.calendar-date-today):not(.calendar-date-selected):hover {
    border: 2px solid #939393;
}

.calendar-date-detail {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
}

.calendar-date-detail-item {
    margin: 0 8px;
    padding: 5px;
    display: flex;
    background-color: #E3F0EC;
    color: #333333;
    border-radius: 5px;
}

@media (max-width: 1010px) {

    .calendar-main {
        overflow: hidden;
        touch-action: none;
    }

    .calendar-container {
        height: calc(100svh - 70px);
        flex-direction: column;
    }

    .calendar-details {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30svh;
        border-radius: 20px 20px 0 0;
        transition: height 0.1s ease;
        padding-bottom: 15px;
    }

    .calendar-header {
        margin-bottom: 10px;
    }

    .calendar-header-add-button {
        width: 25px;
        height: 25px;
        font-size: 15px;
    }

    .calendar-details.expanded {
        height: 65svh;
        margin-bottom: 70px;
    }

    .calendar-details-close {
        display: none;
    }

    .calendar-details-dragbar {
        cursor: pointer;
        width: 100%;
        pointer-events: auto;
        margin: 5px auto;
        display: flex;
        justify-content: center;
        z-index: 999;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .calendar-details-dragbar-button {
        width: 40px;
        height: 5px;
        background-color: #ccc;
        border-radius: 5px;
    }

    .calendar-main {
        flex-grow: 0;
        min-height: auto;
    }

    .calendar-week {
        aspect-ratio: auto;

    }

    .calendar-date-background {
        align-items: center;
    }

    .calendar-date-text {
        width: clamp(25px, 5vw, 40px);
        height: clamp(25px, 5vw, 40px);
        font-size: clamp(10px, 2.5vw, 16px);
    }

    .calendar-date-detail-item {
        font-size: 8px;
    }
}
</style>