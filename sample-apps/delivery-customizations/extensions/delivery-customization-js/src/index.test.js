import { describe, it, expect } from 'vitest';
import deliveryCustomization from './index';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('delivery customization function', () => {
    it('returns no operations without configuration', () => {
        const result = deliveryCustomization({
            "cart": {
                "deliveryGroups": []
            },
            "deliveryCustomization": {
                "metafield": null
            }
        });
        const expected = /** @type {FunctionResult} */ ({ operations: [] });

        expect(result).toEqual(expected);
    });

    it('renames delivery options if state/province matches', () => {
        const result = deliveryCustomization({
            "cart": {
                "deliveryGroups": [{
                    "deliveryAddress": {
                        "provinceCode": "ON"
                    },
                    "deliveryOptions": [{
                        "handle": "test_delivery_option",
                        "title": "Test Delivery Option"
                    }, {
                        "handle": "test_delivery_option_2",
                        "title": "Test Delivery Option 2"
                    }]
                }]
            },
            "deliveryCustomization": {
                "metafield": {
                    "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                }
            }
        });
        const expected = /** @type {FunctionResult} */ ({
            operations: [
                {
                    rename: {
                        deliveryOptionHandle: "test_delivery_option",
                        title: "Test Delivery Option - Test Message"
                    }
                },
                {
                    rename: {
                        deliveryOptionHandle: "test_delivery_option_2",
                        title: "Test Delivery Option 2 - Test Message"
                    }
                }
            ]
        });

        expect(result).toEqual(expected);
    });

    it('returns no operations if state/province code does not match', () => {
        const result = deliveryCustomization({
            "cart": {
                "deliveryGroups": [{
                    "deliveryAddress": {
                        "provinceCode": "NC"
                    },
                    "deliveryOptions": [{
                        "handle": "test_delivery_option",
                        "title": "Test Delivery Option"
                    }]
                }]
            },
            "deliveryCustomization": {
                "metafield": {
                    "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                }
            }
        });
        const expected = /** @type {FunctionResult} */ ({ operations: [] });

        expect(result).toEqual(expected);
    });
});
