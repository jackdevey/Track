/**
 * Full operator type
 * as returned by the API
 */

 type OperatorFull = Operator & {
    operatorSets: (OperatorSet & {
        class: Class & {
            manufacturer: Manufacturer;
        };
        _count: {
            rstock: number;
        };
    })[];
}