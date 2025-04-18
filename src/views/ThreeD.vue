<template>
  <div class="layout">
    <div class="banner">
      <div class="slider" style="--quantity: 10">
        <div class="item" style="--position: 1">
          <img src="../assets/images/dragon_1.jpg" alt="" />
        </div>
        <div class="item" style="--position: 2">
          <img src="../assets/images/dragon_2.jpg" alt="" />
        </div>
        <div class="item" style="--position: 3">
          <img src="../assets/images/dragon_3.jpg" alt="" />
        </div>
        <div class="item" style="--position: 4">
          <img src="../assets/images/dragon_4.jpg" alt="" />
        </div>
        <div class="item" style="--position: 5">
          <img src="../assets/images/dragon_5.jpg" alt="" />
        </div>
        <div class="item" style="--position: 6">
          <img src="../assets/images/dragon_6.jpg" alt="" />
        </div>
        <div class="item" style="--position: 7">
          <img src="../assets/images/dragon_7.jpg" alt="" />
        </div>
        <div class="item" style="--position: 8">
          <img src="../assets/images/dragon_8.jpg" alt="" />
        </div>
        <div class="item" style="--position: 9">
          <img src="../assets/images/dragon_9.jpg" alt="" />
        </div>
        <div class="item" style="--position: 10">
          <img src="../assets/images/dragon_10.jpg" alt="" />
        </div>
      </div>
      <div class="content">
        <h1 data-content="CSS ONLY">CSS ONLY</h1>
        <div class="model"></div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="css" scoped>
.layout {
  background-color: #08081a;
  background-image: repeating-linear-gradient(
      to right,
      transparent 0 100px,
      #2e2c2c 100px 101px
    ),
    repeating-linear-gradient(
      to bottom,
      transparent 0 100px,
      #2e2c2c 100px 101px
    );
}

.layout::before {
  width: min(1400px, 90vw);
  height: 100%;
  transform: translateX(-50%);
  content: "";
  background-image: url(../assets/images/bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  pointer-events: none;
}

.banner {
  width: 100%;
  height: calc(100vh - 71px);
  text-align: center;
  overflow: hidden;
  position: relative;
}
.banner .slider {
  position: absolute;
  width: 200px;
  height: 250px;
  top: 10%;
  left: calc(50% - 100px);
  transform-style: preserve-3d;
  transform: perspective(1000px);
  animation: autoRun 20s linear infinite;
  z-index: 2;
}
@keyframes autoRun {
  from {
    transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
  }
  to {
    transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
  }
}

.banner .slider .item {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.5, 0.5, 0.5, 0.5);
  inset: 0 0 0 0;
  transform: rotateY(
      calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
    )
    translateZ(550px);
}
.banner .slider .item:hover {
  transform: rotateY(
      calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
    )
    translateZ(550px) scale(1.2);
  cursor: pointer;
}
.banner .slider .item:hover ~ .item:not(:hover) {
  filter: brightness(0.2);
}
.banner .slider .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner .content {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1400px, 100vw);
  height: max-content;
  /* padding-bottom: 100px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: #ff9e11;
}
.banner .content h1 {
  font-family: "ICA Rubrik";
  font-size: 16em;
  line-height: 1em;
  color: #25283b;
  position: relative;
}
.banner .content h1::after {
  position: absolute;
  inset: 0 0 0 0;
  content: attr(data-content);
  z-index: 2;
  -webkit-text-stroke: 2px #ff9e11;
  color: transparent;
}
.banner .content .author {
  font-family: Poppins;
  text-align: right;
  max-width: 200px;
}
.banner .content h2 {
  font-size: 3em;
}
.banner .content .model {
  background-image: url(../assets/images/model4.png);
  width: 100%;
  height: 65vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background-size: auto 130%;
  background-repeat: no-repeat;
  background-position: top center;
  z-index: 1;
}
</style>
