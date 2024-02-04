---
title: 关于我们
---
# 跨越偏见、拥抱多元
aboutTrans项目组成立于2023年7月9日，我们致力于为大家提供有关跨性别的相关知识，以帮助更多人了解和支持跨性别群体！
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/103566952?v=4)',
    name: '千坂神奈子',
    title: '网站运营',
    links: [
      { icon: 'twitter', link: 'https://twitter.com/ChisakaKanako' },
      { icon: 'github', link: 'https://github.com/ChisakaKanako' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/134506247?v=4)',
    name: '路路',
    title: '技术支持',
    links: [
      { icon: 'twitter', link: 'https://twitter.com/LuluInBloom' },
      { icon: 'github', link: 'https://github.com/lulu0119' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/9146919?v=4)',
    name: '半生',
    title: '技术支持',
    links: [
      { icon: 'twitter', link: 'https://twitter.com/LaWbda' },
      { icon: 'github', link: 'https://github.com/Sewens' }
    ]
  },
]
</script>
<VPTeamMembers size="small" :members="members" />