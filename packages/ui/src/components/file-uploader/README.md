# FileUploader

### Usage

```js
...
import { FileUploader } from '@panenco/pui';

const render  = () => {
  return (
     <FileUploader title="Title" />
  )
}
...
```

<!-- STORY -->

### Properties

This component inherits the attributes of the **div** element and extends the functionality with next properties.

- id - component id (generate unique id by default);
- title - component title;
- placeholder - component placeholder;
- disabled - set disabled state;
- buttonText - content in button;
- loading - set state when downloading a file;
- iconClassName - override icon styles;
- loadingText - show this text when downloading a file;
- error - set state if has error;
- icon - icon which will be rendered;
- loader - you can set you own loader if you want;
- inputProps - it's props which will be added to input component;
- ref - ref;

| propName      | propType                                | defaultValue      | isRequired |
| ------------- | --------------------------------------- | ----------------- | ---------- |
| disabled      | boolean                                 | -                 | -          |
| loading       | boolean                                 | -                 | -          |
| title         | string                                  | -                 | -          |
| id            | string or (any)                         | generate uniqueID | -          |
| placeholder   | string                                  | Upload file here  | -          |
| buttonText    | string                                  | Upload            | -          |
| loadingText   | string                                  | Uploading...      | -          |
| error         | string                                  | -                 | -          |
| iconClassName | string                                  | -                 | -          |
| icon          | HTMLObjectElement                       | -                 | -          |
| loader        | JSX.Element                             | -                 | -          |
| ref           | React.RefObject                         | -                 | -          |
| inputProps    | React.HTMLAttributes (HTMLInputElement) | -                 | -          |