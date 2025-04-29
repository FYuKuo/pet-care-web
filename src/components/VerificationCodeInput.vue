<template>
    <div class="mb-4">
        <label for="confirmCode" class="form-label">驗證碼</label>
        <div class="code-inputs">
            <input v-bind="{ ...$attrs }" v-for="(digit, index) in 6" :key="index" type="text" maxlength="1" v-model="modelValue[index]"
                class="code-input" @input="moveFocus(index)" @paste="handlePaste($event)"
                @keydown="handleKeydown($event, index)" />
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'

// 停用自動將 $attrs 放在根元素
defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])


const moveFocus = (index) => {
    // 自動跳至下一個輸入框
    if (props.modelValue[index]?.length === 1 && index < 5) {
        const nextInput = document.querySelectorAll('.code-input')[index + 1]
        if (nextInput) nextInput.focus()
    }
}

const handlePaste = (event) => {
    // 獲取粘貼的內容
    const pastedText = event.clipboardData.getData('Text')

    // 僅取前6個字符並賦值給 confirmCode
    const pastedDigits = pastedText.slice(0, 6).split('')

    // 更新 confirmCode
    const updatedCode = [...props.modelValue]
    for (let i = 0; i < pastedDigits.length; i++) {
        updatedCode[i] = pastedDigits[i]
    }

    emit('update:modelValue', updatedCode)

    // 取消默認的粘貼行為
    event.preventDefault()

    // 自動將焦點移動到下一個空白框
    if (pastedDigits.length === 6) {
        const nextInput = document.querySelectorAll('.code-input')[5]
        nextInput?.focus()
    }
}

const handleKeydown = (event, index) => {
    if (event.key === 'Backspace') {
        // 如果當前輸入框是空的，並且不是第一個框，移動到上一個框
        if (!props.modelValue[index] && index > 0) {
            const prevInput = document.querySelectorAll('.code-input')[index - 1]
            if (prevInput) {
                prevInput.focus()
                prevInput.value = ''
                const updatedCode = [...props.modelValue]
                updatedCode[index - 1] = ''
                emit('update:modelValue', updatedCode)
            }
        }
    }
}
</script>

<style scoped>
.code-inputs {
    display: flex;
    justify-content: space-between;
}

.code-input {
    width: clamp(35px, 10vw, 50px);
    height: clamp(35px, 10vw, 50px);
    text-align: center;
    font-size: clamp(16px, 4vw, 18px);
    border: 1px solid #ccc;
    border-radius: 4px;
}

.code-input:focus {
    border-color: #0b57d0;
    outline: none;
}

.input-error {
    border: 2px solid #bb3c3c; 
}
</style>