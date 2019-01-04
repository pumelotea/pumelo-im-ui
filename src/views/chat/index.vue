<template>
  <section class="vbox">
    <ChatView v-for="item,id in messageMap" v-show="id===$msg.getActive()" :uid="id"></ChatView>
    <!--<user-info></user-info>-->
    <!--<group-info></group-info>-->
    <!--<delete></delete>-->
    <!--<remark></remark>-->
    <!--<AskFriend></AskFriend>-->
    <!--<AskGroup></AskGroup>-->
    <!--<ask-friend-preview></ask-friend-preview>-->
    <!--<ask-group-preview></ask-group-preview>-->
  </section>
</template>

<script>
  import {parseTime} from "../../utils";
  import UserInfo from '@/components/PopWindow/UserInfo'
  import GroupInfo from '@/components/PopWindow/GroupInfo'
  import Delete from '@/components/PopWindow/Delete'
  import Remark from '@/components/PopWindow/Remark'
  import AskFriend from '@/components/PopWindow/AskFriend'
  import AskFriendPreview from '@/components/PopWindow/AskFriendPreview'
  import AskGroup from '@/components/PopWindow/AskGroup'
  import AskGroupPreview from '@/components/PopWindow/AskGroupPreview'
  import ChatView from '@/components/PopWindow/ChatView'

  export default {
    components: {
      UserInfo, GroupInfo, Delete, Remark, AskFriend, AskGroup, AskFriendPreview, AskGroupPreview,ChatView
    },
    computed: {
      messageMap() {
        return this.$msg.store.state.messageMap
      }
    },
    mounted() {

    }
  }
</script>
