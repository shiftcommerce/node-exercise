const fs = require('fs')
const handler = require('./handler')

const event = {
  body: fs.readFileSync('./fixtures/shipments.json', 'utf8')
}

const context = {
  accountReference: 'acme'
}

describe('Handler', () => {
  it('Parses the event data into JSON', () => {
    const data = handler(event, context)

    const { ORDERS: orders } = data
    expect(orders.length).toEqual(3)

    const [order] = orders
    expect(order.O_ID).toEqual('12345')
  })
})