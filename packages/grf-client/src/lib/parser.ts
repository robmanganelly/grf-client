import { FieldType, getFieldValue } from './builder.js';




/**
 * Parses a field filter object and returns the field as an object with a certain structure
 * that can be turned into query parameters.
 *
 * the object contains an id field that will be the unique identifier for the field,
 * the other fields are key-value pairs representing the operator, value and group (if any).
 *
 * @param key
 * @param field
 */
export function parseField(key: string, field: FieldType) {
  const id = `f.${key}`;
  const operator = { k: id + '.o', v: field.operator };
  const value = { k: id + '.v', v: getFieldValue(field) };
  const group = 'group' in field ? { k: id + '.g', v: field.group } : null;

  return {
    id,
    operator,
    value,
    group,
  };
}

/**
 * Parses a field filter object and returns the field value as a string.
 * The string is ready to be attached to a query in a GET request.
 * @param key
 * @param field
 */
export function parseFieldAsString(key: string, field: FieldType): string {
  const { operator, value, group } = parseField(key, field);
  const g = group ? `&${group.k}=${group.v}` : '';
  return `${operator.k}=${operator.v}&${value.k}=${value.v}${g}`;
}

/**
 * Parses the filter state object and returns a map of the parsed objects
 * and a count of the total number of filters.
 * 
 * Use this method when you need to have control of the query parameters and execute
 * additional logic before sending the request.
 * 
 * Otherwise, consider using {@link parseFilterStateAsString} to get the full query string
 *
 */
export function parseFilterState(state: Record<string, FieldType>) {
  const filters: Record<string, ReturnType<typeof parseField>> = {};
  let count = 0;
  for (const k in state) {
    ++count;
    filters[k] = parseField(k, state[k]);
  }
  return { filters, count };
}

export function parseFilterStateAsString(
  state: Record<string, FieldType>
): string {
  let r = '';
  let c = 0; // the counter
  for (const k in state) {
    const s = parseFieldAsString(k, state[k]);
    ++c;
    r += '&' + s;
  }
  return c ? `fc=$${c}` + r : '';
}
