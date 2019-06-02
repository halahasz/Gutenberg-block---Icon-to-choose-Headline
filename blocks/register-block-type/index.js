import carIcon from "./icons.js";
import "./style.scss";

// Get React Fragment
const { Fragment } = wp.element;

// Get components from from wp.blocks
const { registerBlockType } = wp.blocks;

// Get components from from wp.editor
const { InspectorControls, RichText } = wp.editor;

// Get components from Components
const { PanelBody, RadioControl } = wp.components;

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;

export default registerBlockType(
  // Namespaced, hyphens, lowercase, unique name
  "halina/headline-with-icon",
  {
    // Localize title using wp.i18n.__()
    title: __("Headline with Icon", "polandtravel"),
    // Add a description for the block
    description: __(
      "A headline block with custom icon to choose",
      "polandtravel"
    ),
    // Category Options: common, formatting, layout, widgets, embed
    category: "common",
    // Dashicons Options - https://goo.gl/aTM1DQ
    // Customize background color
    icon: {
      // background: "#0073AA",
      src: blockIcons.car
    },
    // Limit to 3 Keywords / Phrases
    keywords: [__("Headline", "polandtravel")],
    // Enable or disable support for features
    supports: {},
    // Set for each piece of dynamic data used in your block
    attributes: {
      message: {
        type: "array",
        source: "children",
        selector: ".message-body"
      },
      setting: {
        type: "string"
      }
    },
    // Determines what is displayed in the editor
    edit: props => {
      const {
        attributes: { setting, message },
        isSelected,
        className,
        setAttributes
      } = props;

      const onChangeMessage = message => {
        setAttributes({ message });
      };

      // Return the markup displayed in the editor
      return [
        isSelected && (
          <InspectorControls key="inspector">
            <PanelBody title={__("Custom headline", "polandtravel")}>
              <RadioControl
                label="Choose Icon"
                selected={setting}
                options={[
                  {
                    label: blockIcons.car,
                    value: "car"
                  },
                  {
                    label: blockIcons.group,
                    value: "group"
                  }
                ]}
                onChange={setting => setAttributes({ setting })}
              />
            </PanelBody>
          </InspectorControls>
        ),
        <div className={className}>
          {(() => {
            switch (setting) {
              case "car":
                return blockIcons.car;
              case "group":
                return blockIcons.group;
              default:
                return null;
            }
          })()}
          <RichText
            tagName="div"
            multiline="p"
            placeholder={__("Add your headline", "polandtravel")}
            onChange={onChangeMessage}
            value={message}
          />
        </div>
      ];
    },
    // Determines what is displayed on the frontend
    save: props => {
      const {
        attributes: { setting, message }
      } = props;

      // Return the markup to display on the frontend
      return (
        <div>
          {(() => {
            switch (setting) {
              case "car":
                return (
                  <div class="message-body-blue">
                    {carIcon}
                    {message}
                  </div>
                );
              case "group":
                return (
                  <div class="message-body">
                    {blockIcons.group}
                    {message}
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      );
    }
  }
);
