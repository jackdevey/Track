/**
 * Full rolling stock type
 * as returned by the API
 */

type RStockFull = RStock & {
    opSet: OperatorSet & {
        operator: Operator;
        illustrations: Illustration[];
        class: Class & {
            manufacturer: Manufacturer;
        };
    };
}