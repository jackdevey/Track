/**
 * Full operator set
 * as returned by the API
 */

type OperatorSetFull = OperatorSet & {
    rstock: RStock[];
    operator: Operator;
    class: Class & {
        manufacturer: Manufacturer;
    };
}