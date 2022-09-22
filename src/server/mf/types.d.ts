/**
 * Full manufacturer type
 * as returned by the API
 */

type ManufacturerFull = Manufacturer & {
    classes: Class[];
}

/**
 * Full class type with
 * operators as returned 
 * by the API
 */

type ClassWithOperators = Class & {
    operatorSets: (OperatorSet & {
        operator: Operator;
    })[];
}