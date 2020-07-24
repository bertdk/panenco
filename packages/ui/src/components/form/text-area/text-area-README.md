# TextArea

### Usage

```js
...
import { TextArea } from '@panenco/pui';

const render  = () => {
  return (
    <TextArea title="Title" subTitle="Subtitle" placeholder="Placeholder" maxLength="10" />
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
- minHeight - min height for text area field (px);
- maxLength - max number of symbols for text area;
- disabled - set disabled state for input;
- onChange - event for input;
- inputProps - it's props which will be added to input component;
- ref - ref

| propName   | propType                                   | defaultValue | isRequired |
| ---------- | ------------------------------------------ | ------------ | ---------- |
| minHeight  | number                                     | -            | -          |
| maxLength  | number                                     | -            | -          |
| title      | string                                     | -            | -          |
| subTitle   | string                                     | -            | -          |
| error      | string                                     | -            | -          |
| disabled   | boolean                                    | -            | -          |
| onChange   | React.FormEvent                            | -            | -          |
| inputProps | React.HTMLAttributes (HTMLTextAreaElement) | -            | -          |
| ref        | React.RefObject                            | -            | -          |
