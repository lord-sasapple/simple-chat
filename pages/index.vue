<template lang="pug">
div
  article.media(v-for='(msg, index) in msgs', :key='index')
    .media-content
      .content
        p.name {{ msg.displayName }}
        p {{ msg.text }}
  .input-container
    input.input(type='text', v-model='displayName', placeholder='なまえ')
    input.input(
      type='text',
      v-model='msg',
      @keypress.enter.exact='sendMessage',
      placeholder='メッセージ'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import io from 'socket.io-client'

export default Vue.extend({
  data() {
    return {
      socket: '' as any,
      msg: '',
      displayName: '',
      msgs: [] as any[],
    }
  },
  mounted(): void {
    this.socket = io('http://localhost:3001')
    this.socket.emit('join', 'hoge')
    this.socket.on('new-msg', (msg: string) => {
      this.msgs.push(msg)
    })
  },
  methods: {
    sendMessage() {
      this.msg = this.msg.trim()
      if (this.msg) {
        const message = {
          displayName: this.displayName,
          name: this.socket.id,
          text: this.msg,
        }
        this.msgs.push(message)
        this.socket.emit('send-msg', message, 'hoge')
        this.msg = ''
      }
    },
  },
})
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.media {
  p {
    &.name {
      font-weight: 800;
      margin-right: 5px;
    }
  }
}

.input-container {
  position: fixed;
  bottom: 10px;
  left: 10px;
  input {
    font-size: 40px;
  }
}
</style>