/**
 * Full sighting type
 * as returned by the API
 */

type SightingFull = Sighting & {
    rstock: RStock & {
        opSet: OperatorSet & {
            operator: Operator;
            class: Class;
        };
    };
}