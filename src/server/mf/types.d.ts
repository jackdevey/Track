/**
 * Full manufacturer type
 * as returned by the API
 */

type ManufacturerFull = Manufacturer & {
    classes: Class[];
}