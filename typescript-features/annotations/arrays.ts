/**
 * - TS can do type inference when extracting values from an array
 * - TS can prevent us from adding incompatible values to the array
 * - We can get help with 'map', 'foreach', 'reduce' functions
 * - Flexible - arrays can still contain multiple different types
 */

const carMakers = ['ford', 'toyota', 'chevy']
const dates = [new Date(), new Date()]

const carsByMake: string[][] = []

// Help with inference when extracting values
const car = carMakers[0]