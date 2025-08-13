<template>
    <div v-if="visible" class="custom-error-alert">
        <div class="custom-error-icon">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" />
                <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
            </svg>
        </div>
        <div class="custom-error-text">{{ message }}</div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    message: {
        type: String,
        default: ''
    },
    autoHide: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number,
        default: 100000 // 毫秒
    }
})

const visible = ref(false)
let timer = null

watch(
    () => props.message,
    (newVal) => {
        if (newVal) {
            visible.value = true
            if (props.autoHide) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    visible.value = false
                }, props.duration)
            }
        } else {
            visible.value = false
        }
    }
)
</script>

<style scoped>
.custom-error-alert {
    width: 95%;
    display: flex;
    align-items: center;
    border: 1px solid #d13212;
    background-color: #fdf3f1;
    color: #d13212;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 16px;
    transition: opacity 0.3s ease;
}

.custom-error-icon {
    margin-right: 8px;
    flex-shrink: 0;
}

.custom-error-icon svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #d13212;
    stroke-width: 1.5;
}

.custom-error-text {
    flex: 1;
}
</style>
