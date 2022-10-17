/**
 * Sighting type when in a list
 * as returned by the API
 */

type SightingForList = Sighting & {
    rStockSightings: RStockSightingWithRstock[];
}

/**
 * As returned by api
 */

type RStockSightingWithRstock = RstockSighting & {
    rstock: RStock;
}