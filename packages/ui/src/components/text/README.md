# Text

### Usage

```js
import { Text, useTheme } from '@panenco/pui';

render() {
  const theme = useTheme();
  return (
    <Text size={theme.typography.sizes.xl} weight={theme.typography.weights.bold} color={theme.colors.primary}>Hello world</Text>
  );
}
```

<!-- STORY -->

### Properties

- `size` - font size
- `weight` - font weight
- `color` - font color
- `children` - text content

| propName | propType | defaultValue | isRequired |
| -------- | -------- | ------------ | ---------- |
| size     | string   | m            | -          |
| weight   | string   | inherit      | -          |
| color    | string   | primary      | -          |
| children | node     | -            | +          |

### Sizes

| size | textSize | lineHeight |
| ---- | -------- | ---------- |
| xs   | 12       | 16         |
| s    | 16       | 20         |
| m    | 20       | 26         |
| l    | 26       | 32         |
| xl   | 32       | 41         |
| h3   | 41       | 52         |
| h2   | 52       | 66         |
| h1   | 66       | 85         |

### Weights

| weight  | value |
| ------- | ----- |
| thin    | 100   |
| light   | 300   |
| regular | 400   |
| medium  | 500   |
| bold    | 500   |
| black   | 900   |
