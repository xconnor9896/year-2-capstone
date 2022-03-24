# proton.js

A small, easy-to-learn UI library for Next.js/React.js

Proton is not a full UI library, instead it is a collection of highly modifiable components for you to drop into existing projects.

All icons used in this library are from [bootstrap-icons](https://icons.getbootstrap.com/), but it is not required as a dependency.

Proton works well with these libraries:

-   [bootstrap-icons](https://icons.getbootstrap.com/) `npm i bootstrap-icons`
-   [react-icons](https://react-icons.github.io/react-icons/) `npm i react-icons`

---

# Documentation

## Importing

All components can be imported with:

```jsx
import { ComponentName } from "../proton";
```

## Applying Modifications

You can apply style/state changes to each component either through attributes. Example:

```jsx
return <Component icon emphasis="primary" />;
```

Some component states require certain types of values, but the majority are just booleans. Both of the below examples produce the same effect:

```jsx
return <>
	<! -- Effectively the same. -- >
	<Component icon />
	<Component icon={true}>
</>;
```

Any other attributes added to the component will be accepted like normal by React.js/Next.js. (_i.e._ `className`, `style`, `key`)

## <a name="colors">Colors</a>

You can apply colors to most of the components with a `color` attribute.

```jsx
return <Component color="red" />;
```

Here is a list of the available colors. You can always modify the colors in the styles folder to suite your needs.

| Name      | Value                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| `red`     | <span style="color: #ed5564; font-weight: 800; font-family: monospace; text-transform: uppercase;">#ed5564</span> |
| `orange`  | <span style="color: #f1b037; font-weight: 800; font-family: monospace; text-transform: uppercase;">#f1b037</span> |
| `yellow`  | <span style="color: #ffce54; font-weight: 800; font-family: monospace; text-transform: uppercase;">#ffce54</span> |
| `green`   | <span style="color: #a0d568; font-weight: 800; font-family: monospace; text-transform: uppercase;">#a0d568</span> |
| `blue`    | <span style="color: #4fc1e8; font-weight: 800; font-family: monospace; text-transform: uppercase;">#4fc1e8</span> |
| `purple`  | <span style="color: #ac92eb; font-weight: 800; font-family: monospace; text-transform: uppercase;">#ac92eb</span> |
| `warning` | <span style="color: #f8de6b; font-weight: 800; font-family: monospace; text-transform: uppercase;">#F8DE6B</span> |
| `error`   | <span style="color: #EB6383; font-weight: 800; font-family: monospace; text-transform: uppercase;">#EB6383</span> |
| `success` | <span style="color: #90ec90; font-weight: 800; font-family: monospace; text-transform: uppercase;">#90ec90</span> |
| `default` | <span style="color: #c5c5c5; font-weight: 800; font-family: monospace; text-transform: uppercase;">#c5c5c5</span> |

Certain components can have emphasis applied to them. This can be:

-   <span style="color: #2f2f97; font-weight: 800; font-family: monospace">primary (purple)</span>,
-   <span style="color: #a1a2a7; font-weight: 800; font-family: monospace">secondary (grey)</span>,
-   or, <span style="color: #c5c5c5; font-weight: 800; font-family: monospace">none (default)</span>

## Components

### Button

The button component has a variety of animations and styles for you to pick from.

```jsx
import { Button } from "../proton";

return <Button>Text/Children Here</Button>;
```

#### States

| Attribute   | Value            | Description                                                                                          |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| `focusable` | `true` / `false` | Sets whether or not a button can be focused on. Default `false`.                                     |
| `disabled`  | `true` / `false` | Sets whether or not a button can be clicked on. Default `false`.                                     |
| `loading`   | `true` / `false` | Sets whether or not a button is loading. Default `false`. Buttons with this state are also disabled. |

#### Style Modifications

| Attribute   | Value                                                         | Description                                                                        |
| ----------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `emphasis`  | `"primary"` / `"secondary"` / `"default"`                     | Sets emphasis using the primary/secondary color-scheme. Default unset.             |
| `color`     | Any value from the [supported list of colors](#colors) above. | Sets the button's color. Overrides emphasis attribute.                             |
| `icon`      | `true` / `false`                                              | Squares up the button for icon-only.                                               |
| `hollow`    | `true` / `false`                                              | Hollows out the button and gives it a border.                                      |
| `underline` | `true` / `false`                                              | Makes the button's border an underline only. **_Must be a hollow button!_**        |
| `fill`      | `true` / `false`                                              | Makes the button fill all available horizontal space.                              |
| `compact`   | `true` / `false`                                              | Makes the button's padding and font smaller so that it can fit in a smaller space. |
| `noborder`  | `true` / `false`                                              | Turns off the button's border.                                                     |

---

### Button Group

The button group holds an unlimited number of `<Button/>`s in a stylish and compact way.

```jsx
import { Button } from "../proton";

return (
	<Button.Group>
		...<Button></Button>
	</Button.Group>
);
```

#### Style Modifications

| Attribute  | Value            | Description                                                                  |
| ---------- | ---------------- | ---------------------------------------------------------------------------- |
| `split`    | `true` / `false` | Puts a gap between the buttons.                                              |
| `wrap`     | `true` / `false` | Stops the group from staying in one line and allows it to fit spaces better. |
| `vertical` | `true` / `false` | Lists the buttons vertically rather than horizontally.                       |

---

### Button Label

A button label goes inside of a button and can be used for icons, to indicate data, or whatever else you what emphasis applied to.

```jsx
import { Button } from "../proton";

return (
	<Button>
		Cart
		<Button.Label>{cart.length}</Button.Label>
	</Button>
);
```

#### Style Modifications

| Attribute | Value            | Description                                                      |
| --------- | ---------------- | ---------------------------------------------------------------- |
| `icon`    | `true` / `false` | Properly displays when only an svg/icon is present in the label. |

---

### Progress Bar

The progress bar allows you to display a percentage value with any text over it.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>Hello</ProgressBar.Label>
		<ProgressBar.Label>World</ProgressBar.Label>
	</ProgressBar>
);
```

#### States

| Attribute    | Value              | Description                                                                                                                          |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `value`      | `number`           | The current value (%) that the bar is at.                                                                                            |
| `min`        | `number`           | The minimum value the bar can be at.                                                                                                 |
| `max`        | `number`           | The maximum value the bar can be at.                                                                                                 |
| `percentage` | `"left"`/`"right"` | Adds a percentage display to the left or right inner side of the bar. Cannot be used in tandum with the backline style modification. |

#### Style Modifications

| Attribute  | Value                                                         | Description                                                 |
| ---------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `color`    | Any value from the [supported list of colors](#colors) above. | Sets the bar's color.                                       |
| `overlay`  | `true` / `false`                                              | Creates an overlay/transparency effect on the bar.          |
| `border`   | `true` / `false`                                              | Adds a border to the bar.                                   |
| `backline` | `true` / `false`                                              | Adds a line across the bar that works with labels and dots. |

---

### Progress Bar Spacer

The spacer goes inside of a progress bar and takes up as much space as it can.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>Hello</ProgressBar.Label>
		<ProgressBar.Spacer />
		<ProgressBar.Label>World</ProgressBar.Label>
	</ProgressBar>
);
```

#### States

| Attribute   | Value            | Description                                                  |
| ----------- | ---------------- | ------------------------------------------------------------ |
| `invisible` | `true` / `false` | Hides the spacer while maintaining its "spacing" properties. |

---

### <a name="labelRules">Progress Bar Label</a>

The label is a box that should contain any inner content for the bar, excluding spacers. You can have multiple spacers and they will stay in the bar properly spaced. Please keep in mind that the progress bar should maintain a horizontal line and won't wrap properly.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>Hello</ProgressBar.Label>
		<ProgressBar.Label>World</ProgressBar.Label>
	</ProgressBar>
);
```

**Consistency is key** to making the progress bar flow properly. I.e.:

-   If one label contains a dot component, _all of them should_.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
		</ProgressBar.Label>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
		</ProgressBar.Label>
		<ProgressBar.Label>
			<!-- Should have a dot -->
		</ProgressBar.Label>
	</ProgressBar>
);
```

-   All dots should _be the first element in the label_.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
			Text
		</ProgressBar.Label>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
			Text
		</ProgressBar.Label>
		<ProgressBar.Label>
			Text
			<ProgressBar.Dot /> <!-- Bad, dots always go first. -->
		</ProgressBar.Label>
	</ProgressBar>
);
```

-   If a label contains text and dot components, and the progress bar has a backline property, then _all of the labels in the bar should contain text to have the dots line up properly_.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100}>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
			Text
		</ProgressBar.Label>
		<ProgressBar.Label>
			<ProgressBar.Dot /> <!-- Good -->
			Text
		</ProgressBar.Label>
		<ProgressBar.Label>
			<ProgressBar.Dot />
			<!-- No text means this dot will be unaligned. -->
		</ProgressBar.Label>
	</ProgressBar>
);
```

---

### Progress Bar Dot

Dots are nice indicators of "steps" inside of a progress bar. They should be contained within labels. They can also be displayed alongside text, but the styling rules described in [the label rules](#labelRules) must be followed.

```jsx
import { ProgressBar } from "../proton";

return (
	<ProgressBar value={50} min={0} max={100} backline>
		<ProgressBar.Label>
			<ProgressBar.Dot />
		</ProgressBar.Label>

		<ProgressBar.Label>
			<ProgressBar.Dot />
		</ProgressBar.Label>
	</ProgressBar>
);
```

#### Style Modifications

| Attribute | Value            | Description                                                                                                                                                                |
| --------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hollow`  | `true` / `false` | Makes the dot hollow. If you do not have the overlay state set on the bar, but you do have the backline state set, this will not look right. All other scenarios are fine. |

---

### Pagination

The pagination component is a simple yet effective button group for pagination.

The paginator does not store page data or load it, it simply allows users to change their page number in an intuitive way, that the developer can use to modify the content of their pages.

```jsx
import { Pagination } from "../proton";
import { useState } from "react";

// An example of a fully functional paginator.
const myPage = () => {
	const [page, setPage] = useState(1);

	return (
		<Pagination
			activePage={page}
			totalPages={5}
			onPageChange={(page) => setPage(page)}
		/>
	);
};
```

#### States

The minimum outside code to get this to work is a single useState that stores the current page. (or equivalent)

| Attribute               | Value                          | Description                                                              |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `activePage`            | `number` (variable)            | The current page.                                                        |
| `totalPages`            | `number` (preferably variable) | The maximum number of pages.                                             |
| `onPageChange`          | **SEE BELOW**                  | Used to update the current page number.                                  |
| `boundaryRange`         | `number`                       | The number of pages to display on either side of the current page.       |
| `overrideButtonContent` | **SEE BELOW**                  | For advanced modification to the content of the page number buttons.     |
| `arrows`                | `true` / `false`               | Adds arrows for incrementing the page number by one in either direction. |
| `jumpArrows`            | `true` / `false`               | Adds arrows for jumping to the first/last pages.                         |
| `disabled`              | `true` / `false`               | Sets the "disabled" state.                                               |
| `loading`               | `true` / `false`               | Sets the "loading" state.                                                |

##### `onPageChange`

The `onPageChange` function is what makes the paginator work.

Example:
`onPageChange={(page) => setPage(page)}`

This attribute passes a function through to the paginator, telling it what to do when it changes a page.

For instance, in the above example, _the paginator will hand its new page number to the function, which is then used to overwrite a state._

Other functions can be used, so long as the `activePage` property is kept consistent with the new page number.

##### `overrideButtonContent`

The `overrideButtonContent` function is for more advanced developers who want to change the content of the page number buttons.

It takes in one parameter, the page number, and returns whatever content the developer would like. This can be **HTML** content, **plaintext**, and more.

Example:
`` overrideButtonContent={(pageNumber) => `${pageNumber}/${maxPages}`} ``

Instead of the default, the above example will make each page number button display a fraction. I.e.: `"4/50"`.

#### Style Modifications

| Attribute   | Value                                                         | Description                                                            |
| ----------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `emphasis`  | `"primary"` / `"secondary"` / `"default"`                     | Sets emphasis using the primary/secondary color-scheme. Default unset. |
| `split`     | `true` / `false`                                              | Splits the buttons apart in the button group.                          |
| `wrap`      | `true` / `false`                                              | Adds `flex-wrap` to the button group.                                  |
| `vertical`  | `true` / `false`                                              | Makes the buttons vertical.                                            |
| `color`     | Any value from the [supported list of colors](#colors) above. | Changes the color of the buttons.                                      |
| `hollow`    | `true` / `false`                                              | Makes the buttons hollow.                                              |
| `underline` | `true` / `false`                                              | Adds an underline to the buttons. (must be hollow)                     |
| `compact`   | `true` / `false`                                              | Makes the paginator more compact for smaller spaces.                   |

---

# JUST RUSHED TO WRITE ALL OF THIS SORRY IF IT SUCKS:

### Card

Cards are a nice way to hold content that pops out of the screen.

```jsx
import { Card } from "../proton";

return (
	<Card>
		<ProgressBar.Label>Hello</ProgressBar.Label>
		<ProgressBar.Spacer />
		<ProgressBar.Label>World</ProgressBar.Label>
	</Card>
);
```

| Attribute     | Value          | Description                       |
| ------------- | -------------- | --------------------------------- |
| `focusable`   | see above      | see above                         |
| `disabled`    | see above      | see above                         |
| `emphasis`    | see above      | see above                         |
| `color`       | see above      | see above                         |
| `loading`     | see above      | see above                         |
| `dropshadow`  | `true`/`false` | Adds a shadow to the background   |
| `square`      | `true`/`false` | Makes the edges square            |
| `rounder`     | `true`/`false` | Makes the edges more round.       |
| `noborder`    | `true`/`false` | Gets rid of the border            |
| `hovereffect` | `true`/`false` | Creates a shadow effect on hover. |

### Card Image

A nice formatted way of viewing the card content.

```jsx
<Card>
	<Card.Image>
		<img src="loletc" />
	</Card.Image>
</Card>
```

### Card Header

A nice header for the card that you can put heading tags inside of.

```jsx
<Card>
	<Card.Header>
		<h1>Hello World</h1>
	</Card.Header>
</Card>
```

### Card Content

The content of the card

```jsx
<Card>
	<Card.Content>Hello World</Card.Content>
</Card>
```

| Attribute | Value          | Description                        |
| --------- | -------------- | ---------------------------------- |
| `flex`    | `true`/`false` | Makes the content a column flexbox |

### Card Group

A group of cards.

```jsx
<Card.Group>
	<Card />
	<Card />
	<Card />
	<Card />
</Card.Group>
```
