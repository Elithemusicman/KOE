
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/printful-test") {
      const response = await fetch(
        "https://api.printful.com/stores",
        {
          headers: {
            Authorization: `Bearer ${env.PRINTFUL_TOKEN}`
          }
        }
      );

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
