const axios = require("axios");

module.exports = {
  // GET /hello
  async findPlace(ctx) {
    const apiKey = strapi.config.get("server.apiKey", "0");
    const { type, lat, lng, radius } = ctx.params;
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${apiKey}&opennow&location=${lat},${lng}&radius=${radius}&language=tr&type=${type}`;
    const { data } = await axios.get(searchUrl);
    ctx.send(data);
  },

  async getNextPage(ctx) {
    const apiKey = strapi.config.get("server.apiKey", "0");
    const { token } = ctx.params;
    const pageUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${apiKey}&pagetoken=${token}`;
    const { data } = await axios.get(pageUrl);
    ctx.send(data);
  },
};
