import { configure, addParameters, addDecorator } from "@storybook/react";
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
import { withKnobs } from "@storybook/addon-knobs";
// https://storybook.js.org/docs/configurations/theming/
import { themes } from "@storybook/theming";
// https://github.com/storybookjs/storybook/tree/master/addons/info
import { withInfo } from "@storybook/addon-info";
// https://github.com/storybookjs/storybook/tree/master/addons/viewport
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
// https://github.com/storybookjs/storybook/tree/master/addons/a11y
import { withA11y } from "@storybook/addon-a11y";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "rc-slider/assets/index.css";

addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(withA11y);
addParameters({
    options: {
        theme: themes.light,
        panelPosition: "right",
        sidebarAnimations: true,
        showPanel: true,
        hierarchySeparator: /\/|\./,
        hierarchyRootSeparator: /\|/
    },
    info: {
        inline: true,
        header: false,
        text: `<hr/>`
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
        defaultViewport: "someDefault"
    }
});

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);
