# Checkbox

### Usage

```js
...
import { Checkbox } from '@panenco/pui';

const render  = () => {
  const [isChecked, setChecked] = React.useState(false);
  const handleClick = () => {
    setChecked(!isChecked);
  }

  return (
    <Checkbox label="Checkbox" checked={isChecked} onClick={handleClick} />
  )
}
...
```

<!-- STORY -->

### Properties

This component inherits the attributes of the **label** element and extends the functionality with next properties.

- checked - set checked flag for checkbox;
- onClick - event for input element;
- onChange - event for input element;
- name - name for input element;
- value - value for input element;
- disabled - set disabled state;
- label - component label;
- id - component id (generate unique id by default);
- inputProps - it's props which will be added to input component;
- color - background color;
- borderWidth - border width input element (px);
- ref - ref;

| propName    | propType                                | defaultValue | isRequired |
| ----------- | --------------------------------------- | ------------ | ---------- |
| checked     | boolean                                 | -            | -          |
| onClick     | React.MouseEvent                        | -            | -          |
| onChange    | React.FormEvent                         | -            | -          |
| disabled    | boolean                                 | -            | -          |
| label       | string                                  | -            | -          |
| name        | string                                  | -            | -          |
| value       | string                                  | -            | -          |
| id          | string                                  | -            | -          |
| color       | string                                  | -            | -          |
| borderWidth | string (number)                         | -            | -          |
| inputProps  | React.HTMLAttributes (HTMLInputElement) | -            | -          |
| ref         | React.RefObject                         | -            | -          |
