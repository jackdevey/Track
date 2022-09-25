/**
 * Full class type with
 * operators as returned 
 * by the API
 */

type ClassWithOperatorsAndManufacturer = Class & {
    operatorSets: (OperatorSet & {
        operator: Operator;
    })[];
    manufacturer: Manufacturer;
}