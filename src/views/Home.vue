<template>
  <!-- Banner -->
  <div class="home-banner">
    <div class="home-banner-text">
      <span class="mb-2">
        <h1>
          每天一點點，寫下牠的幸福日常
        </h1>
      </span>
      <span class="mt-2">
        <h3>
          從飲食到健康，用心守護毛小孩的一輩子
        </h3>
      </span>
    </div>
  </div>

  <!-- Features -->
  <div class="home-features home-block" id="features">
    <div class="home-features-title home-block-title">
      <div>
        Features
      </div>
    </div>
    <div class="home-features-items home-block-items">
      <div v-for="(feature, index) in features" :key="index" class="home-features-item">
        <div class="home-features-item-img">
          <img :src="feature.img" alt="feature" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="home-features-item-text">
          {{ feature.text }}
        </div>
      </div>
    </div>
  </div>

  <!-- Steps -->
  <div class="home-steps home-block" id="steps">
    <div class="home-steps-title home-block-title">
      <div>
        Steps
      </div>
    </div>
    <div class="home-steps-items home-block-items">
      <template v-for="(step, index) in steps" :key="index">
        <div class="home-steps-item home-steps-card">
          {{ step.text }}
        </div>
        <!-- 不加最後一個箭頭 -->
        <div v-if="index < steps.length - 1" class="home-steps-item home-steps-arrow">
          <font-awesome-icon :icon="arrowDirection" />
        </div>
      </template>
    </div>
  </div>

  <!-- Stories -->
  <div class="home-stories home-block" id="stories">
    <div class="home-stories-title home-block-title">
      <div>
        Stories
      </div>
    </div>
    <div class="home-stories-items home-block-items">
      <div class="home-stories-items-button" @click="prevStories"
        :style="{ visibility: currentStoryIndex === 0 ? 'hidden' : 'visible', pointerEvents: currentStoryIndex === 0 ? 'none' : 'auto' }">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </div>
      <div v-for="(stories, index) in visibleStories" :key="index" class="home-stories-item">
        <div class="home-stories-item-img">
          <img :src="stories.img" alt="feature" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="home-stories-item-text">
          {{ stories.text }}
        </div>
      </div>
      <div class="home-stories-items-button" @click="nextStories"
        :style="{ visibility: currentStoryIndex + visibleCount >= stories.length ? 'hidden' : 'visible', pointerEvents: currentStoryIndex + visibleCount >= stories.length ? 'none' : 'auto' }">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// feature
const features = ref([
  { text: '飲食紀錄', img: 'https://picsum.photos/id/12/200/300' },
  { text: '健康狀況', img: 'https://picsum.photos/id/22/200/300' },
  { text: '用藥提醒', img: 'https://picsum.photos/id/32/200/300' },
  { text: '醫療日誌', img: 'https://picsum.photos/id/42/200/300' },
])


// steps
const steps = ref([
  { text: '建立帳號' },
  { text: '新增毛孩資訊' },
  { text: '開始紀錄日常' }
])

const visibleCount = ref(3)

const isMobile = ref(false)

const checkWindowSize = () => {
  isMobile.value = window.innerWidth < 1010

  if (window.innerWidth < 1010) {
    visibleCount.value = 1
  } else if (window.innerWidth < 1500) {
    visibleCount.value = 2
  } else {
    visibleCount.value = 3
  }
}

onMounted(() => {
  checkWindowSize()
  window.addEventListener('resize', checkWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowSize)
})

const arrowDirection = computed(() =>
  isMobile.value ? ['fas', 'arrow-down'] : ['fas', 'arrow-right']
)


// stories
const stories = ref([
  { text: '故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一故事一', img: 'https://picsum.photos/id/237/200/300' },
  { text: '故事二故事二故事二故事二故事二故事二故事二故事二', img: 'https://picsum.photos/id/1/200/300' },
  { text: '故事三故事三故事三故事三故事三故事三故事三故事三', img: 'https://picsum.photos/id/2/200/300' },
  { text: '故事四', img: 'https://picsum.photos/id/3/200/300' },
  { text: '故事5', img: 'https://picsum.photos/id/4/200/300' },
  { text: '故事6', img: 'https://picsum.photos/id/5/200/300' },
  { text: '故事7', img: 'https://picsum.photos/id/6/200/300' },
  { text: '故事8', img: 'https://picsum.photos/id/7/200/300' },
])

const currentStoryIndex = ref(0)


const visibleStories = computed(() => {
  return stories.value.slice(currentStoryIndex.value, currentStoryIndex.value + visibleCount.value)
})

const nextStories = () => {
  if (currentStoryIndex.value + visibleCount.value < stories.value.length) {
    currentStoryIndex.value += 1

  }
}

const prevStories = () => {
  if (currentStoryIndex.value > 0) {
    currentStoryIndex.value -= 1
  }
}

</script>

<style scoped>
.home-banner {
  display: flex;
  height: 700px;
  background-color: lightpink;
  margin-top: 50px;
}

.home-banner-text {
  margin: 0 10vw;
  display: flex;
  flex: 0.5;
  flex-direction: column;
  justify-content: center;
  font-family: "Chocolate Classical Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.home-block {
  display: flex;
  flex-wrap: wrap;
  padding: 50px 0;
}

.home-block-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
  width: 100%;
  height: 50px;
  font-size: 36px;
}

.home-block-items {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}


.home-features {
  min-height: 650px;
}


.home-features-item {
  display: flex;
  flex-direction: column;
  background-color: rgb(193, 165, 250);
  width: 250px;
  height: 330px;
}

.home-features-item-img {
  background-color: rgb(255, 182, 182);
  width: 250px;
  height: 250px;
}

.home-features-item-text {
  text-align: center;
  font-weight: bold;
}

.home-steps {
  min-height: 650px;
  background-color: #EEF5F4;
}

.home-steps-item {
  height: 420px;
}

.home-steps-arrow {
  width: 28px;
  height: 28px;
  font-size: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-steps-card {
  width: 300px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
}

.home-stories {
  height: clamp(650px, 100vw, 800px);
  background-color: #ffff;
}

.home-stories-items {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 30px;
}

.home-stories-item {
  width: clamp(240px, 60vw, 380px);

  display: flex;
  flex-direction: column;
  background: #F7F7F7;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,.12);
  overflow: hidden;
  padding: 2.5rem 1.5rem;
  transition: transform .4s;
  height: clamp(380px, 70vw, 520px);
}

.home-stories-item-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
}

.home-stories-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-stories-item-text {
  margin-top: 1.25rem;
  font-size: clamp(.875rem, 2.2vw, 1rem); /* 等比縮放字級 */
  line-height: 1.6;
  max-height: 10.5rem;
  overflow: hidden;
}
.home-stories-items-button {
  cursor: pointer;
  font-size: 35px;
  max-width: 22px;
}

.home-stories-items-button:hover {
  font-size: 35px;
  transform: scale(1.5, 1.5);
  transition: 0.5s;
}


@media (max-width: 1010px) {
  .home-banner-text {
    flex: 1;
  }

  .home-features-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-features-item {
    margin: 20px 0;
  }

  .home-steps-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-steps-item {
    margin: 20px 0;
  }

  .home-block {
    padding: 20px 0 50px 0;
  }

}

@media (max-width: 450px) {
  .home-stories-items {
    justify-content: space-around;
    padding: 0 10px;
    
  }
}
</style>