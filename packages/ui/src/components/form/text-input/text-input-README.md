# TextInput

### Usage

```js
...
import { TextInput } from '@panenco/pui';

const render  = () => {
  return (
    <TextInput placeholder="Icon before" iconBefore={Icon.icons.mapPin} />
  )
}
...
```

<!-- STORY -->

### Properties

This component inherits the attributes of the **div** element and extends the functionality with next properties.

- title - title;
- subTitle - subTitle;
- error - add this prop when smth went wrong;
- disabled - set disabled state for input;
- type - type of input field;
- iconBefore - it could be icon from Icon copmponent or some JSX.Eleement;
- iconAfter - the same as with iconBefore;
- inputProps - it's props which will be added to input component;
- ref - ref

| propName   | propType                                | defaultValue | isRequired |
| ---------- | --------------------------------------- | ------------ | ---------- |
| title      | string                                  | -            | -          |
| subTitle   | string                                  | -            | -          |
| error      | string                                  | -            | -          |
| disabled   | boolean                                 | -            | -          |
| type       | 'text' or 'password' or 'email'         | text         | -          |
| iconBefore | HTMLObjectElement or JSX.Element        | -            | -          |
| iconAfter  | HTMLObjectElement or JSX.Element        | -            | -          |
| inputProps | React.HTMLAttributes (HTMLInputElement) | -            | -          |
| ref        | React.RefObject                         | -            | -          |
