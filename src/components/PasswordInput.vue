<template>
    <div class="input-icon-wrapper">
        <input :id="id" :type="showPassword ? 'text' : 'password'" :placeholder="placeholder" class="form-control"
            v-bind="{ ...$attrs }" v-model="modelValue" @input="$emit('update:modelValue', modelValue)"
            @focus="$emit('focus', $event)" />
        <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" class="input-icon"
            @click="togglePasswordVisibility" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 停用自動將 $attrs 放在根元素
defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: '請輸入密碼'
    },
    id: {
        type: String,
        default: 'password'
    }
})

const emit = defineEmits(['update:modelValue', 'focus'])

const showPassword = ref(false)
const modelValue = ref(props.modelValue)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
</script>

<style scoped>
.input-icon-wrapper {
    position: relative;
}

.input-icon-wrapper input {
    padding-right: 2.5rem;
}

.input-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #888;
    font-size: 1.2rem;
    cursor: pointer;
}

.input-icon:hover {
    color: #333;
}

.input-error {
    border: 2px solid #bb3c3c; 
}

</style>