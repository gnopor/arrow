<template>
  <div>
    <div class="logo-container">
      <span class="logo"> arrow </span>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  background: #000;
  margin: 2em;
  padding: 2em;
}

.logo {
  position: relative;
  font-size: 4em;
  text-transform: capitalize;
}

.logo::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 130%;
  height: 20px;
  border: 2px solid;
  border-radius: 50%;
  border-width: 0 0 5px 5px;
  transform: translate(2px, -5px);
}
</style>
