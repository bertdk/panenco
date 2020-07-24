# Radio

## Usage

```js
import { Radio } from '@panenco/pui';

return (
  <>
    <Radio label="Label 1" name="RadioGroup" value="1" />
    <Radio label="Label 2" name="RadioGroup" value="2" />
    <Radio label="Label 3" name="RadioGroup" value="3" />
    <Radio label="Label 4" name="RadioGroup" value="4" />
  </>
);
```

---

### Properties

This component inherits the attributes of the **label** element and extends the functionality with next properties.

| propName   | propType                                | defaultValue | isRequired |
| ---------- | --------------------------------------- | ------------ | ---------- |
| label      | string                                  | -            | -          |
| name       | string                                  | -            | -          |
| id         | string                                  | -            | -          |
| value      | string                                  | -            | -          |
| error      | string                                  | -            | -          |
| disabled   | boolean                                 | -            | -          |
| checked    | boolean                                 | -            | -          |
| ref        | React.RefObject                         | -            | -          |
| inputProps | React.HTMLAttributes (HTMLInputElement) | -            | -          |
