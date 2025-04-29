<template>
	<button :class="['btn', btnClass, { 'w-100': props.fullWidth }]" @click="handleClick">
		<span v-if="props.label">{{ props.label }}</span>
	</button>
</template>

<script setup>
import { computed } from 'vue'

// 定義 props
const props = defineProps({
	label: {
		type: String,
		required: true
	},
	clickAction: {
		type: Function,
		required: true
	},
	btnType: {
		type: String,
		default: 'default'
	},
	fullWidth: {
		type: Boolean,
		default: true
	}
})

// 計算按鈕樣式
const btnClass = computed(() => {
	switch (props.btnType) {
		case 'primary':
			return 'custom-btn-primary'
		case 'primary-reversed':
			return 'custom-btn-primary-reversed'
		case 'cancel':
			return 'custom-btn-cancel'
		case 'edit':
			return 'custom-btn-edit'
		case 'delete':
			return 'custom-btn-delete'
		case 'add':
			return 'custom-btn-add'
		case 'secondary':
			return 'custom-btn-secondary'
		default:
			return 'custom-btn-default'
	}
})

// 點擊處理
const handleClick = () => {
	props.clickAction()
}
</script>

<style scoped>
.btn {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

/* 按鈕樣式 */
.custom-btn-primary {
	background-color: #4AA3A1;
	color: #FFFFFF;
}

.custom-btn-primary:hover {
	background-color: #3B8786;
	color: #FFFFFF;
}

.custom-btn-cancel {
	background-color: #CCCCCC;
	color: #333333;
}

.custom-btn-cancel:hover {
	background-color: #B0B0B0;
	color: #333333;
}

.custom-btn-edit {
	background-color: #F7B733;
	color: #FFFFFF;
}

.custom-btn-edit:hover {
	background-color: #E0A623;
	color: #FFFFFF;
}

.custom-btn-delete {
	background-color: #E06D6D;
	color: #FFFFFF;
}

.custom-btn-delete:hover {
	background-color: #C95050;
	color: #FFFFFF;
}

.custom-btn-add {
	background-color: #6BBF9F;
	color: #FFFFFF;
}

.custom-btn-add:hover {
	background-color: #56A989;
	color: #FFFFFF;
}

.custom-btn-secondary {
	background-color: #999999;
	color: #FFFFFF;
}

.custom-btn-secondary:hover {
	background-color: #7A7A7A;
	color: #FFFFFF;
}

.custom-btn-default {
	background-color: #92C8C7;
	color: #FFFFFF;
}

.custom-btn-primary-reversed {
	background-color: #ffffff;
	color: #4AA3A1;
	border: 2px solid #4AA3A1;
}

.custom-btn-primary-reversed:hover {
	/* background-color: #3B8786; */
	color: #3B8786;
	border-color: #3B8786;
}

</style>