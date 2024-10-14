const getPlayUrlService = require("../service/getPlayUrlService");

const getPlayUrlController = {
  get_play_url: async (req, res) => {
    let handleRes = await getPlayUrlService.get_play_url(req);
    res.send(handleRes);
  },
};
module.exports = getPlayUrlController;
