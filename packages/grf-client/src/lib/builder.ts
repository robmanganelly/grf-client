// builder function will generate objects that conform to the GRF API

import {
  TEqualityOperator,
  TNumericOperator,
  TRangeOperator,
  TSetOperator,
  TTextOperator,
} from './operator.js';

/**
 * Builds a text filter object for the GRF API.
 * @param field
 * @param operator
 * @param initialValue
 * @param group optional group, will be used for grouping filters with AND/OR logic
 */
export function buildTextFilter(
  field: string,
  operator: TTextOperator | TEqualityOperator,
  initialValue: string,
  group?: string
) {
  return {
    kind: 'text',
    field,
    operator,
    value: initialValue,
    group,
  } as const;
}

/**
 * Builds a numeric filter object for the GRF API.
 * @param field
 * @param operator
 * @param initialValue
 * @param group optional group, will be used for grouping filters with AND/OR logic
 */
export function buildNumericFilter(
  field: string,
  operator: TNumericOperator | TEqualityOperator,
  initialValue: number,
  group?: string
) {
  return {
    kind: 'numeric',
    field,
    operator,
    value: initialValue,
    group,
  } as const;
}

/**
 * Builds a range filter object for the GRF API.
 * @param field
 * @param operator
 * @param initialValue
 * @param group optional group, will be used for grouping filters with AND/OR logic
 */
export function buildRangeFilter(
  field: string,
  operator: TRangeOperator,
  initialValue: { from: number; to: number },
  group?: string
) {
  return {
    kind: 'range',
    field,
    operator,
    range: initialValue,
    group,
  } as const;
}

/** * Builds a set filter object for the GRF API.
 * @param field
 * @param operator
 * @param initialValue
 * @param group optional group, will be used for grouping filters with AND/OR logic
 */
export function buildSetFilter<T extends number | string | boolean>(
  field: string,
  operator: TSetOperator,
  initialValue: T[],
  group?: string
) {
  return {
    kind: 'set',
    field,
    operator,
    values: initialValue,
    group,
  } as const;
}

/**
 * @private
 */
export type FieldType =
  | ReturnType<typeof buildTextFilter>
  | ReturnType<typeof buildNumericFilter>
  | ReturnType<typeof buildRangeFilter>
  | ReturnType<typeof buildSetFilter>;

export function buildFilterState(...filters: Array<FieldType>) {
  return filters;
}
