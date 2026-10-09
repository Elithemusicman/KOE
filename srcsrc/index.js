export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Test connection to Printful
    if (url.pathname === "/api/printful-test") {
      const response = await fetch("https://api.printful.com/stores", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${env.PRINTFUL_TOKEN}`
        }
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Everything else goes to your K/O/E website
    return env.ASSETS.fetch(request);
  }
};
