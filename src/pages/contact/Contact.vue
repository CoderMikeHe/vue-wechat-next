<template>
  <div class="wc-layout contact">
    <div class="wc-layout__hd">
      <van-nav-bar title="通讯录" @click-right="onAddFriends">
        <template #right>
          <wc-svg-icon name="contact-icons_outlined_add-friends" size="22"></wc-svg-icon>
        </template>
      </van-nav-bar>
    </div>
    <div class="wc-layout__bd">
      <!--  highlight-background-color="#07C160" :ignore-tags="['A']" -->
      <van-index-bar-x :index-list="indexList" :ignore-tags="['@']" display-mode="center" highlight-background-color="#07C160" highlight-color="#fff">
        <!-- tag 插槽 -->
        <template #tag="props">
          <van-icon class="index-tag search" name="search" size="14" color="#555" v-if="props.ignore" />
          <span class="index-tag" :class="{active:props.active}" v-else>{{ props.index }}</span>
        </template>

        <!-- hint 插槽 -->
        <template #hint="props">
          <Teleport to="body" :disabled="true">
            <div class="index-hint pop">
              <span>{{ props.index }}</span>
            </div>
          </Teleport>
        </template>

        <!-- 处理头部相关的 -->
        <van-index-anchor-x index="@" highlight-color="#07C160"><span></span></van-index-anchor-x>
        <van-cell title="新的朋友" :icon="addfriend" center />
        <van-cell title="群聊" :icon="addGroup" center />
        <van-cell title="标签" :icon="contactTag" center />
        <van-cell title="公众号" :icon="offical" center />
        <van-cell title="企业微信联系人" :icon="weWork" center />
      

        <!-- default 插槽 -->
        <template v-for="(data, index) in dataSource" :key="index">
          <van-index-anchor-x :index="data.tag" highlight-color="#07C160" />
          <template v-for="(item) in data.items" :key="item.idstr">
            <van-swipe-cell stop-propagation :disabled="index === 0">
              <van-cell :title="item.screen_name" :icon="item.profile_image_url" center />
              <template #right>
                <van-button color="#4c4c4c" block type="danger" text="备注" @click="onRemark($event, item)" />
              </template>
            </van-swipe-cell>
          </template>
        </template>

        <!-- 处理尾部相关的 -->
        <div class="footer">{{ total }}</div>
      </van-index-bar-x>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import pinyin from 'pinyin';
import { set, cloneDeep } from 'lodash-es';
import ContactsJson from 'mocks/contacts.json';

import { Gender } from '../../enums/userEnum';
import { ContactCardType } from "vant/lib/contact-card/ContactCard";

// 导出所需图片
import addfriend from 'assets/contact/plugins_FriendNotify_36x36.png';
import addGroup from 'assets/contact/add_friend_icon_addgroup_36x36.png';
import contactTag from 'assets/contact/Contact_icon_ContactTag_36x36.png';
import offical from 'assets/contact/add_friend_icon_offical_36x36.png';
import weWork from 'assets/contact/add_friend_icon_search_wework_40x40.png';
import { constants } from "crypto";
interface IUser {
  id: string | number;
  name: string;
}

interface IPictureMeta {
  url: string;
}

interface IPicture {
  name: string;
  small: IPictureMeta,
  big: IPictureMeta;
}
// https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/8bc1fexb(v=vs.71)?redirectedfrom=MSDN
interface IContact {
  idstr: string | number;
  screen_name: string;
  profile_image_url: string;
  wechatId: string;
  gender: Gender,
  pictures: IPicture[];
  featureSign?: string | undefined;
  remarks?: string | undefined;
}

interface IContactX extends IContact {
  tag? : string | undefined;
}

interface IIndeBarData {
  tag: string;
  items: IContactX[];
}

export default defineComponent({
  name: "Contact",
  components: {},
  setup() {

    const router = useRouter()

    // headers
    const headers = reactive<string[]>([])

    // 索引列表
    const indexList = reactive<string[]>([])

    // 数据源
    const dataSource = reactive<IIndeBarData[]>([])

    // 总数
    const total = ref('')

    // 获取用户列表
    const fetchContacts = () => {
      const users: IContact[] = cloneDeep<IContact[]>(ContactsJson)
      return users.map<IContactX>((item: IContact) => {
        // 1. 获取首字母
        let firstLetter = pinyin(item.screen_name, {
          style: pinyin.STYLE_FIRST_LETTER
        })[0][0]

        // 2. 正则校验
        const regExp = /[a-zA-Z]/gi
        if (!regExp.test(firstLetter)) {
          firstLetter = `#`
        }
        // 3. 生成IContactX
        return {
          tag: firstLetter.toUpperCase(),
          ...item
        }
      })
    }

    // 处理用户数据
    const handleContacts = (contacts: IContactX[]) => {
      // 1. 先按照拼音排序
      const sortContacts = contacts.sort((a: IContactX, b: IContactX) => {
        if (a.tag === '#' && b.tag === '#') {
          return 0
        }else if (a.tag === '#' && b.tag !== '#') {
          return 1
        }else if (a.tag !== '#' && b.tag === '#') {
          return -1
        }
        return pinyin.compare(a.screen_name, b.screen_name)
      })

      // 2. 取出所有的tag 利用Set去重
      const set = new Set<string>()
      for (const contact of sortContacts) {
        set.add(contact.tag!)
      }

      // 3. 获取索引
      indexList.push(...set)

      // 4. 联系人分组
      for (const letter of indexList) {
        const items: IContactX[] = []
        for (const contact of sortContacts) {
          if (letter === contact.tag) {
            items.push(contact)
          }
        }
        // 生成一个对象
        dataSource.push({
          tag: letter,
          items: items
        })
      }
    }


    // 备注
    const onRemark = (event: MouseEvent, item: IContactX) => {
      console.log('xxxxxxxx 👉', event, item);
    } 

    // 添加朋友
    const onAddFriends = (event: MouseEvent) => {
      router.push({
        name: `AddFriends`
      })
    }

    
    onMounted(() => {

      // 1. 获取数据
      const contacts = fetchContacts()

      total.value = `${contacts.length}个朋友及联系人`

      // 2. 处理数据
      handleContacts(contacts)

      // 3. 先给indexList 添加一个 tag ， @ 标识头部
      indexList.splice(0, 0,'@')
    })


    

    return {
      total,
      indexList,
      dataSource,
      addfriend,
      addGroup,
      contactTag,
      offical,
      weWork,

      onRemark,
      onAddFriends
    };
  }
});
</script>

<style lang='less' scoped>
.wc-layout {
  &.contact {
    .wc-layout__hd {
      // Fxied Bug: 设置导航条的z-index > index-bar's z-index;
      z-index: 2;
      .add-friends {
        color: #181818;
      }

    }

    .wc-layout__bd {
      .index-tag {
        width: 16px;
        height: 16px;
        display: inline-block;
        color: #555;
        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 2px;

        &.search {
          font-weight: bold;
        }

        &.active {
          background-color: #07c160;
          color: #fff;
          border-radius: 50%;
        }
      }

      .footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #323232;
        font-size: 14px;
      }
    }
  }
  // fixed bug: :deep() 代替 /deep/
  :deep(.van-index-bar-x) {
    .search {
      height: 0;
      .van-index-anchor-x {
        display: none;
      }
    }
    .van-cell {
      .van-cell__left-icon {
        height: auto;
        margin-right: 12px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 40px;
          height: 40px;
          display: block;
        }
      }
      padding: 8px 16px;
    }

    .van-swipe-cell {
      .van-swipe-cell__wrapper {
        .van-swipe-cell__right {
          .van-button--block {
            height: 100%;
          }
        }
      }
    }
  }
}

.index-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  &.pop {
    position: absolute;
    right: 150%;
    top: 50%;
    margin-top: -25px;
    background-image: url(assets/contact/ContactIndexShape_60x50.png);
    background-repeat: no-repeat;
    background-size: 60px 50px;
    width: 60px;
    height: 50px;
    color: whitesmoke;
    & > span {
      margin-right: 5px;
    }
  }
  &.center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background-color: black;
    color: whitesmoke;
  }
  & > span {
    font-size: 30px;
  }
}
</style>