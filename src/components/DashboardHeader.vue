<template>
    <header>
        <div class="header-user">
            <div class="header-user-img">
                <img src="https://avatars.githubusercontent.com/u/103732932" alt="">
            </div>
            <div class="header-user-text">
            username
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.10);
    width: calc(100vw - clamp(100px, 12%, 150px));
    height: 80px;
    position: fixed;
    left: clamp(100px, 12%, 150px);
    top: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 99;

}

.header-user {
    display: flex;
    right: 0;
    align-items: center;
    gap: 1rem;
    margin: 0 20px;
    min-width: 160px;
}

.header-user-img {
    width: 55px;
    height: 55px;
    border-radius: 10px;
    overflow: hidden;
}

.header-user-img img {
    width: 55px;
    height: 55px;
}

.header-user-text {
    font-size: 18px;
}

@media (max-width: 1010px) {
  header {
    display: none;
  }
}
</style>