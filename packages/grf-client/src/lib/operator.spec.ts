import { describe, it, expect } from 'vitest';
import {
  EqualityOperator,
  NumericOperator,
  RangeOperator,
  SetOperator,
  TextOperator,
} from './operator.js';

describe('operators', () => {
  it('equality: should be defined', () => {
    expect(EqualityOperator.Equal).toBe('eq');
    expect(EqualityOperator.NotEqual).toBe('ne');
  });
  it('numeric: should be defined', () => {
    expect(NumericOperator.GreaterThan).toBe('gt');
    expect(NumericOperator.LessThan).toBe('lt');
    expect(NumericOperator.GreaterThanOrEqual).toBe('gte');
    expect(NumericOperator.LessThanOrEqual).toBe('lte');
  });
  it('range: should be defined', () => {
    expect(RangeOperator.Between).toBe('bt');
    expect(RangeOperator.NotBetween).toBe('nbt');
  });
  it('set: should be defined', () => {
    expect(SetOperator.In).toBe('in');
    expect(SetOperator.NotIn).toBe('nin');
    expect(SetOperator.SuperSetOf).toBe('sset');
    expect(SetOperator.NotSuperSet).toBe('nsset');
  });
  it('text: should be defined', () => {
    expect(TextOperator.Includes).toBe('inc');
    expect(TextOperator.NotIncludes).toBe('ninc');
    expect(TextOperator.InsensitiveIncludes).toBe('iinc');
    expect(TextOperator.InsensitiveNotIncludes).toBe('niinc');
  });
});
