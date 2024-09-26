class RandomTool {
  static randomCode() {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
  }

  // 随机生成头像
  static randomAvatar() {
    let imgList = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/3.jpg",
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/3.jpg",
    ];
    let num = Math.floor(Math.random() * 10);
    return imgList[num];
  }

  // 随机生成昵称
  static randomName() {
    const adjectives = ["聪明", "勤奋", "智慧", "卓越", "明亮", "睿智", "学霸", "超能", "进步", "创新"];
    const nouns = ["学者", "达人", "探索者", "领航员", "达人", "研究者", "精英", "讲师", "先锋", "学员"];

    const generateNickname = () => {
      return `${getRandomElement(adjectives)}${getRandomElement(nouns)}`;
    };
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    const nickname = generateNickname();
    return nickname;
  }
}

module.exports = RandomTool;
