<template>
  <header class="bg-base text-white py-3">
    <div class="container d-flex justify-content-between">
      <!-- menu  -->
      <div class="d-flex d-md-none align-items-center">
        <span style="cursor: pointer">
          <client-only>
            <mdicon name="menu" />
          </client-only>
        </span>
      </div>

      <!-- logo  -->
      <div class="d-flex align-items-center">
        <img
          src="/images/logo1.png"
          alt="tayoublaise arrow"
          style="width: 100px; height: 50px"
        />
      </div>

      <!-- user infos  -->
      <div class="d-flex align-items-center">
        <div class="row">
          <span class="col d-none d-md-flex align-items-center">name</span>
          <img
            class="col"
            src="/images/avatar.png"
            style="width: 70px; border-radius: 50%"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
</style>