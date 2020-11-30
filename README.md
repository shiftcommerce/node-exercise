# Shipments Exercise

### Instructions

1. Complete the tasks below ahead of an in-person pairing session, where we'll ask you to build on top of your solution and implement some additional functionality.
1. Spend no more than 2 hours on the exercise.
1. Write your solution as if this code was going into production - we want to see how you'd deliver something in a real world situation. How can you be confident this code will work as expected? What will happen in the case of unexpected input?
1. Read the _Background_ section below carefully for any performance implications. Consider how to optimise your solution for best performance.
1. Make use of official documentation and online resources. Feel free to use any resources you want (for example, Stack Overflow), but please make a note of them in your solution.
1. Bring your solution with you on your own machine to the interview and make sure it's ready to work on (let us know if you need us to provide a laptop).

### Background

Our client, Acme Inc wants to stop using an external vendor for order management and bring the process onto Shift’s own Order Management System (OMS).

As part of that work, Acme will need to provide Shift with updates about orders that have been shipped or cancelled by Acme’s distribution warehouse, so that Shift can record fulfillments, settle payments, cancel orders, and send customer emails.

Acme will provide the order updates in batches (twice daily), in the form of a JSON file uploaded to an SFTP server. These files vary in size, but often contain tens-of-thousands of orders and are several megabytes in size.

Below is a example of what one of the shipments may look like:

```json
{
  "ORDERS": [
    {
      "O_ID": "12345",
      "TRACKING_URL": "https://track.acme.com/track?code=12345",
      "S_ID": "12345",
      "OMS_ORDER_ID": "12345",
      "ORDER_LINES": [
        { "OL_ID": "99999999", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2377460_C000_000", "QUANTITY": "1", "O_QTY": "1" },
        { "OL_ID": "215217875", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2798364_C000_000", "QUANTITY": "1", "O_QTY": "1" },
        { "OL_ID": "215217877", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2673230_C000_000", "QUANTITY": "1", "O_QTY": "1" },
        { "OL_ID": "215217879", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2759275_C000_000", "QUANTITY": "1", "O_QTY": "1" },
        { "OL_ID": "215217881", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2772154_C000_000", "QUANTITY": "1", "O_QTY": "1" }
      ]
    },
    {
      "O_ID": "50022251",
      "TRACKING_URL": "https://track.acme.com/track?code=DMC08569P0LU",
      "S_ID": "94146561",
      "OMS_ORDER_ID": "135103229",
      "ORDER_LINES": [
        { "OL_ID": "99999999", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2377460_C000_000", "QUANTITY": "1", "O_QTY": "1" },
        { "OL_ID": "201780395", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2655371_C511_XL", "QUANTITY": "0", "O_QTY": "2" },
        { "OL_ID": "201780396", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2670159_C333_010", "QUANTITY": "1", "O_QTY": "2" }
      ]
    },
    {
      "O_ID": "500324412",
      "TRACKING_URL": "https://track.acme.com/track?code=DMC08569P0LU",
      "S_ID": "582334322",
      "OMS_ORDER_ID": "500324412",
      "ORDER_LINES": [
        { "OL_ID": "201793372", "STATUS": "SHPD", "DESCRIPTION": "Item shipped to customer", "SKU": "S2377460_C000_000", "QUANTITY": "0", "O_QTY": "1" }
      ]
    }
  ]
}
```

The contents of each order object indicates the action Shift needs to take.

### Setup

Requirements:

* Node 12+
* Yarn 1.x

Install dependencies:

```
yarn install
```

Run the tests (with optional watch mode):

```
yarn test
yarn test --watch
```

### Tasks

1. Fix the failing test
   
   We've provided the structure of a handler file and test to get you started. However, the test is failing due to some missing functionality.

   Update the `handler` function so that the test passes.
   
2. Ignore orders not relevant to the Shift OMS

   Some orders within the shipments JSON should not be processed by the Shift OMS, and need to be ignored. If the order attributes `O_ID` and `OMS_ORDER_ID` do not match, we should ignore the order.

   Update the `handler` function to return the correct list of orders.

3. Split orders into fulfillments and cancellations

   Of the remaining orders, we need to either create a fulfillment, or cancel the order in the Shift OMS. If all order line items in an order have a `QUANTITY` of 0 (zero) cancel the order in Shift's OMS, otherwise fulfil the order.

   Update the `handler` function to return two lists of orders, one to fulfil and another to cancel.
