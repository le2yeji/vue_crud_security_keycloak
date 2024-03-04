<!-- <script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from '@/stores/useAuth';

const authStore = useAuthStore();

const $q = useQuasar();

const username = ref(null);
const password = ref(null);

const onSubmit = async () => {
  try {
    await authStore.login(username.value, password.value);
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: error
    });
  }
};
</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form @submit="onSubmit" class="q-gutter-md">
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
      </q-form>
    </q-card>
  </div>
</template> -->
<!-- <script>
import JsEncrypt from "jsencrypt";
 
export default {
    name: "Login",
    data: () => ({
        publicKeyRSA: "",
        id: undefined,
        password: undefined,
    }),
    // created: 로그인 화면 진입 시 바로 실행
    created() {
        // RSA Key 생성
        this.axios_post("/initRsa")
            .then(res => {
                this.publicKeyRSA = res.data.data;
            })
            .catch(err => {
                console.log("Api rejected : " + err);
            });
    },
    methods: {
        // ID, 비밀번호 입력 후 로그인 버튼 클릭
        sendOTP() {
            // public key 생성
            const jse = new JsEncrypt();
            jse.setPublicKey(this.publicKeyRSA);
 
            // password RSA 암호화
            const encryptPW = jse.encrypt(this.password);
            this.signin(this.id, encryptPW);
        },
        signin(id, encryptPW) {
            this.axios_post("/signin", {
                username: id,
                password: encryptPW
            })
            .then(response => {
                this.$store.commit("LOG_IN", response.data);
            })
            .catch(err => {
                console.log("Api rejected : " + err);
            });
        }
    }
}
</script> -->

<script>
export default {
  data(){
    return {
      username: '',
      password: ''
    }
  }
}
</script>

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
