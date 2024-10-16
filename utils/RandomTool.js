class RandomTool {
  static randomCode() {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
  }

  // 随机生成头像
  static randomAvatar() {
    let imgList = [
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710616700318.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710617700-795.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710617900318.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710618100233.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710618200845.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172714598600169.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710616700318.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710617700-795.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710617900318.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710618100233.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172710618200845.JPG",
      "https://elite-sudy.oss-cn-heyuan.aliyuncs.com/teacher_file/172714598600169.JPG",
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
