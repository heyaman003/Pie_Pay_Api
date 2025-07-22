# Understanding Flipkart Offer API

## How to Inspect Flipkart's Offer API

1. **Go to Flipkart (laptop/desktop web app)** and add an item to your cart.
2. **Proceed to the payment page.**
3. **Open Developer Tools** (Right-click > Inspect or press F12).
4. Go to the **Network** tab and look for XHR/Fetch requests as the payment page loads.
5. Look for API calls with keywords like `offers`, `payment`, or `discount` in the URL or response.
6. The response will typically be a JSON object containing an array of offers.

## Example Flipkart Offer API Response Structure
```json
{
  "offers": [
    {
      "title": "10% Instant Discount on Axis Bank Credit Cards",
      "description": "Get 10% off up to ₹500 on Axis Bank Credit Cards.",
      "bankName": "AXIS",
      "discountType": "PERCENTAGE",
      "discountValue": 10,
      "paymentInstruments": ["CREDIT"],
      "validity": "2024-07-01 to 2024-07-31"
    },
    {
      "title": "Flat ₹1000 off on IDFC FIRST Bank EMI",
      "description": "Flat ₹1000 off on IDFC FIRST Bank Credit Card EMI transactions.",
      "bankName": "IDFC",
      "discountType": "FLAT",
      "discountValue": 1000,
      "paymentInstruments": ["EMI"],
      "validity": "2024-07-01 to 2024-07-31"
    }
  ]
}
```

## Mapping to the Offer Model
- **title**: Offer title (string)
- **description**: Offer details (string)
- **bankName**: Bank name (string, e.g., "AXIS", "IDFC")
- **discountType**: "FLAT" or "PERCENTAGE"
- **discountValue**: Numeric value (e.g., 10 for 10% or 1000 for ₹1000)
- **paymentInstruments**: Array of supported instruments (e.g., ["CREDIT"], ["EMI"])
- **validity**: Validity period (string)

## Tips
- The actual field names may vary; always inspect the real API response.
- Some offers may have additional fields (e.g., min transaction amount, max discount cap).
- Adjust the backend extraction logic as needed to match the real Flipkart API structure. 