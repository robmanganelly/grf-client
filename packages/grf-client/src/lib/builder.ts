// builder function will generate objects that conform to the GRF API

import {
  TEqualityOperator,
  TNumericOperator,
  TOperator,
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
  initialValue: string | undefined | null,
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

export function buildEqualityFilter(
  field: string,
  operator: TEqualityOperator,
  initialValue: string | number | boolean | null | undefined,
  group?: string
) {
  return {
    kind: 'equality',
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
  initialValue: number | undefined | null,
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
  initialValue: { from: number; to: number } | undefined | null,
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
  | ReturnType<typeof buildEqualityFilter>
  | ReturnType<typeof buildSetFilter>;

export function buildFilterState(...filters: Array<FieldType>) {
  return filters;
}

/**
 * returns a function that updates the operator of a specific field in the filter state
 * Does not check if the operator is valid for the field type.
 *
 * @param field
 * @param operator
 * @returns
 */
export function updateOperator(field: string, operator: TOperator) {
  return (filters: Array<FieldType>) => {
    return filters.map((f) => {
      if (f.field === field) {
        return {
          ...f,
          operator,
        };
      }
      return f;
    });
  };
}

export function getValueUpdater(kind: FieldType['kind'], value: unknown) {
  switch (kind) {
    case 'text':
      return { value: value as string };
    case 'numeric':
      return { value: value as number };
    case 'equality':
      return { value: value as string | number | boolean | null };
    case 'range':
      return { range: value as { from: number; to: number } };
    case 'set':
      return { values: value as Array<number | string | boolean> };
    default:
      return {};
  }
}

export function getFieldValue(field: FieldType) {
  if (field.kind === 'range') {
    return field.range;
  } else if (field.kind === 'set') {
    return field.values;
  } else if (field.kind === 'equality') {
    return field.value;
  } else if (field.kind === 'numeric') {
    return field.value;
  } else if (field.kind === 'text') {
    return field.value;
  } else {
    return undefined;
  }
}

export function updateValue(field: string, value: unknown) {
  return (filters: Array<FieldType>) => {
    return filters.map((f) => {
      if (f.field === field) {
        const update = getValueUpdater(f.kind, value);
        return {
          ...f,
          ...update,
        };
      }
      return f;
    });
  };
}
