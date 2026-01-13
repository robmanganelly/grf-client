// DO NOT CHANGE WITHOUT CHECKING BACKEND IMPLEMENTATION

export const EqualityOperator = {
  Equal: 'eq',
  NotEqual: 'ne',
} as const;

export type TEqualityOperator =
  (typeof EqualityOperator)[keyof typeof EqualityOperator];

export const NumericOperator = {
  GreaterThan: 'gt',
  GreaterThanOrEqual: 'gte',
  LessThan: 'lt',
  LessThanOrEqual: 'lte',
} as const;

export type TNumericOperator =
  (typeof NumericOperator)[keyof typeof NumericOperator];

export const RangeOperator = {
  Between: 'bt',
  NotBetween: 'nbt',
} as const;

export type TRangeOperator = (typeof RangeOperator)[keyof typeof RangeOperator];

export const SetOperator = {
  In: 'in',
  NotIn: 'nin',
  SuperSetOf: 'sset',
  NotSuperSet: 'nsset',
} as const;

export type TSetOperator = (typeof SetOperator)[keyof typeof SetOperator];

export const TextOperator = {
  Includes: 'inc',
  NotIncludes: 'ninc',
  InsensitiveIncludes: 'iinc',
  InsensitiveNotIncludes: 'niinc',
} as const;
export type TTextOperator = (typeof TextOperator)[keyof typeof TextOperator];
