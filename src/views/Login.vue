<script setup>

import router from '@/router';


const onSubmit = async () => {
  router.push('/employees');
};

</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form @submit.stop="onSubmit" class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">로그인</div>
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
            <q-input
              filled
              type="text"
              v-model="username"
              label="ID *"
              hint="for test: test"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type username(ID)']"
            />
            <q-input
              filled
              type="password"
              v-model="password"
              label="Password *"
              hint="for test: test"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
            />
            <q-btn
              type="submit"
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="Login"
              :disable="!username || !password"
            />
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="Keycloak Login"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
