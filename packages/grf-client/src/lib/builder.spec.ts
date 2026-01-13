import { describe, it, expect } from 'vitest';
import {
  buildTextFilter,
  buildFilterState,
  buildNumericFilter,
  buildRangeFilter,
  buildSetFilter,
  buildEqualityFilter,
} from './builder.js';
import {
  EqualityOperator,
  NumericOperator,
  RangeOperator,
  SetOperator,
  TextOperator,
} from './operator.js';

describe('builder', () => {
  describe('buildTextFilter', () => {
    it('should build a text filter without group', () => {
      const filter = buildTextFilter('name', TextOperator.Includes, 'John');
      expect(filter).toEqual({
        field: 'name',
        operator: 'inc',
        value: 'John',
        group: undefined,
        kind: 'text',
      });
    });

    it('should build a text filter with group', () => {
      const filter = buildTextFilter(
        'name',
        TextOperator.Includes,
        'John',
        'group1'
      );
      expect(filter).toEqual({
        field: 'name',
        operator: 'inc',
        value: 'John',
        group: 'group1',
        kind: 'text',
      });
    });
  });

  describe('buildNumericFilter', () => {
    it('should build a numeric filter without group', () => {
      const filter = buildNumericFilter('age', 'gt', 30);
      expect(filter).toEqual({
        field: 'age',
        operator: 'gt',
        value: 30,
        kind: 'numeric',
        group: undefined,
      });
    });

    it('should build a numeric filter with group', () => {
      const filter = buildNumericFilter('age', 'gt', 30, 'group1');
      expect(filter).toEqual({
        field: 'age',
        operator: 'gt',
        value: 30,
        group: 'group1',
        kind: 'numeric',
      });
    });
  });

  describe('buildRangeFilter', () => {
    it('should build a range filter without group', () => {
      const filter = buildRangeFilter('price', 'bt', { from: 10, to: 20 });
      expect(filter).toEqual({
        field: 'price',
        operator: 'bt',
        range: { from: 10, to: 20 },
        kind: 'range',
        group: undefined,
      });
    });

    it('should build a range filter with group', () => {
      const filter = buildRangeFilter(
        'price',
        'bt',
        { from: 10, to: 20 },
        'group1'
      );
      expect(filter).toEqual({
        field: 'price',
        operator: 'bt',
        range: { from: 10, to: 20 },
        group: 'group1',
        kind: 'range',
      });
    });
  });

  describe('buildSetFilter', () => {
    it('should build a set filter without group', () => {
      const filter = buildSetFilter('tags', 'in', ['tag1', 'tag2']);
      expect(filter).toEqual({
        kind: 'set',
        field: 'tags',
        operator: 'in',
        values: ['tag1', 'tag2'],
        group: undefined,
      });
    });

    it('should build a set filter with group', () => {
      const filter = buildSetFilter('tags', 'in', ['tag1', 'tag2'], 'group1');
      expect(filter).toEqual({
        kind: 'set',
        field: 'tags',
        operator: SetOperator.In,
        values: ['tag1', 'tag2'],
        group: 'group1',
      });
    });
  });

  describe('buildFilterState', () => {
    it('should build a filter state from multiple filters', () => {
      const state = buildFilterState(
        buildTextFilter('name', TextOperator.Includes, 'John'),
        buildNumericFilter('age', NumericOperator.GreaterThan, 30),
        buildRangeFilter('price', RangeOperator.Between, { from: 10, to: 20 }),
        buildSetFilter('tags', SetOperator.In, ['tag1', 'tag2'])
      );
      expect(state).toEqual([
        {
          field: 'name',
          operator: TextOperator.Includes,
          value: 'John',
          kind: 'text',
          group: undefined,
        },
        {
          field: 'age',
          operator: NumericOperator.GreaterThan,
          value: 30,
          kind: 'numeric',
          group: undefined,
        },
        {
          field: 'price',
          operator: RangeOperator.Between,
          range: { from: 10, to: 20 },
          kind: 'range',
          group: undefined,
        },
        {
          field: 'tags',
          operator: SetOperator.In,
          values: ['tag1', 'tag2'],
          kind: 'set',
          group: undefined,
        },
      ]);
    });
  });

  describe(buildEqualityFilter.name, () => {
    it('should build an equality filter without group', () => {
      const filter = buildEqualityFilter(
        'status',
        EqualityOperator.Equal,
        'active'
      );
      expect(filter).toEqual({
        field: 'status',
        operator: EqualityOperator.Equal,
        value: 'active',
        kind: 'equality',
        group: undefined,
      });
    });

    it('should build an equality filter with group', () => {
      const filter = buildEqualityFilter(
        'status',
        EqualityOperator.NotEqual,
        'inactive',
        'group1'
      );
      expect(filter).toEqual({
        field: 'status',
        operator: EqualityOperator.NotEqual,
        value: 'inactive',
        group: 'group1',
        kind: 'equality',
      });
    });
  });
});
