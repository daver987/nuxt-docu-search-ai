<template>
  <div>
    <Sidebar />
    <div class="min-h-screen bg-gray-800 xl:pl-72">
      <Topbar />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.side-fade-enter-active,
.side-fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.side-fade-enter-from,
.side-fade-leave-to {
  transform: translateX(-10%);
  opacity: 0;
}
</style>
