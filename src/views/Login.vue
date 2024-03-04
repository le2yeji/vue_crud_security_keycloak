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
        this.axios_post("/api/v1/initRsa")
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

<!-- <script>
export default {
  data(){
    return {
      username: '',
      password: ''
    }
  }
}
</script> -->
<script>
import { JSEncrypt } from 'jsencrypt';
import { fetchWrapper } from '@/helpers';
const baseUrl = `/api/v1`;

export function encrypt(data, key) {
  const sign = new JSEncrypt();
  sign.setKey(key);
  return sign.encrypt(data).toString();
  };

</script>
<script setup>

import router from '@/router';
import { ref } from 'vue'; // ref 추가

const form = ref({
  username: '',
  password: '',
  encryptIdPassword: ''
});
const encryptLoginData = async () => {
  router.push(this.returnUrl || '/employees');
  
  const id = form.value.username; // ref 변수에 접근
  const pw = form.value.password; // ref 변수에 접근
  const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfpfKHWAtFZu+L+tMEW7a4rYi5oeLnRv3rottxExUCR7jNfAbpC7vOVW51h9KTX3SQS0Q6nt99X/yQa6VAxR2E/BSmY4BHbR2HfAdZ80I1ZGIMWGHqwQw/ZpCv2N7BHQ8/StVrGdPI9ZHVrBuaKEs86nApEfhWMYTvvee6gVyNQIDAQAB";
  // const publicKey = process.env.VUE_APP_PUBLIC_KEY;
  // const publicKey = process.env.VUE_APP_PUBLIC_KEY.replace(/\|/g, '\n');
  console.log('1 id', id);
  console.log('1 pw', pw);
  console.log('1 publicKey', publicKey);

  const data = `${id}|${pw}`;
  console.log('1 data', data);
  const encryptedData = encrypt(data, publicKey); // RSA 암호화 함수 사용
  console.log('1 encryptedData', encryptedData);
  
  // form.value.encryptIdPassword = encrypt.toString('base64'); // ref 변수에 접근
  form.value.encryptIdPassword = encryptedData;
  form.value.username = ''; // ref 변수에 접근
  form.value.password = ''; // ref 변수에 접근

  const user = await fetchWrapper.post(`${baseUrl}/init-rsa`, form.value.encryptIdPassword);
  console.log('user', user);

  // store user details and jwt in local storage to keep user logged in between page refreshes
  localStorage.setItem('user', JSON.stringify(user));

  // redirect to previous url or default to home page
  router.push(this.returnUrl || '/employees');
};

const onSubmit = async () => {
  router.push('/employees');
};

</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">로그인</div>
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
          <q-input
              filled
              type="text"
              v-model="form.username"
              label="ID *"
              hint="for test: edu"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type username(ID)']"
          />
          <q-input
              filled
              type="password"
              v-model="form.password"
              label="Password *"
              hint="for test: caravan"
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
              :disable="!form.username || !form.password"
              @click.stop.prevent="encryptLoginData"
          />
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="Keycloak Login"
            @click.stop.prevent="onSubmit"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
<!-- <template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form @submit.stop="encryptLoginData" class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">로그인</div>
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
          <q-input
              filled
              type="text"
              v-model="form.username"
              label="ID *"
              hint="for test: edu"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type username(ID)']"
          />
          <q-input
              filled
              type="password"
              v-model="form.password"
              label="Password *"
              hint="for test: caravan"
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
              :disable="!form.username || !form.password"
          />
        </q-card-section>
      </q-form>
      <q-form @submit.stop="onSubmit" class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">keycloak</div>
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
</template> -->



