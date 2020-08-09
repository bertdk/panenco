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

This component inherits the attributes of the **input** element and extends the functionality with next properties.

- label - component label;
- inputProps - it's props which will be added to input component;
- wrapperProps - it's props which will be added to wrapper component;
- color - background color;
- borderWidth - border width input element (px);
- ref - ref;

| propName     | propType                  | defaultValue | isRequired |
| ------------ | ------------------------- | ------------ | ---------- |
| label        | string                    | -            | -          |
| color        | string                    | -            | -          |
| borderWidth  | string (number)           | -            | -          |
| inputProps   | React.InputHTMLAttributes | -            | -          |
| wrapperProps | React.LabelHTMLAttributes | -            | -          |
| ref          | React.RefObject           | -            | -          |
