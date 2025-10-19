class APIUtils
{
    constructor (apiContext, LoginPayload)
    {
        this.apiContext = apiContext;
    }

async getToken()

{
    const loginResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
          data: this.LoginPayload,
        }
      );
      const loginResponseJson = await loginResponse.json();
      const token = loginResponseJson.token;
      console.log(token);
      return token;
}

async createOrder(orderPayload)
{
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: this.getToken(),
            "Content-Type": "application/json",
          },
        }
      );
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      const orderId = orderResponseJson.orders[0];
      response.orderId = orderId;
      console.log(orderId);
      return response;
}


}

module.exports = {APIUtils};